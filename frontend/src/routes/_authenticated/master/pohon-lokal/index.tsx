import { createFileRoute } from '@tanstack/react-router';

import { MasterLocalTreeListScreen } from '@/features/master/screen/local-tree/screen/MasterLocalTreeListScreen';

export const Route = createFileRoute('/_authenticated/master/pohon-lokal/')({
  component: MasterLocalTreeListScreen,
});
