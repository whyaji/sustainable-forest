import { QueryClient } from '@tanstack/react-query';
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import {
  Database,
  HomeIcon,
  Info,
  LogOut,
  LucideIcon,
  Map,
  MoreHorizontal,
  Users,
} from 'lucide-react';

import { AppSidebar } from '@/components/app-sidebar';
import { SiteHeader } from '@/components/site-header';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Toaster } from '@/components/ui/sonner';
import { useUserStore } from '@/lib/stores/userStore';

const Root = () => {
  const user = useUserStore((state) => state.user);

  const navMain: {
    title: string;
    url?: string;
    icon?: LucideIcon;
    items?: {
      title: string;
      url: string;
      icon?: LucideIcon;
    }[];
  }[] = [
    {
      title: 'Beranda',
      icon: HomeIcon,
      url: '/',
    },
    {
      title: 'Tentang Kami',
      icon: Info,
      items: [
        { title: 'Apa itu Adopsi Pohon', url: '/tentang-kami/apa-itu-adopsi-pohon' },
        { title: 'Kelompok komunitas', url: '/tentang-kami/kelompok-komunitas' },
        { title: 'Laporan-laporan', url: '/tentang-kami/laporan-laporan' },
      ],
    },
    {
      title: 'Program Kami',
      icon: Users,
      items: [
        { title: 'Adopsi Pohon', url: '/program-kami/adopsi-pohon' },
        { title: 'Pemberdayaan Masyarakat', url: '/program-kami/pemberdayaan-masyarakat' },
        { title: 'Patroli & Geo-Tagging', url: '/program-kami/patroli-&-geo-tagging' },
        { title: 'Monitor Biodiversity', url: '/program-kami/monitor-biodiversity' },
      ],
    },
    {
      title: 'Data',
      icon: Database,
      items: [
        { title: 'Pohon', url: '/data/pohon' },
        { title: 'Adopter', url: '/data/adopter' },
      ],
    },
    {
      title: 'Pemetaan',
      icon: Map,
      url: '/pemetaan',
    },
    {
      title: 'Lain-lain',
      icon: MoreHorizontal,
      items: [
        { title: 'FAQ', url: '/lain/faq' },
        { title: 'Kontak Kami', url: '/lain/kontak' },
      ],
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
