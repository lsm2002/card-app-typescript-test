import { useContext } from "react";
import { Entry, EntryContextType } from "../@types/context";
import { EntryContext } from "../utilities/globalContext";

export default function ThemeContainer({ children }) {
  const { theme } = useContext(EntryContext) as EntryContextType;
  return <section className={theme}>{children}</section>;
}
