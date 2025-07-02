import { Route } from '@/routes/_authenticated/data/patok-batas/$boundaryMarkerId/check-history/$checkBmHistoryId/update/index.js';

import { FormCheckBmHistory } from '../components/form-check-bm-history/FormCheckBmHistory.js';

export function UpdateCheckBmHistoryScreen() {
  const { checkBmHistory } = Route.useLoaderData();
  return (
    <FormCheckBmHistory
      title="Update Check Patok Batas History"
      checkBmHistory={checkBmHistory}
      boundaryMarker={checkBmHistory?.boundaryMarker}
    />
  );
}
