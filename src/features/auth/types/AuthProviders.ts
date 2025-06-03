export const AuthProviders = {
  Local: 'local',
  Microsoft: 'microsoft',
} as const;

export type AuthProviders = (typeof AuthProviders)[keyof typeof AuthProviders];
