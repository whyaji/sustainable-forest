import { createFileRoute } from '@tanstack/react-router';

import { WishtreeScreen } from '@/features/wishtree/screen/WishtreeScreen';

export const Route = createFileRoute('/_authenticated/wishtree/')({
  component: WishtreeScreen,
});
