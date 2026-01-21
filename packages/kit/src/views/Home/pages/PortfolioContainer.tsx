import { useMemo } from 'react';

import { Stack, Tabs, XStack, YStack, useMedia } from '@onekeyhq/components';
import platformEnv from '@onekeyhq/shared/src/platformEnv';

import { useActiveAccount } from '../../../states/jotai/contexts/accountSelector';
import useActiveTabDAppInfo from '../../DAppConnection/hooks/useActiveTabDAppInfo';
import { HomeTokenListProviderMirrorWrapper } from '../components/HomeTokenListProvider';
import { PullToRefresh, onHomePageRefresh } from '../components/PullToRefresh';
import { TokenListBlock } from '../components/TokenListBlock';

function PortfolioContainer() {
  const media = useMedia();

  const tableLayout = media.gtMd;
  const showRecentHistory = media.gtXl;

  const { result: extensionActiveTabDAppInfo } = useActiveTabDAppInfo();
  const addPaddingOnListFooter = useMemo(
    () => !!extensionActiveTabDAppInfo?.showFloatingPanel,
    [extensionActiveTabDAppInfo?.showFloatingPanel],
  );

  if (tableLayout) {
    return (
      <XStack pt="$3" pb="$4" px="$5" gap="$6">
        <YStack flex={1} gap="$8">
          <TokenListBlock showRecentHistory={showRecentHistory} tableLayout />
        </YStack>
        {addPaddingOnListFooter ? <Stack h="$16" /> : null}
      </XStack>
    );
  }

  return (
    <YStack gap="$6" px="$5" pt="$3" pb="$4">
      <TokenListBlock />
      {addPaddingOnListFooter ? <Stack h="$16" /> : null}
    </YStack>
  );
}

function PortfolioContainerWithProvider() {
  const {
    activeAccount: { account },
  } = useActiveAccount({ num: 0 });

  return (
    <HomeTokenListProviderMirrorWrapper accountId={account?.id ?? ''}>
      <Tabs.ScrollView
        nestedScrollEnabled={platformEnv.isNativeAndroid}
        refreshControl={
          !platformEnv.isNativeAndroid ? (
            <PullToRefresh onRefresh={onHomePageRefresh} />
          ) : undefined
        }
      >
        <PortfolioContainer />
      </Tabs.ScrollView>
    </HomeTokenListProviderMirrorWrapper>
  );
}
PortfolioContainerWithProvider.displayName = 'PortfolioContainerWithProvider';

export { PortfolioContainerWithProvider };
