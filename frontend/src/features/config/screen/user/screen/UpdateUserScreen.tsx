import { Route } from '@/routes/_authenticated/config/user/$userId/update';

import { FormUser } from '../components/form-user/FormUser';

export function UpdateUserScreen() {
  const { user } = Route.useLoaderData();
  return user && <FormUser user={user} />;
}
