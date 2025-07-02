import { createFileRoute } from '@tanstack/react-router';

import { DetailBoundaryMarkerScreen } from '@/features/data/screen/check-bm-history/screen/DetailBoundaryMarkerScreen';
import { getBoundaryMarker } from '@/lib/api/boundaryMarkerApi';

export const Route = createFileRoute('/_authenticated/data/patok-batas/$boundaryMarkerId/')({
  loader: async ({ params }) => {
    try {
      const res = await getBoundaryMarker(
        params.boundaryMarkerId,
        'kelompokKomunitasId,checkerId,checkBoundaryMarkerHistory'
      );
      return { boundaryMarker: res.data };
    } catch {
      return { boundaryMarker: null };
    }
  },
  component: DetailBoundaryMarkerScreen,
});
