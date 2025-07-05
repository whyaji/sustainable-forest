import { Wishtree } from '@parentServer/app/handlers/wishtreeHandler';

import { TreeType } from './tree.type';
import { UserType } from './user.type';

export type WishtreeType = Wishtree & {
  tree?: TreeType | null;
  adopter?: UserType | null;
};
