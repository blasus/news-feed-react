import { createContext, Dispatch, SetStateAction, useContext } from "react";

export type Preferences = {
  sources: string[],
  categories: string[],
  authors: string[]
}

export type PreferencesContextType = {
  preferences: Preferences,
  setPreferences: Dispatch<SetStateAction<Preferences>>
}

// Create the context
export const PreferencesContext = createContext<PreferencesContextType | null>(null);

export const usePreferences = () => useContext(PreferencesContext);
