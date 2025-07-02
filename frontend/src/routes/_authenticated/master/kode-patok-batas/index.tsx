import { createFileRoute } from '@tanstack/react-router';

import { BoundaryMarkerCodeListScreen } from '@/features/master/screen/boundary-marker-code/screen/BoundaryMarkerCodeListScreen';

export const Route = createFileRoute('/_authenticated/master/kode-patok-batas/')({
  component: BoundaryMarkerCodeListScreen,
});
