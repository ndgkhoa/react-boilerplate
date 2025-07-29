import { useEffect } from 'react';

import { axiosClient } from '~/config/axios';
import { AuthProviders } from '~/features/auth/types/AuthProviders';
import type { AuthDataType } from '~/features/auth/hooks/use-auth-store';

export const useSyncAccessToken = (authState: AuthDataType | null) => {
  useEffect(() => {
    const isLocal = authState?.provider === AuthProviders.Local;
    const token = authState?.AccessToken;

    if (isLocal && token) {
      axiosClient.setAccessToken(token);
    }
  }, [authState?.provider, authState?.AccessToken]);
};
