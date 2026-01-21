import { useMemo } from 'react';

import { getTokenValue } from '@onekeyhq/components';
import type {
  ITabNavigatorConfig,
  ITabNavigatorExtraConfig,
} from '@onekeyhq/components/src/layouts/Navigation/Navigator/types';
import { useIsGtMdNonNative } from '@onekeyhq/kit/src/views/DeviceManagement/hooks/useToMyOneKeyModal';
import { ETranslations } from '@onekeyhq/shared/src/locale';
import platformEnv from '@onekeyhq/shared/src/platformEnv';
import { ETabRoutes } from '@onekeyhq/shared/src/routes';
import { developerRouters } from '../../views/Developer/router';
import { useDeviceManagerModalStyle } from '../../views/DeviceManagement/hooks/useDeviceManagerModalStyle';
import { homeRouters } from '../../views/Home/router';

import { deviceManagementRouters } from './DeviceManagement/router';
import { discoveryRouters } from './Discovery/router';
import { earnRouters } from './Earn/router';
import { multiTabBrowserRouters } from './MultiTabBrowser/router';
import { settingRouters } from './Setting/router';

type IGetTabRouterParams = {
  freezeOnBlur?: boolean;
};

const useIsShowDesktopDiscover = () => {
  return useMemo(() => platformEnv.isDesktop, []);
};

const getDiscoverRouterConfig = (
  params?: IGetTabRouterParams,
  tabBarStyle?: ITabNavigatorConfig<ETabRoutes>['tabBarStyle'],
) => {
  const discoverRouterConfig: ITabNavigatorConfig<ETabRoutes> = {
    name: ETabRoutes.Discovery,
    rewrite: '/discovery',
    exact: true,
    tabBarIcon: (focused?: boolean) =>
      focused ? 'CompassCircleSolid' : 'CompassCircleOutline',
    translationId: platformEnv.isNative
      ? ETranslations.global_discover
      : ETranslations.global_browser,
    freezeOnBlur: Boolean(params?.freezeOnBlur),
    children: discoveryRouters,
    tabBarStyle,
    trackId: 'global-browser',
  };
  return discoverRouterConfig;
};

export const useTabRouterConfig = (params?: IGetTabRouterParams) => {
  const { isModalStack } = useDeviceManagerModalStyle();
  const isShowDesktopDiscover = useIsShowDesktopDiscover();
  const isWebDappMode = platformEnv.isWebDappMode;
  const isExtensionCompactMode =
    platformEnv.isExtensionUiPopup || platformEnv.isExtensionUiSidePanel;
  const isShowMDDiscover = useMemo(
    () => !isShowDesktopDiscover && !platformEnv.isWebDappMode,
    [isShowDesktopDiscover],
  );

  const isGtMdNonNative = useIsGtMdNonNative();
  const discoverTabConfig = useMemo(() => {
    if (isShowDesktopDiscover) {
      return getDiscoverRouterConfig(params, {
        marginTop: getTokenValue('$4', 'size'),
      });
    }
    if (isShowMDDiscover) {
      return getDiscoverRouterConfig(params);
    }
    return undefined;
  }, [isShowDesktopDiscover, isShowMDDiscover, params]);

  return useMemo(() => {
    const tabs = [
      {
        name: ETabRoutes.Home,
        tabBarIcon: (focused?: boolean) =>
          focused ? 'WalletSolid' : 'WalletOutline',
        translationId: ETranslations.global_wallet,
        freezeOnBlur: Boolean(params?.freezeOnBlur),
        rewrite: '/',
        exact: true,
        children: homeRouters,
        trackId: 'global-wallet',
        hiddenIcon: isWebDappMode,
      },
      isExtensionCompactMode
        ? undefined
        : {
            name: ETabRoutes.DeviceManagement,
            tabBarIcon: () => 'OnekeyDeviceCustom',
            translationId: ETranslations.global_device,
            freezeOnBlur: Boolean(params?.freezeOnBlur),
            exact: true,
            children: deviceManagementRouters,
            trackId: 'global-my-onekey',
            hideOnTabBar: isModalStack,
          },
      discoverTabConfig,
      isExtensionCompactMode
        ? undefined
        : {
            name: ETabRoutes.Settings,
            tabBarIcon: (focused?: boolean) =>
              focused ? 'SettingsSolid' : 'SettingsOutline',
            translationId: ETranslations.settings_settings,
            freezeOnBlur: Boolean(params?.freezeOnBlur),
            rewrite: '/settings',
            exact: true,
            children: settingRouters,
            trackId: 'global-settings',
          },
      {
        name: ETabRoutes.Earn,
        tabBarIcon: (focused?: boolean) =>
          focused ? 'CoinsSolid' : 'CoinsOutline',
        translationId: ETranslations.global_earn,
        freezeOnBlur: Boolean(params?.freezeOnBlur),
        rewrite: '/defi',
        exact: true,
        children: earnRouters,
        trackId: 'global-earn',
        hideOnTabBar: true,
      },
      platformEnv.isDev
        ? {
            name: ETabRoutes.Developer,
            tabBarIcon: (focused?: boolean) =>
              focused ? 'CodeBracketsSolid' : 'CodeBracketsOutline',
            translationId: ETranslations.global_dev_mode,
            freezeOnBlur: Boolean(params?.freezeOnBlur),
            rewrite: '/dev',
            exact: true,
            children: developerRouters,
            trackId: 'global-dev',
            hideOnTabBar: true,
          }
        : undefined,
    ].filter((i) => !!i);

    return tabs;
  }, [
    params,
    isWebDappMode,
    isGtMdNonNative,
    isModalStack,
    discoverTabConfig,
  ]) as ITabNavigatorConfig<ETabRoutes>[];
};

export const tabExtraConfig: ITabNavigatorExtraConfig<ETabRoutes> | undefined =
  {
    name: ETabRoutes.MultiTabBrowser,
    children: multiTabBrowserRouters,
  };
