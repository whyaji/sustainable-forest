import { createFileRoute } from '@tanstack/react-router';

import { UpdateBoundaryMarkerScreen } from '@/features/data/screen/boundary-marker/screen/UpdateBoundaryMarkerScreen';
import { getBoundaryMarker } from '@/lib/api/boundaryMarkerApi';

export const Route = createFileRoute('/_authenticated/data/patok-batas/$boundaryMarkerId/update/')({
  loader: async ({ params }) => {
    try {
      const res = await getBoundaryMarker(params.boundaryMarkerId);
      return { boundaryMarker: res.data };
    } catch {
      return { boundaryMarker: null };
    }
  },
  component: UpdateBoundaryMarkerScreen,
});
