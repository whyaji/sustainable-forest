import { createFileRoute } from '@tanstack/react-router';

import { BoundaryMarkerListScreen } from '@/features/data/screen/boundary-marker/screen/BoundaryMarkerListScreen';

export const Route = createFileRoute('/_authenticated/data/patok-batas/')({
  component: BoundaryMarkerListScreen,
});
