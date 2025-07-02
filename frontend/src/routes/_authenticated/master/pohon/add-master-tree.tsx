import { createFileRoute } from '@tanstack/react-router';

import { TambahMasterPohonScreen } from '@/features/master/screen/pohon/screen/TambahMasterPohonScreen';

export const Route = createFileRoute('/_authenticated/master/pohon/add-master-tree')({
  component: TambahMasterPohonScreen,
});
