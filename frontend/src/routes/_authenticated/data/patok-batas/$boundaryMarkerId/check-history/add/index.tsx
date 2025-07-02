import { createFileRoute } from '@tanstack/react-router';

import { AddCheckBmHistoryScreen } from '@/features/data/screen/check-bm-history/screen/AddCheckBmHistoryScreen';
import { getBoundaryMarker } from '@/lib/api/boundaryMarkerApi';

export const Route = createFileRoute(
  '/_authenticated/data/patok-batas/$boundaryMarkerId/check-history/add/'
)({
  loader: async ({ params }) => {
    try {
      const res = await getBoundaryMarker(params.boundaryMarkerId);
      return { boundaryMarker: res.data };
    } catch {
      return { boundaryMarker: null };
    }
  },
  component: AddCheckBmHistoryScreen,
});
