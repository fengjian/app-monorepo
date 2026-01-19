import { useCallback, useMemo } from 'react';

export const useVersionCompatible = () => {
  const showFallbackUpdateDialog = useCallback(
    (_version: string | null | undefined) => undefined,
    [],
  );

  const isVersionCompatible = useCallback(
    (_version: string | null | undefined) => true,
    [],
  );

  return useMemo(
    () => ({ isVersionCompatible, showFallbackUpdateDialog }),
    [isVersionCompatible, showFallbackUpdateDialog],
  );
};
