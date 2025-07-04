import {
  GroupCoordinateArea,
  KelompokKomunitas,
} from '@parentServer/app/handlers/kelompokKomunitasHandler';
import { GroupActivityType } from './groupActivity.type';
import { TreeType } from './tree.type';

export type GroupCoordinateAreaType = GroupCoordinateArea;

export type KelompokKomunitasType = KelompokKomunitas & {
  trees?: Partial<TreeType>[];
  groupActivities?: Partial<GroupActivityType>[];
  groupCoordinateArea?: GroupCoordinateAreaType[] | null;
};
