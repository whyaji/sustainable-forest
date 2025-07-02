import { createFileRoute } from '@tanstack/react-router';

import { AddBoundaryMarkerScreen } from '@/features/data/screen/boundary-marker/screen/AddBoundaryMarkerScreen';

export const Route = createFileRoute('/_authenticated/data/patok-batas/add/')({
  component: AddBoundaryMarkerScreen,
});
