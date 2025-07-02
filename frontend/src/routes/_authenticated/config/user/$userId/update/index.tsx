import { createFileRoute } from '@tanstack/react-router';

import { UpdateUserScreen } from '@/features/config/screen/user/screen/UpdateUserScreen';
import { getUser } from '@/lib/api/userApi';

export const Route = createFileRoute('/_authenticated/config/user/$userId/update/')({
  loader: async ({ params }) => {
    try {
      const res = await getUser(params.userId, 'roles');
      return { user: res.data };
    } catch {
      return { user: null };
    }
  },
  component: UpdateUserScreen,
});
