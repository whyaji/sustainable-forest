import { eq } from 'drizzle-orm';
import { createFactory } from 'hono/factory';
import path from 'path';
import { z } from 'zod';

import { db } from '../../db/database.js';
import { surveyHistorySchema, treeSchema, userSchema } from '../../db/schema/schema.js';
import { getDataBy } from '../../lib/dataBy.js';
import { getPaginationData } from '../../lib/pagination.js';
import type { RelationsType } from '../../lib/relation.js';
import { cleanupUploadedImagesByArray, uploadFile } from '../../lib/upload.js';

const factory = createFactory();

// === ZOD SCHEMAS ===
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const surveyHistorySchemaZod = z.object({
  id: z.number().int().positive(),
  treeId: z.number().int().positive(),
  userId: z.number().int().positive(),
  kelompokKomunitasId: z.number().int().positive(),
  surveyDate: z.string().date(),
  surveyTime: z.string().time(),
  category: z.number().int(),
  circumference: z.number(),
  height: z.number(),
  serapanCo2: z.number(),
  treeImage: z.array(z.string()).nonempty(),
  leafImage: z.array(z.string()).optional(),
  skinImage: z.array(z.string()).optional(),
  fruitImage: z.array(z.string()).optional(),
  flowerImage: z.array(z.string()).optional(),
  sapImage: z.array(z.string()).optional(),
  otherImage: z.array(z.string()).optional(),
});

const createSurveyHistorySchemaFormData = z.object({
  treeId: z.string().min(1),
  userId: z.string().min(1),
  kelompokKomunitasId: z.string().min(1),
  surveyDate: z.string().date(),
  surveyTime: z.string().regex(/^(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9])$/),
  category: z.string().min(1),
  circumference: z.string().min(1),
  height: z.string().min(1),
  serapanCo2: z.string().min(1),
});

const createSurveyHistoryByCodeSchemaFormData = z.object({
  code: z.string().min(1),
  userId: z.string().min(1),
  kelompokKomunitasId: z.string().min(1),
  surveyDate: z.string().date(),
  surveyTime: z.string().regex(/^(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9])$/),
  category: z.string().min(1),
  circumference: z.string().min(1),
  height: z.string().min(1),
  serapanCo2: z.string().min(1),
});

type ImagesType = {
  treeImage: string[];
  leafImage?: string[];
  skinImage?: string[];
  fruitImage?: string[];
  flowerImage?: string[];
  sapImage?: string[];
  otherImage?: string[];
};

export type SurveyHistory = z.infer<typeof surveyHistorySchemaZod>;

// === RELATIONS ===
const relations: RelationsType = {
  userId: {
    type: 'one-to-one',
    table: userSchema,
    on: 'id',
  },
  treeId: {
    type: 'one-to-one',
    table: treeSchema,
    on: 'id',
  },
};

// === FACTORY ===
const getSurveyHistory = factory.createHandlers(async (c) => {
  return await getPaginationData({
    c,
    table: surveyHistorySchema,
    searchBy: 'id',
    relations,
  });
});

const getSurveyHistoryById = factory.createHandlers(async (c) => {
  return await getDataBy({ c, table: surveyHistorySchema, relations });
});

const createSurveyHistory = factory.createHandlers(async (c) => {
  const formData = await c.req.parseBody();

  // Validate form data (except images)
  const validation = createSurveyHistorySchemaFormData.safeParse(formData);
  if (!validation.success) {
    return c.json(
      {
        error: {
          issues: validation.error.errors,
        },
      },
      400
    );
  }

  const dir = 'uploads/survey-history';

  const imageFields = [
    'treeImage',
    'leafImage',
    'skinImage',
    'fruitImage',
    'flowerImage',
    'sapImage',
    'otherImage',
  ];

  const imageUploads: ImagesType = {
    treeImage: [],
    leafImage: [],
    skinImage: [],
    fruitImage: [],
    flowerImage: [],
    sapImage: [],
    otherImage: [],
  };

  try {
    for (const type of imageFields) {
      const uploadedPaths: string[] = [];
      // Collect all keys like 'treeImage[0]', 'treeImage[1]', etc.
      let idx = 0;
      while (true) {
        const key = `${type}[${idx}]`;
        if (!(key in formData)) break;
        const value = formData[key];
        if (value instanceof File && value.size > 0) {
          try {
            const imagePath = await uploadFile(value, dir, {
              withTimeMilis: true,
              withThumbnail: true,
            });
            uploadedPaths.push(`/${dir}/${path.basename(imagePath)}`);
          } catch (err) {
            console.error(`Error uploading ${type}:`, err);
            throw new Error(`Failed to upload ${type}`);
          }
        } else if (typeof value === 'string' && value.trim() !== '') {
          // Existing image URL, just push as is
          uploadedPaths.push(value);
        }
        idx++;
      }

      // Special check for required treeImage
      if (type === 'treeImage' && uploadedPaths.length === 0) {
        return c.json({ error: `Missing required images: ${type}` }, 400);
      }

      imageUploads[type as keyof ImagesType] = uploadedPaths;
    }

    // Prepare data for DB
    const data = {
      ...validation.data,
      ...imageUploads,
      treeId: parseInt(validation.data.treeId),
      userId: parseInt(validation.data.userId),
      kelompokKomunitasId: parseInt(validation.data.kelompokKomunitasId),
      category: parseInt(validation.data.category),
      circumference: parseFloat(validation.data.circumference),
      height: parseFloat(validation.data.height),
      serapanCo2: parseFloat(validation.data.serapanCo2),
    };

    await db.insert(surveyHistorySchema).values(data);
    return c.json({ message: 'Survey History created' }, 201);
  } catch (err) {
    const imageUploadLists = [
      ...imageUploads.treeImage,
      ...(imageUploads.leafImage || []),
      ...(imageUploads.skinImage || []),
      ...(imageUploads.fruitImage || []),
      ...(imageUploads.flowerImage || []),
      ...(imageUploads.sapImage || []),
      ...(imageUploads.otherImage || []),
    ];
    await cleanupUploadedImagesByArray(imageUploadLists);
    console.error('Error creating survey history:', err);
    return c.json({ error: 'Failed to create survey history' }, 500);
  }
});

const createSurveyHistoryByCode = factory.createHandlers(async (c) => {
  const formData = await c.req.parseBody();

  // Validate form data (except images)
  const validation = createSurveyHistoryByCodeSchemaFormData.safeParse(formData);
  if (!validation.success) {
    return c.json(
      {
        error: {
          issues: validation.error.errors,
        },
      },
      400
    );
  }

  const tree = await db
    .select()
    .from(treeSchema)
    .where(eq(treeSchema.code, validation.data.code))
    .limit(1);
  if (!tree[0]) return c.notFound();

  const treeId = tree[0].id;

  const dir = 'uploads/survey-history';

  const imageFields = [
    'treeImage',
    'leafImage',
    'skinImage',
    'fruitImage',
    'flowerImage',
    'sapImage',
    'otherImage',
  ];

  const imageUploads: ImagesType = {
    treeImage: [],
    leafImage: [],
    skinImage: [],
    fruitImage: [],
    flowerImage: [],
    sapImage: [],
    otherImage: [],
  };

  try {
    for (const type of imageFields) {
      const uploadedPaths: string[] = [];
      // Collect all keys like 'treeImage[0]', 'treeImage[1]', etc.
      let idx = 0;
      while (true) {
        const key = `${type}[${idx}]`;
        if (!(key in formData)) break;
        const value = formData[key];
        if (value instanceof File && value.size > 0) {
          try {
            const imagePath = await uploadFile(value, dir, {
              withTimeMilis: true,
              withThumbnail: true,
            });
            uploadedPaths.push(`/${dir}/${path.basename(imagePath)}`);
          } catch (err) {
            console.error(`Error uploading ${type}:`, err);
            throw new Error(`Failed to upload ${type}`);
          }
        } else if (typeof value === 'string' && value.trim() !== '') {
          // Existing image URL, just push as is
          uploadedPaths.push(value);
        }
        idx++;
      }

      // Special check for required treeImage
      if (type === 'treeImage' && uploadedPaths.length === 0) {
        return c.json({ error: `Missing required images: ${type}` }, 400);
      }

      imageUploads[type as keyof ImagesType] = uploadedPaths;
    }

    // Prepare data for DB
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { code, ...rest } = validation.data;
    const data = {
      ...rest,
      ...imageUploads,
      treeId: treeId,
      userId: parseInt(validation.data.userId),
      kelompokKomunitasId: parseInt(validation.data.kelompokKomunitasId),
      category: parseInt(validation.data.category),
      circumference: parseFloat(validation.data.circumference),
      height: parseFloat(validation.data.height),
      serapanCo2: parseFloat(validation.data.serapanCo2),
    };

    await db.insert(surveyHistorySchema).values(data);
    return c.json({ message: 'Survey History created' }, 201);
  } catch (err) {
    const imageUploadLists = [
      ...imageUploads.treeImage,
      ...(imageUploads.leafImage || []),
      ...(imageUploads.skinImage || []),
      ...(imageUploads.fruitImage || []),
      ...(imageUploads.flowerImage || []),
      ...(imageUploads.sapImage || []),
      ...(imageUploads.otherImage || []),
    ];
    await cleanupUploadedImagesByArray(imageUploadLists);
    console.error('Error creating survey history:', err);
    return c.json({ error: 'Failed to create survey history' }, 500);
  }
});

const updateSurveyHistory = factory.createHandlers(async (c) => {
  const idString = c.req.param('id');
  if (!idString || isNaN(parseInt(idString))) {
    return c.json({ error: 'Invalid ID' }, 400);
  }
  const id = parseInt(idString);
  const formData = await c.req.parseBody();

  // Validate form data (except images)
  const validation = createSurveyHistorySchemaFormData.safeParse(formData);
  if (!validation.success) {
    return c.json(
      {
        error: {
          issues: validation.error.errors,
        },
      },
      400
    );
  }

  const existing = await db
    .select()
    .from(surveyHistorySchema)
    .where(eq(surveyHistorySchema.id, id))
    .limit(1);

  if (!existing[0]) return c.notFound();

  const dir = 'uploads/survey-history';

  const imageFields = [
    'treeImage',
    'leafImage',
    'skinImage',
    'fruitImage',
    'flowerImage',
    'sapImage',
    'otherImage',
  ];

  const imageUploads: ImagesType = {
    treeImage: [],
    leafImage: [],
    skinImage: [],
    fruitImage: [],
    flowerImage: [],
    sapImage: [],
    otherImage: [],
  };

  try {
    for (const field of imageFields) {
      const files = formData[field];
      const fileList = Array.isArray(files) ? files : files ? [files] : [];

      // Special check for required treeImage
      if (field === 'treeImage' && fileList.length === 0) {
        return c.json({ error: `Missing required images: ${field}` }, 400);
      }

      const uploadedPaths: string[] = [];

      for (const file of fileList) {
        if (file instanceof File && file.size > 0) {
          try {
            const imagePath = await uploadFile(file, dir, { withTimeMilis: true });
            uploadedPaths.push(`/${dir}/${path.basename(imagePath)}`);
          } catch (err) {
            console.error(`Error uploading ${field}:`, err);
            throw new Error(`Failed to upload ${field}`);
          }
        }
      }

      imageUploads[field as keyof ImagesType] = uploadedPaths;
    }

    // Prepare data for DB
    const data = {
      ...validation.data,
      ...imageUploads,
      treeId: parseInt(validation.data.treeId),
      userId: parseInt(validation.data.userId),
      kelompokKomunitasId: parseInt(validation.data.kelompokKomunitasId),
      category: parseInt(validation.data.category),
      circumference: parseFloat(validation.data.circumference),
      height: parseFloat(validation.data.height),
      serapanCo2: parseFloat(validation.data.serapanCo2),
    };

    await db.update(surveyHistorySchema).set(data).where(eq(surveyHistorySchema.id, id));
    return c.json({ message: 'Survey History updated' });
  } catch (err) {
    const imageUploadLists = [
      ...imageUploads.treeImage,
      ...(imageUploads.leafImage || []),
      ...(imageUploads.skinImage || []),
      ...(imageUploads.fruitImage || []),
      ...(imageUploads.flowerImage || []),
      ...(imageUploads.sapImage || []),
      ...(imageUploads.otherImage || []),
    ];
    await cleanupUploadedImagesByArray(imageUploadLists);
    console.error('Error updating survey history:', err);
    return c.json({ error: 'Failed to update survey history' }, 500);
  }
});

const deleteSurveyHistory = factory.createHandlers(async (c) => {
  const idString = c.req.param('id');
  if (!idString || isNaN(parseInt(idString))) {
    return c.json({ error: 'Invalid ID' }, 400);
  }
  const id = parseInt(idString);
  const deleted = await db.delete(surveyHistorySchema).where(eq(surveyHistorySchema.id, id));
  if (!deleted) {
    return c.notFound();
  }
  return c.json({ message: 'Survey History deleted' });
});

export const surveyHistoryHandler = {
  getSurveyHistory,
  getSurveyHistoryById,
  createSurveyHistory,
  createSurveyHistoryByCode,
  updateSurveyHistory,
  deleteSurveyHistory,
};
