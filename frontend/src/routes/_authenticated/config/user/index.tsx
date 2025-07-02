import { createFileRoute } from '@tanstack/react-router';

import { PERMISSION } from '@/enum/permission.enum';
import { UserListScreen } from '@/features/config/screen/user/screen/UserListScreen';
import { useProtectRoute } from '@/hooks/use-protect-route';

const Component = () => {
  useProtectRoute([PERMISSION.USER_MANAGEMENT_VIEW]);
  return <UserListScreen />;
};

export const Route = createFileRoute('/_authenticated/config/user/')({
  component: Component,
});
