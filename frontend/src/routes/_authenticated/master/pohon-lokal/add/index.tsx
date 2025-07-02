import { createFileRoute } from '@tanstack/react-router';

import { AddMasterLocalTreeScreen } from '@/features/master/screen/local-tree/screen/AddMasterLocalTreeScreen';

export const Route = createFileRoute('/_authenticated/master/pohon-lokal/add/')({
  component: AddMasterLocalTreeScreen,
});
