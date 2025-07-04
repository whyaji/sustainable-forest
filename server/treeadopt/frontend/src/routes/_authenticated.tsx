import { createFileRoute, Outlet } from '@tanstack/react-router';
import Cookies from 'js-cookie';

import { OnboardingScreen } from '@/features/onboarding/screen/OnboardingScreen';
import { userQueryOptions } from '@/lib/api/authApi';
import { useUserStore } from '@/lib/stores/userStore';

const Component = () => {
  const { user } = Route.useRouteContext();
  const setUser = useUserStore((state) => state.setUser);
  const clearUser = useUserStore((state) => state.clearUser);

  if (!user) {
    clearUser();
    Cookies.remove('auth_token');
    Cookies.remove('user');
    return <OnboardingScreen />;
  }

  setUser(user.data);

  return <Outlet />;
};

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async ({ context }) => {
    const queryClient = context.queryClient;

    try {
      const data = await queryClient.fetchQuery(userQueryOptions);
      if (!data) {
        return { user: null };
      } else {
        Cookies.set('user', JSON.stringify(data.data));
      }
      return { user: data };
    } catch {
      return { user: null };
    }
  },
  component: Component,
});
