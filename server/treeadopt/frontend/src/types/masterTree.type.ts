import { MasterLocalTree, MasterTree } from '@parentServer/app/handlers/masterTreeHandler';

export type MasterLocalTreeType = MasterLocalTree & {
  masterTree?: MasterTree | null;
};

export type MasterTreeType = MasterTree & {
  masterLocalTree?: MasterLocalTreeType[];
};
