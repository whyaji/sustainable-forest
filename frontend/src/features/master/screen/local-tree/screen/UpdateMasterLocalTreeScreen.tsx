import { Route } from '@/routes/_authenticated/master/pohon-lokal/update/$masterLocalTreeId';

import { FormMasterLocalTree } from '../components/form-master-local-tree/FormMasterLocalTree';

export function UpdateMasterLocalTreeScreen() {
  const { masterLocalTree } = Route.useLoaderData();
  return <FormMasterLocalTree masterLocalTree={masterLocalTree} />;
}
