/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { Route as rootRouteImport } from './routes/__root'
import { Route as RegisterRouteImport } from './routes/register'
import { Route as NotFoundRouteImport } from './routes/not-found'
import { Route as LoginRouteImport } from './routes/login'
import { Route as AboutRouteImport } from './routes/about'
import { Route as AuthenticatedRouteImport } from './routes/_authenticated'
import { Route as TentangKamiIndexRouteImport } from './routes/tentang-kami/index'
import { Route as AuthenticatedIndexRouteImport } from './routes/_authenticated/index'
import { Route as AuthenticatedProfileRouteImport } from './routes/_authenticated/profile'
import { Route as TentangKamiApaItuAdopsiPohonIndexRouteImport } from './routes/tentang-kami/apa-itu-adopsi-pohon/index'
import { Route as AuthenticatedWishtreeIndexRouteImport } from './routes/_authenticated/wishtree/index'
import { Route as AuthenticatedProgramKamiIndexRouteImport } from './routes/_authenticated/program-kami/index'
import { Route as AuthenticatedPemetaanIndexRouteImport } from './routes/_authenticated/pemetaan/index'
import { Route as AuthenticatedTentangKamiKelompokKomunitasIndexRouteImport } from './routes/_authenticated/tentang-kami/kelompok-komunitas/index'
import { Route as AuthenticatedProgramKamiPemberdayaanMasyarakatIndexRouteImport } from './routes/_authenticated/program-kami/pemberdayaan-masyarakat/index'
import { Route as AuthenticatedProgramKamiPatroliChar38GeoTaggingIndexRouteImport } from './routes/_authenticated/program-kami/patroli-&-geo-tagging/index'
import { Route as AuthenticatedProgramKamiMonitorBiodiversityIndexRouteImport } from './routes/_authenticated/program-kami/monitor-biodiversity/index'
import { Route as AuthenticatedProgramKamiAdopsiPohonIndexRouteImport } from './routes/_authenticated/program-kami/adopsi-pohon/index'
import { Route as AuthenticatedDataPohonIndexRouteImport } from './routes/_authenticated/data/pohon/index'
import { Route as AuthenticatedTentangKamiKelompokKomunitasKelompokKomunitasNameRouteImport } from './routes/_authenticated/tentang-kami/kelompok-komunitas/$kelompokKomunitasName'
import { Route as AuthenticatedDataPohonTreeIdIndexRouteImport } from './routes/_authenticated/data/pohon/$treeId/index'

const RegisterRoute = RegisterRouteImport.update({
  id: '/register',
  path: '/register',
  getParentRoute: () => rootRouteImport,
} as any)
const NotFoundRoute = NotFoundRouteImport.update({
  id: '/not-found',
  path: '/not-found',
  getParentRoute: () => rootRouteImport,
} as any)
const LoginRoute = LoginRouteImport.update({
  id: '/login',
  path: '/login',
  getParentRoute: () => rootRouteImport,
} as any)
const AboutRoute = AboutRouteImport.update({
  id: '/about',
  path: '/about',
  getParentRoute: () => rootRouteImport,
} as any)
const AuthenticatedRoute = AuthenticatedRouteImport.update({
  id: '/_authenticated',
  getParentRoute: () => rootRouteImport,
} as any)
const TentangKamiIndexRoute = TentangKamiIndexRouteImport.update({
  id: '/tentang-kami/',
  path: '/tentang-kami/',
  getParentRoute: () => rootRouteImport,
} as any)
const AuthenticatedIndexRoute = AuthenticatedIndexRouteImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => AuthenticatedRoute,
} as any)
const AuthenticatedProfileRoute = AuthenticatedProfileRouteImport.update({
  id: '/profile',
  path: '/profile',
  getParentRoute: () => AuthenticatedRoute,
} as any)
const TentangKamiApaItuAdopsiPohonIndexRoute =
  TentangKamiApaItuAdopsiPohonIndexRouteImport.update({
    id: '/tentang-kami/apa-itu-adopsi-pohon/',
    path: '/tentang-kami/apa-itu-adopsi-pohon/',
    getParentRoute: () => rootRouteImport,
  } as any)
const AuthenticatedWishtreeIndexRoute =
  AuthenticatedWishtreeIndexRouteImport.update({
    id: '/wishtree/',
    path: '/wishtree/',
    getParentRoute: () => AuthenticatedRoute,
  } as any)
const AuthenticatedProgramKamiIndexRoute =
  AuthenticatedProgramKamiIndexRouteImport.update({
    id: '/program-kami/',
    path: '/program-kami/',
    getParentRoute: () => AuthenticatedRoute,
  } as any)
const AuthenticatedPemetaanIndexRoute =
  AuthenticatedPemetaanIndexRouteImport.update({
    id: '/pemetaan/',
    path: '/pemetaan/',
    getParentRoute: () => AuthenticatedRoute,
  } as any)
const AuthenticatedTentangKamiKelompokKomunitasIndexRoute =
  AuthenticatedTentangKamiKelompokKomunitasIndexRouteImport.update({
    id: '/tentang-kami/kelompok-komunitas/',
    path: '/tentang-kami/kelompok-komunitas/',
    getParentRoute: () => AuthenticatedRoute,
  } as any)
const AuthenticatedProgramKamiPemberdayaanMasyarakatIndexRoute =
  AuthenticatedProgramKamiPemberdayaanMasyarakatIndexRouteImport.update({
    id: '/program-kami/pemberdayaan-masyarakat/',
    path: '/program-kami/pemberdayaan-masyarakat/',
    getParentRoute: () => AuthenticatedRoute,
  } as any)
const AuthenticatedProgramKamiPatroliChar38GeoTaggingIndexRoute =
  AuthenticatedProgramKamiPatroliChar38GeoTaggingIndexRouteImport.update({
    id: '/program-kami/patroli-&-geo-tagging/',
    path: '/program-kami/patroli-&-geo-tagging/',
    getParentRoute: () => AuthenticatedRoute,
  } as any)
const AuthenticatedProgramKamiMonitorBiodiversityIndexRoute =
  AuthenticatedProgramKamiMonitorBiodiversityIndexRouteImport.update({
    id: '/program-kami/monitor-biodiversity/',
    path: '/program-kami/monitor-biodiversity/',
    getParentRoute: () => AuthenticatedRoute,
  } as any)
const AuthenticatedProgramKamiAdopsiPohonIndexRoute =
  AuthenticatedProgramKamiAdopsiPohonIndexRouteImport.update({
    id: '/program-kami/adopsi-pohon/',
    path: '/program-kami/adopsi-pohon/',
    getParentRoute: () => AuthenticatedRoute,
  } as any)
const AuthenticatedDataPohonIndexRoute =
  AuthenticatedDataPohonIndexRouteImport.update({
    id: '/data/pohon/',
    path: '/data/pohon/',
    getParentRoute: () => AuthenticatedRoute,
  } as any)
const AuthenticatedTentangKamiKelompokKomunitasKelompokKomunitasNameRoute =
  AuthenticatedTentangKamiKelompokKomunitasKelompokKomunitasNameRouteImport.update(
    {
      id: '/tentang-kami/kelompok-komunitas/$kelompokKomunitasName',
      path: '/tentang-kami/kelompok-komunitas/$kelompokKomunitasName',
      getParentRoute: () => AuthenticatedRoute,
    } as any,
  )
const AuthenticatedDataPohonTreeIdIndexRoute =
  AuthenticatedDataPohonTreeIdIndexRouteImport.update({
    id: '/data/pohon/$treeId/',
    path: '/data/pohon/$treeId/',
    getParentRoute: () => AuthenticatedRoute,
  } as any)

export interface FileRoutesByFullPath {
  '/about': typeof AboutRoute
  '/login': typeof LoginRoute
  '/not-found': typeof NotFoundRoute
  '/register': typeof RegisterRoute
  '/profile': typeof AuthenticatedProfileRoute
  '/': typeof AuthenticatedIndexRoute
  '/tentang-kami': typeof TentangKamiIndexRoute
  '/pemetaan': typeof AuthenticatedPemetaanIndexRoute
  '/program-kami': typeof AuthenticatedProgramKamiIndexRoute
  '/wishtree': typeof AuthenticatedWishtreeIndexRoute
  '/tentang-kami/apa-itu-adopsi-pohon': typeof TentangKamiApaItuAdopsiPohonIndexRoute
  '/tentang-kami/kelompok-komunitas/$kelompokKomunitasName': typeof AuthenticatedTentangKamiKelompokKomunitasKelompokKomunitasNameRoute
  '/data/pohon': typeof AuthenticatedDataPohonIndexRoute
  '/program-kami/adopsi-pohon': typeof AuthenticatedProgramKamiAdopsiPohonIndexRoute
  '/program-kami/monitor-biodiversity': typeof AuthenticatedProgramKamiMonitorBiodiversityIndexRoute
  '/program-kami/patroli-&-geo-tagging': typeof AuthenticatedProgramKamiPatroliChar38GeoTaggingIndexRoute
  '/program-kami/pemberdayaan-masyarakat': typeof AuthenticatedProgramKamiPemberdayaanMasyarakatIndexRoute
  '/tentang-kami/kelompok-komunitas': typeof AuthenticatedTentangKamiKelompokKomunitasIndexRoute
  '/data/pohon/$treeId': typeof AuthenticatedDataPohonTreeIdIndexRoute
}
export interface FileRoutesByTo {
  '/about': typeof AboutRoute
  '/login': typeof LoginRoute
  '/not-found': typeof NotFoundRoute
  '/register': typeof RegisterRoute
  '/profile': typeof AuthenticatedProfileRoute
  '/': typeof AuthenticatedIndexRoute
  '/tentang-kami': typeof TentangKamiIndexRoute
  '/pemetaan': typeof AuthenticatedPemetaanIndexRoute
  '/program-kami': typeof AuthenticatedProgramKamiIndexRoute
  '/wishtree': typeof AuthenticatedWishtreeIndexRoute
  '/tentang-kami/apa-itu-adopsi-pohon': typeof TentangKamiApaItuAdopsiPohonIndexRoute
  '/tentang-kami/kelompok-komunitas/$kelompokKomunitasName': typeof AuthenticatedTentangKamiKelompokKomunitasKelompokKomunitasNameRoute
  '/data/pohon': typeof AuthenticatedDataPohonIndexRoute
  '/program-kami/adopsi-pohon': typeof AuthenticatedProgramKamiAdopsiPohonIndexRoute
  '/program-kami/monitor-biodiversity': typeof AuthenticatedProgramKamiMonitorBiodiversityIndexRoute
  '/program-kami/patroli-&-geo-tagging': typeof AuthenticatedProgramKamiPatroliChar38GeoTaggingIndexRoute
  '/program-kami/pemberdayaan-masyarakat': typeof AuthenticatedProgramKamiPemberdayaanMasyarakatIndexRoute
  '/tentang-kami/kelompok-komunitas': typeof AuthenticatedTentangKamiKelompokKomunitasIndexRoute
  '/data/pohon/$treeId': typeof AuthenticatedDataPohonTreeIdIndexRoute
}
export interface FileRoutesById {
  __root__: typeof rootRouteImport
  '/_authenticated': typeof AuthenticatedRouteWithChildren
  '/about': typeof AboutRoute
  '/login': typeof LoginRoute
  '/not-found': typeof NotFoundRoute
  '/register': typeof RegisterRoute
  '/_authenticated/profile': typeof AuthenticatedProfileRoute
  '/_authenticated/': typeof AuthenticatedIndexRoute
  '/tentang-kami/': typeof TentangKamiIndexRoute
  '/_authenticated/pemetaan/': typeof AuthenticatedPemetaanIndexRoute
  '/_authenticated/program-kami/': typeof AuthenticatedProgramKamiIndexRoute
  '/_authenticated/wishtree/': typeof AuthenticatedWishtreeIndexRoute
  '/tentang-kami/apa-itu-adopsi-pohon/': typeof TentangKamiApaItuAdopsiPohonIndexRoute
  '/_authenticated/tentang-kami/kelompok-komunitas/$kelompokKomunitasName': typeof AuthenticatedTentangKamiKelompokKomunitasKelompokKomunitasNameRoute
  '/_authenticated/data/pohon/': typeof AuthenticatedDataPohonIndexRoute
  '/_authenticated/program-kami/adopsi-pohon/': typeof AuthenticatedProgramKamiAdopsiPohonIndexRoute
  '/_authenticated/program-kami/monitor-biodiversity/': typeof AuthenticatedProgramKamiMonitorBiodiversityIndexRoute
  '/_authenticated/program-kami/patroli-&-geo-tagging/': typeof AuthenticatedProgramKamiPatroliChar38GeoTaggingIndexRoute
  '/_authenticated/program-kami/pemberdayaan-masyarakat/': typeof AuthenticatedProgramKamiPemberdayaanMasyarakatIndexRoute
  '/_authenticated/tentang-kami/kelompok-komunitas/': typeof AuthenticatedTentangKamiKelompokKomunitasIndexRoute
  '/_authenticated/data/pohon/$treeId/': typeof AuthenticatedDataPohonTreeIdIndexRoute
}
export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/about'
    | '/login'
    | '/not-found'
    | '/register'
    | '/profile'
    | '/'
    | '/tentang-kami'
    | '/pemetaan'
    | '/program-kami'
    | '/wishtree'
    | '/tentang-kami/apa-itu-adopsi-pohon'
    | '/tentang-kami/kelompok-komunitas/$kelompokKomunitasName'
    | '/data/pohon'
    | '/program-kami/adopsi-pohon'
    | '/program-kami/monitor-biodiversity'
    | '/program-kami/patroli-&-geo-tagging'
    | '/program-kami/pemberdayaan-masyarakat'
    | '/tentang-kami/kelompok-komunitas'
    | '/data/pohon/$treeId'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/about'
    | '/login'
    | '/not-found'
    | '/register'
    | '/profile'
    | '/'
    | '/tentang-kami'
    | '/pemetaan'
    | '/program-kami'
    | '/wishtree'
    | '/tentang-kami/apa-itu-adopsi-pohon'
    | '/tentang-kami/kelompok-komunitas/$kelompokKomunitasName'
    | '/data/pohon'
    | '/program-kami/adopsi-pohon'
    | '/program-kami/monitor-biodiversity'
    | '/program-kami/patroli-&-geo-tagging'
    | '/program-kami/pemberdayaan-masyarakat'
    | '/tentang-kami/kelompok-komunitas'
    | '/data/pohon/$treeId'
  id:
    | '__root__'
    | '/_authenticated'
    | '/about'
    | '/login'
    | '/not-found'
    | '/register'
    | '/_authenticated/profile'
    | '/_authenticated/'
    | '/tentang-kami/'
    | '/_authenticated/pemetaan/'
    | '/_authenticated/program-kami/'
    | '/_authenticated/wishtree/'
    | '/tentang-kami/apa-itu-adopsi-pohon/'
    | '/_authenticated/tentang-kami/kelompok-komunitas/$kelompokKomunitasName'
    | '/_authenticated/data/pohon/'
    | '/_authenticated/program-kami/adopsi-pohon/'
    | '/_authenticated/program-kami/monitor-biodiversity/'
    | '/_authenticated/program-kami/patroli-&-geo-tagging/'
    | '/_authenticated/program-kami/pemberdayaan-masyarakat/'
    | '/_authenticated/tentang-kami/kelompok-komunitas/'
    | '/_authenticated/data/pohon/$treeId/'
  fileRoutesById: FileRoutesById
}
export interface RootRouteChildren {
  AuthenticatedRoute: typeof AuthenticatedRouteWithChildren
  AboutRoute: typeof AboutRoute
  LoginRoute: typeof LoginRoute
  NotFoundRoute: typeof NotFoundRoute
  RegisterRoute: typeof RegisterRoute
  TentangKamiIndexRoute: typeof TentangKamiIndexRoute
  TentangKamiApaItuAdopsiPohonIndexRoute: typeof TentangKamiApaItuAdopsiPohonIndexRoute
}

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/register': {
      id: '/register'
      path: '/register'
      fullPath: '/register'
      preLoaderRoute: typeof RegisterRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/not-found': {
      id: '/not-found'
      path: '/not-found'
      fullPath: '/not-found'
      preLoaderRoute: typeof NotFoundRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/login': {
      id: '/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof LoginRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/about': {
      id: '/about'
      path: '/about'
      fullPath: '/about'
      preLoaderRoute: typeof AboutRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/_authenticated': {
      id: '/_authenticated'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthenticatedRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/tentang-kami/': {
      id: '/tentang-kami/'
      path: '/tentang-kami'
      fullPath: '/tentang-kami'
      preLoaderRoute: typeof TentangKamiIndexRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/_authenticated/': {
      id: '/_authenticated/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof AuthenticatedIndexRouteImport
      parentRoute: typeof AuthenticatedRoute
    }
    '/_authenticated/profile': {
      id: '/_authenticated/profile'
      path: '/profile'
      fullPath: '/profile'
      preLoaderRoute: typeof AuthenticatedProfileRouteImport
      parentRoute: typeof AuthenticatedRoute
    }
    '/tentang-kami/apa-itu-adopsi-pohon/': {
      id: '/tentang-kami/apa-itu-adopsi-pohon/'
      path: '/tentang-kami/apa-itu-adopsi-pohon'
      fullPath: '/tentang-kami/apa-itu-adopsi-pohon'
      preLoaderRoute: typeof TentangKamiApaItuAdopsiPohonIndexRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/_authenticated/wishtree/': {
      id: '/_authenticated/wishtree/'
      path: '/wishtree'
      fullPath: '/wishtree'
      preLoaderRoute: typeof AuthenticatedWishtreeIndexRouteImport
      parentRoute: typeof AuthenticatedRoute
    }
    '/_authenticated/program-kami/': {
      id: '/_authenticated/program-kami/'
      path: '/program-kami'
      fullPath: '/program-kami'
      preLoaderRoute: typeof AuthenticatedProgramKamiIndexRouteImport
      parentRoute: typeof AuthenticatedRoute
    }
    '/_authenticated/pemetaan/': {
      id: '/_authenticated/pemetaan/'
      path: '/pemetaan'
      fullPath: '/pemetaan'
      preLoaderRoute: typeof AuthenticatedPemetaanIndexRouteImport
      parentRoute: typeof AuthenticatedRoute
    }
    '/_authenticated/tentang-kami/kelompok-komunitas/': {
      id: '/_authenticated/tentang-kami/kelompok-komunitas/'
      path: '/tentang-kami/kelompok-komunitas'
      fullPath: '/tentang-kami/kelompok-komunitas'
      preLoaderRoute: typeof AuthenticatedTentangKamiKelompokKomunitasIndexRouteImport
      parentRoute: typeof AuthenticatedRoute
    }
    '/_authenticated/program-kami/pemberdayaan-masyarakat/': {
      id: '/_authenticated/program-kami/pemberdayaan-masyarakat/'
      path: '/program-kami/pemberdayaan-masyarakat'
      fullPath: '/program-kami/pemberdayaan-masyarakat'
      preLoaderRoute: typeof AuthenticatedProgramKamiPemberdayaanMasyarakatIndexRouteImport
      parentRoute: typeof AuthenticatedRoute
    }
    '/_authenticated/program-kami/patroli-&-geo-tagging/': {
      id: '/_authenticated/program-kami/patroli-&-geo-tagging/'
      path: '/program-kami/patroli-&-geo-tagging'
      fullPath: '/program-kami/patroli-&-geo-tagging'
      preLoaderRoute: typeof AuthenticatedProgramKamiPatroliChar38GeoTaggingIndexRouteImport
      parentRoute: typeof AuthenticatedRoute
    }
    '/_authenticated/program-kami/monitor-biodiversity/': {
      id: '/_authenticated/program-kami/monitor-biodiversity/'
      path: '/program-kami/monitor-biodiversity'
      fullPath: '/program-kami/monitor-biodiversity'
      preLoaderRoute: typeof AuthenticatedProgramKamiMonitorBiodiversityIndexRouteImport
      parentRoute: typeof AuthenticatedRoute
    }
    '/_authenticated/program-kami/adopsi-pohon/': {
      id: '/_authenticated/program-kami/adopsi-pohon/'
      path: '/program-kami/adopsi-pohon'
      fullPath: '/program-kami/adopsi-pohon'
      preLoaderRoute: typeof AuthenticatedProgramKamiAdopsiPohonIndexRouteImport
      parentRoute: typeof AuthenticatedRoute
    }
    '/_authenticated/data/pohon/': {
      id: '/_authenticated/data/pohon/'
      path: '/data/pohon'
      fullPath: '/data/pohon'
      preLoaderRoute: typeof AuthenticatedDataPohonIndexRouteImport
      parentRoute: typeof AuthenticatedRoute
    }
    '/_authenticated/tentang-kami/kelompok-komunitas/$kelompokKomunitasName': {
      id: '/_authenticated/tentang-kami/kelompok-komunitas/$kelompokKomunitasName'
      path: '/tentang-kami/kelompok-komunitas/$kelompokKomunitasName'
      fullPath: '/tentang-kami/kelompok-komunitas/$kelompokKomunitasName'
      preLoaderRoute: typeof AuthenticatedTentangKamiKelompokKomunitasKelompokKomunitasNameRouteImport
      parentRoute: typeof AuthenticatedRoute
    }
    '/_authenticated/data/pohon/$treeId/': {
      id: '/_authenticated/data/pohon/$treeId/'
      path: '/data/pohon/$treeId'
      fullPath: '/data/pohon/$treeId'
      preLoaderRoute: typeof AuthenticatedDataPohonTreeIdIndexRouteImport
      parentRoute: typeof AuthenticatedRoute
    }
  }
}

interface AuthenticatedRouteChildren {
  AuthenticatedProfileRoute: typeof AuthenticatedProfileRoute
  AuthenticatedIndexRoute: typeof AuthenticatedIndexRoute
  AuthenticatedPemetaanIndexRoute: typeof AuthenticatedPemetaanIndexRoute
  AuthenticatedProgramKamiIndexRoute: typeof AuthenticatedProgramKamiIndexRoute
  AuthenticatedWishtreeIndexRoute: typeof AuthenticatedWishtreeIndexRoute
  AuthenticatedTentangKamiKelompokKomunitasKelompokKomunitasNameRoute: typeof AuthenticatedTentangKamiKelompokKomunitasKelompokKomunitasNameRoute
  AuthenticatedDataPohonIndexRoute: typeof AuthenticatedDataPohonIndexRoute
  AuthenticatedProgramKamiAdopsiPohonIndexRoute: typeof AuthenticatedProgramKamiAdopsiPohonIndexRoute
  AuthenticatedProgramKamiMonitorBiodiversityIndexRoute: typeof AuthenticatedProgramKamiMonitorBiodiversityIndexRoute
  AuthenticatedProgramKamiPatroliChar38GeoTaggingIndexRoute: typeof AuthenticatedProgramKamiPatroliChar38GeoTaggingIndexRoute
  AuthenticatedProgramKamiPemberdayaanMasyarakatIndexRoute: typeof AuthenticatedProgramKamiPemberdayaanMasyarakatIndexRoute
  AuthenticatedTentangKamiKelompokKomunitasIndexRoute: typeof AuthenticatedTentangKamiKelompokKomunitasIndexRoute
  AuthenticatedDataPohonTreeIdIndexRoute: typeof AuthenticatedDataPohonTreeIdIndexRoute
}

const AuthenticatedRouteChildren: AuthenticatedRouteChildren = {
  AuthenticatedProfileRoute: AuthenticatedProfileRoute,
  AuthenticatedIndexRoute: AuthenticatedIndexRoute,
  AuthenticatedPemetaanIndexRoute: AuthenticatedPemetaanIndexRoute,
  AuthenticatedProgramKamiIndexRoute: AuthenticatedProgramKamiIndexRoute,
  AuthenticatedWishtreeIndexRoute: AuthenticatedWishtreeIndexRoute,
  AuthenticatedTentangKamiKelompokKomunitasKelompokKomunitasNameRoute:
    AuthenticatedTentangKamiKelompokKomunitasKelompokKomunitasNameRoute,
  AuthenticatedDataPohonIndexRoute: AuthenticatedDataPohonIndexRoute,
  AuthenticatedProgramKamiAdopsiPohonIndexRoute:
    AuthenticatedProgramKamiAdopsiPohonIndexRoute,
  AuthenticatedProgramKamiMonitorBiodiversityIndexRoute:
    AuthenticatedProgramKamiMonitorBiodiversityIndexRoute,
  AuthenticatedProgramKamiPatroliChar38GeoTaggingIndexRoute:
    AuthenticatedProgramKamiPatroliChar38GeoTaggingIndexRoute,
  AuthenticatedProgramKamiPemberdayaanMasyarakatIndexRoute:
    AuthenticatedProgramKamiPemberdayaanMasyarakatIndexRoute,
  AuthenticatedTentangKamiKelompokKomunitasIndexRoute:
    AuthenticatedTentangKamiKelompokKomunitasIndexRoute,
  AuthenticatedDataPohonTreeIdIndexRoute:
    AuthenticatedDataPohonTreeIdIndexRoute,
}

const AuthenticatedRouteWithChildren = AuthenticatedRoute._addFileChildren(
  AuthenticatedRouteChildren,
)

const rootRouteChildren: RootRouteChildren = {
  AuthenticatedRoute: AuthenticatedRouteWithChildren,
  AboutRoute: AboutRoute,
  LoginRoute: LoginRoute,
  NotFoundRoute: NotFoundRoute,
  RegisterRoute: RegisterRoute,
  TentangKamiIndexRoute: TentangKamiIndexRoute,
  TentangKamiApaItuAdopsiPohonIndexRoute:
    TentangKamiApaItuAdopsiPohonIndexRoute,
}
export const routeTree = rootRouteImport
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()
