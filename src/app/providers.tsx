'use client';

import { PropsWithChildren, useState } from "react";
import { Preferences, PreferencesContext } from "./context/PreferencesContext";

export const PreferencesContextProvider = ({ children }: PropsWithChildren) => {
  const [preferences, setPreferences] = useState<Preferences>({
    sources: [],
    categories: [],
    authors: [],
  });

  return (
    <PreferencesContext.Provider value={{ preferences, setPreferences }}>
      {children}
    </PreferencesContext.Provider>
  );
}