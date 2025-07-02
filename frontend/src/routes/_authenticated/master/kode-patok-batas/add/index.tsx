import { createFileRoute } from '@tanstack/react-router';

import { AddBoundaryMarkerCodeScreen } from '@/features/master/screen/boundary-marker-code/screen/AddBoundaryMarkerCodeScreen';

export const Route = createFileRoute('/_authenticated/master/kode-patok-batas/add/')({
  component: AddBoundaryMarkerCodeScreen,
});
