import { createFileRoute } from '@tanstack/react-router';

import { UpdateMasterPohonScreen } from '@/features/master/screen/pohon/screen/UpdateMasterPohonScreen';
import { getMasterTree } from '@/lib/api/masterTreeApi';

export const Route = createFileRoute('/_authenticated/master/pohon/update/$masterTreeId')({
  loader: async ({ params }) => {
    try {
      const res = await getMasterTree(params.masterTreeId, 'masterLocalTree');
      return { masterTree: res.data };
    } catch {
      return { masterTree: null };
    }
  },
  component: UpdateMasterPohonScreen,
});
