import { ReactNode, useContext } from "react";
import { EntryContextType } from "../@types/context";
import { EntryContext } from "../utilities/globalContext";

interface ContainerProps {
  children: ReactNode;
}

export default function ThemeContainer({ children }: ContainerProps) {
  const { theme } = useContext(EntryContext) as EntryContextType;
  return <section className={"bg-background text-background-text h-screen " + theme}>{children}</section>;
}
