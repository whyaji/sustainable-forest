import { createFileRoute } from '@tanstack/react-router';

import { PERMISSION } from '@/enum/permission.enum';
import { KelompokKomunitasListScreen } from '@/features/tentang-kami/screen/kelompok-komunitas/screen/KelompokKomunitasListScreen';
import { useProtectRoute } from '@/hooks/use-protect-route';

const Component = () => {
  useProtectRoute([
    PERMISSION.COMUNITY_GROUP_VIEW_LEVEL_GLOBAL,
    PERMISSION.COMUNITY_GROUP_VIEW_LEVEL_GROUP,
  ]);
  return <KelompokKomunitasListScreen />;
};

export const Route = createFileRoute('/_authenticated/tentang-kami/kelompok-komunitas/')({
  component: Component,
});
