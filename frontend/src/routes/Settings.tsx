import { useContext } from "react";
import { EntryContextType } from "../@types/context";
import { Theme } from "../utilities/constants";
import { EntryContext } from "../utilities/globalContext";

export default function Settings() {
  const { theme, saveTheme, isDefaultTheme } = useContext(EntryContext) as EntryContextType;
  return (
    <section className="justify-center w-fit ml-auto mr-auto mt-10 gap-5 bg-gray-300 p-8 rounded-md">
      <h1 className="w-full text-xl mb-3">Settings</h1>
      <div className="flex">
        <div className="flex items-center mx-auto">Theme: </div>
        {Object.values(Theme).map((themeOption) => (
          <button
            key={themeOption}
            onClick={() => saveTheme(themeOption)}
            className={"ml-2 border px-2 py-1.5 rounded-md " + (!isDefaultTheme && theme == themeOption ? "bg-gray-200" : "bg-white")}
          >
            {themeOption.charAt(0).toUpperCase() + themeOption.slice(1)}
          </button>
        ))}
        <button
          className={"ml-2 border px-2 py-1.5 rounded-md " + (isDefaultTheme ? "bg-gray-200" : "bg-white")}
          onClick={() => saveTheme(null)}
        >
          System Default
        </button>
      </div>
    </section>
  );
}
