import type { ITabSubNavigatorConfig } from '@onekeyhq/components';
import { ETabSettingsRoutes } from '@onekeyhq/shared/src/routes';

import { LazyLoadRootTabPage } from '../../../components/LazyLoadPage';

const SettingsTab = LazyLoadRootTabPage(
  () => import('../../../views/Setting/pages/Tab'),
);

export const settingRouters: ITabSubNavigatorConfig<any, any>[] = [
  {
    name: ETabSettingsRoutes.TabSettings,
    component: SettingsTab,
    headerShown: false,
  },
];
