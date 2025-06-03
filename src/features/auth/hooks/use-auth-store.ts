import { persist, devtools } from 'zustand/middleware';
import { create } from 'zustand';

import type { AuthProviders } from '~/features/auth/types/AuthProviders';

export type AuthType = {
  UserId?: string;
  AccessToken?: string;
  RefreshToken?: string;
};

export type AuthDataType = AuthType & {
  isAuthenticated: boolean;
  provider: AuthProviders;
};

export type AuthStoreType = {
  auth: AuthDataType | null;
  setAuth: (auth: AuthDataType | null) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthStoreType>()(
  devtools(
    persist(
      (set) => ({
        auth: null,
        setAuth: (auth) => {
          set({ auth });
        },
        logout: () => {
          set((state) => ({ ...state, auth: null }));
        },
      }),
      {
        name: 'auth-store',
      }
    ),
    { name: 'ZustandAuthStore' }
  )
);
