import { createFileRoute } from '@tanstack/react-router';

import { PERMISSION } from '@/enum/permission.enum';
import { RolePermissionScreen } from '@/features/config/screen/role-permission/screen/RolePermissionScreen';
import { useProtectRoute } from '@/hooks/use-protect-route';

const Component = () => {
  useProtectRoute([PERMISSION.ROLE_PERMISSION_MANAGEMENT_VIEW]);
  return <RolePermissionScreen />;
};

export const Route = createFileRoute('/_authenticated/config/role-permission/')({
  component: Component,
});
