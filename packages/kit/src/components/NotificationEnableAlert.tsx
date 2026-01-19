import { memo } from 'react';

export type INotificationAlertScene =
  | 'txHistory'
  | 'swapHistory'
  | 'perpHistory';

function BasicNotificationEnableAlert({
  scene: _scene,
  recomputeLayout: _recomputeLayout,
  opacity: _opacity,
  setOpacity: _setOpacity,
}: {
  scene: INotificationAlertScene;
  recomputeLayout?: () => void;
  opacity?: number;
  setOpacity?: (opacity: number) => void;
}) {
  return null;
}

export const NotificationEnableAlert = memo(BasicNotificationEnableAlert);
