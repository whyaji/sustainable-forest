import { createFileRoute } from '@tanstack/react-router';

import { AddPohonScreen } from '@/features/data/screen/pohon/screen/AddPohonScreen';

export const Route = createFileRoute('/_authenticated/data/pohon/add/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <AddPohonScreen />;
}
