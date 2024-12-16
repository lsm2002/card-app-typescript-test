import { useContext, ReactNode } from "react";
import { EntryContextType } from "../@types/context";
import { EntryContext } from "../utilities/globalContext";

interface ChildrenProp {
  children: ReactNode;
}

export default function ThemeContainer({ children }: ChildrenProp) {
  const { theme } = useContext(EntryContext) as EntryContextType;
  return <section className={"bg-background text-background-text h-screen " + theme}>{children}</section>;
}
