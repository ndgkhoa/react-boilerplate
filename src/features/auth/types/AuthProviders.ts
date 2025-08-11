export const AuthProviders = {
  Local: 'local',
} as const;

export type AuthProviders = (typeof AuthProviders)[keyof typeof AuthProviders];
