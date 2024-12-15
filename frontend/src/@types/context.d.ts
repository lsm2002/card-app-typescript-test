import { Theme } from "../utilities/constants";

export interface Entry {
  id?: string;
  title: string;
  description: string;
  created_at: Date | string;
};

export type EntryContextType = {
  entries: Entry[];
  saveEntry: (entry: Entry) => void;
  updateEntry: (id: string, entryData: Entry) => void;
  deleteEntry: (id: string) => void;
  theme: Theme;
  saveTheme : (theme: Theme | null) => void;
  isDefaultTheme: boolean;
};
