import { Route } from '@/routes/_authenticated/tentang-kami/kelompok-komunitas/$kelompokKomunitasId/aktivitas/add';

import { FormGroupActivity } from '../components/form-group-activity/FormGroupActivity';

export function AddGroupActivityScreen() {
  const { kelompokKomunitasId } = Route.useLoaderData();
  return <FormGroupActivity kelompokKomunitasId={kelompokKomunitasId} />;
}
