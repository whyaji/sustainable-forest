import { createFileRoute } from '@tanstack/react-router';

import { PERMISSION } from '@/enum/permission.enum';
import { AddUserScreen } from '@/features/config/screen/user/screen/AddUserScreen';
import { useProtectRoute } from '@/hooks/use-protect-route';

const Component = () => {
  useProtectRoute([
    PERMISSION.USER_MANAGEMENT_CREATE_LEVEL_GLOBAL,
    PERMISSION.USER_MANAGEMENT_CREATE_LEVEL_GROUP,
  ]);
  return <AddUserScreen />;
};

export const Route = createFileRoute('/_authenticated/config/user/add/')({
  component: Component,
});
