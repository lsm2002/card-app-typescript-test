import axios from "axios";
import { createContext, FC, ReactNode, useEffect, useState } from "react";
import { Entry, EntryContextType } from "../@types/context";
import { Theme } from "./constants";

export const EntryContext = createContext<EntryContextType | null>(null);

export const EntryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [entries, setEntries] = useState<Entry[]>([]);

  const [theme, setTheme] = useState<Theme>(Theme.light);

  const [isDefaultTheme, setIsDefaultTheme] = useState<boolean>(true);

  const setThemeStates = async (theme: Theme | null) => {
    if (theme) {
      setTheme(theme);
      setIsDefaultTheme(false);
    } else {
      // use default theme
      setTheme(window.matchMedia("(prefers-color-scheme: dark)").matches ? Theme.dark : Theme.light);
      setIsDefaultTheme(true);
    }
  };

  const saveTheme = async (theme: Theme | null) => {
    if (theme) {
      localStorage.theme = theme;
    } else {
      localStorage.removeItem("theme");
    }
    setThemeStates(theme);
  };

  const initState = async () => {
    const data = await axios.get<Entry[]>("http://localhost:3001/get/");
    const initialStateBody = data.data;
    setEntries(initialStateBody);

    if ("theme" in localStorage && localStorage.theme in Theme) {
      setThemeStates(localStorage.theme as Theme);
    } else {
      saveTheme(null);
    }
  };

  useEffect(() => {
    initState();
  }, []);

  const saveEntry = async (entry: Entry) => {
    const requestData = await axios.post<Entry>("http://localhost:3001/create/", entry);
    const newEntry = requestData.data;
    setEntries([...entries, newEntry]);
  };

  const updateEntry = async (id: string, entry: Entry) => {
    await axios.put<Entry>(`http://localhost:3001/update/${id}`, entry);
    setEntries((entries) => {
      const entryIndex = entries.findIndex((obj) => obj.id == id);
      entries[entryIndex] = entry;
      console.log(entries);
      return entries;
    });
  };
  const deleteEntry = async (id: string) => {
    await axios.delete<Entry>(`http://localhost:3001/delete/${id}`);
    setEntries((e) => e.filter((entry) => entry.id != id));
  };

  return (
    <EntryContext.Provider value={{ entries, saveEntry, updateEntry, deleteEntry, theme, isDefaultTheme, saveTheme }}>
      {children}
    </EntryContext.Provider>
  );
};
