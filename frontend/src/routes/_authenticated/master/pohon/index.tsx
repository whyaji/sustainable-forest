import { createFileRoute } from '@tanstack/react-router';

import { MasterPohonListScreen } from '@/features/master/screen/pohon/screen/MasterPohonListScreen';

export const Route = createFileRoute('/_authenticated/master/pohon/')({
  component: MasterPohonListScreen,
});
