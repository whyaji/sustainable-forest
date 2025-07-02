import { QueryClient } from '@tanstack/react-query';
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import { Database, HomeIcon, Info, LogOut, LucideIcon, Map, SettingsIcon } from 'lucide-react';

import { AppSidebar } from '@/components/app-sidebar';
import { SiteHeader } from '@/components/site-header';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Toaster } from '@/components/ui/sonner';
import { PERMISSION } from '@/enum/permission.enum';
import { useUserStore } from '@/lib/stores/userStore';
import { checkPermission } from '@/lib/utils/permissions';

const Root = () => {
  const user = useUserStore((state) => state.user);
  const permissions = user?.permissions ?? [];

  const navMain: {
    title: string;
    url?: string;
    icon?: LucideIcon;
    items?: {
      title: string;
      url: string;
      icon?: LucideIcon;
      hide?: boolean;
    }[];
  }[] = [
    {
      title: 'Dashboard',
      icon: HomeIcon,
      url: '/',
    },
    {
      title: 'Konfigurasi',
      icon: SettingsIcon,
      items: [
        {
          title: 'User',
          url: '/config/user',
          hide: !permissions.includes(PERMISSION.USER_MANAGEMENT_VIEW),
        },
        {
          title: 'Role Permission',
          url: '/config/role-permission',
          hide: !permissions.includes(PERMISSION.ROLE_PERMISSION_MANAGEMENT_VIEW),
        },
      ],
    },
    {
      title: 'Master',
      icon: Database,
      items: [
        {
          title: 'Pohon',
          url: '/master/pohon',
          hide: !permissions.includes(PERMISSION.MASTER_TREE_VIEW),
        },
        {
          title: 'Pohon Lokal',
          url: '/master/pohon-lokal',
          hide: !permissions.includes(PERMISSION.MASTER_TREE_VIEW),
        },
        {
          title: 'Kode Patok Batas',
          url: '/master/kode-patok-batas',
          hide: !permissions.includes(PERMISSION.MASTER_BOUNDARY_MARKER_CODE_VIEW),
        },
      ],
    },
    {
      title: 'Tentang Kami',
      icon: Info,
      items: [
        // { title: 'Apa itu Adopsi Pohon', url: '/tentang-kami/apa-itu-adopsi-pohon' },
        {
          title: 'Kelompok komunitas',
          url: '/tentang-kami/kelompok-komunitas',
          hide: !checkPermission(permissions, [
            PERMISSION.COMUNITY_GROUP_VIEW_LEVEL_GLOBAL,
            PERMISSION.COMUNITY_GROUP_VIEW_LEVEL_GROUP,
          ]),
        },
        // { title: 'Laporan-laporan', url: '/tentang-kami/laporan-laporan' },
      ],
    },
    {
      title: 'Data',
      icon: Database,
      items: [
        {
          title: 'Pohon',
          url: '/data/pohon',
          hide: !permissions.includes(PERMISSION.TREE_VIEW),
        },
        {
          title: 'Patok Batas',
          url: '/data/patok-batas',
          hide: !permissions.includes(PERMISSION.BOUNDARY_MARKER_VIEW),
        },
      ],
    },
    {
      title: 'Pemeteaan',
      icon: Map,
      url: '/pemetaan',
    },
  ];

  const navSecondary = [
    {
      title: 'Logout',
      url: '/profile',
      icon: LogOut,
    },
  ];
  return (
    <SidebarProvider>
      {user && <AppSidebar navItem={navMain} navSecondary={navSecondary} />}
      <main className="flex flex-col w-full flex-1 h-screen overflow-hidden">
        {user && (
          <div className="sticky top-0 bg-background z-20">
            <SiteHeader />
          </div>
        )}
        <div className="flex-1 overflow-auto">
          <Outlet />
          {/* <TanStackRouterDevtools /> */}
          <Toaster />
        </div>
      </main>
    </SidebarProvider>
  );
};

interface MyRouteContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouteContext>()({
  component: Root,
  notFoundComponent: NotFound,
});

function NotFound() {
  window.location.replace('/not-found');
  return null;
}
