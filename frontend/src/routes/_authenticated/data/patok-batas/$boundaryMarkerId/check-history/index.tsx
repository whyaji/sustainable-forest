import { createFileRoute } from '@tanstack/react-router';

import { CheckBmHistoryListScreen } from '@/features/data/screen/check-bm-history/screen/CheckBmHistoryListScreen';
import { getBoundaryMarker } from '@/lib/api/boundaryMarkerApi';

export const Route = createFileRoute(
  '/_authenticated/data/patok-batas/$boundaryMarkerId/check-history/'
)({
  loader: async ({ params }) => {
    try {
      const res = await getBoundaryMarker(params.boundaryMarkerId, 'checkerId,kelompokKomunitasId');
      return { boundaryMarker: res.data };
    } catch {
      return { boundaryMarker: null };
    }
  },
  component: CheckBmHistoryListScreen,
});
