import { createFileRoute } from '@tanstack/react-router';

import { DetailTreeScreen } from '@/features/admin-panel/screen/data/screen/pohon/screen/DetailTreeScreen';
import { getTree } from '@/lib/api/treeApi';

export const Route = createFileRoute('/_authenticated_admin/admin/data/pohon/$treeId/')({
  loader: async ({ params }) => {
    try {
      const res = await getTree(
        params.treeId,
        'kelompokKomunitasId,masterTreeId,adoptHistory,adoptHistory.userId,surveyHistory,surveyHistory.userId,masterLocalTree'
      );
      return { tree: res.data };
    } catch {
      return { tree: null };
    }
  },
  component: DetailTreeScreen,
});
