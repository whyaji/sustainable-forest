import { createFileRoute } from '@tanstack/react-router';

import { UpdateCheckBmHistoryScreen } from '@/features/data/screen/check-bm-history/screen/UpdateCheckBmHistoryScreen';
import { getBoundaryMarkerCheckHistory } from '@/lib/api/boundaryMarkerApi';

export const Route = createFileRoute(
  '/_authenticated/data/patok-batas/$boundaryMarkerId/check-history/$checkBmHistoryId/update/'
)({
  loader: async ({ params }) => {
    try {
      const res = await getBoundaryMarkerCheckHistory(params.checkBmHistoryId, 'boundaryMarkerId');
      return { checkBmHistory: res.data };
    } catch {
      return { checkBmHistory: null };
    }
  },
  component: UpdateCheckBmHistoryScreen,
});
