import { Route } from '@/routes/_authenticated/data/patok-batas/$boundaryMarkerId/check-history/add';

import { FormCheckBmHistory } from '../components/form-check-bm-history/FormCheckBmHistory';

export function AddCheckBmHistoryScreen() {
  const { boundaryMarker } = Route.useLoaderData();
  return (
    <FormCheckBmHistory title="Add Check Patok Batas History" boundaryMarker={boundaryMarker} />
  );
}
