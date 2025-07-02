import { createFileRoute } from '@tanstack/react-router';

import { AllPhotosKelompokKomunitas } from '@/features/tentang-kami/screen/kelompok-komunitas/screen/all-photos/screen/AllPhotosKelompokKomunitas';

const Component = () => {
  const { kelompokKomunitasId } = Route.useLoaderData();
  return <AllPhotosKelompokKomunitas kelompokKomunitasId={kelompokKomunitasId} />;
};

export const Route = createFileRoute(
  '/_authenticated/tentang-kami/kelompok-komunitas/$kelompokKomunitasId/all-photos/'
)({
  loader: async ({ params }) => {
    return {
      kelompokKomunitasId: params.kelompokKomunitasId,
    };
  },
  component: Component,
});
