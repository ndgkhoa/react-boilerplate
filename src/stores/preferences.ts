import { persist, devtools } from 'zustand/middleware';
import { create } from 'zustand';

import i18n from '~/i18n';

type PreferencesType = {
  language: string;
  setLanguage: (lang: string) => void;
};

export const usePreferencesStore = create<PreferencesType>()(
  devtools(
    persist(
      (set) => ({
        language: i18n.language || 'en',
        setLanguage: (lang) => {
          i18n.changeLanguage(lang);
          set({ language: lang });
        },
      }),
      {
        name: 'local-storage',
      }
    ),
    { name: 'ZustandStore' }
  )
);
