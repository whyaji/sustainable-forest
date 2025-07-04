import { createFileRoute } from '@tanstack/react-router';

import { UpdatePohonScreen } from '@/features/data/screen/pohon/screen/UpdatePohonScreen';
import { getTree } from '@/lib/api/treeApi';

export const Route = createFileRoute('/_authenticated/data/pohon/$treeId/update/')({
  loader: async ({ params }) => {
    try {
      const res = await getTree(params.treeId);
      return { tree: res.data };
    } catch {
      return { tree: null };
    }
  },
  component: UpdatePohonScreen,
});
