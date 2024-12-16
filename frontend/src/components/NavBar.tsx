import { NavLink } from "react-router-dom";

export default function NavBar() {
  return (
    <nav className="w-full flex justify-center gap-5">
      <NavLink
        className="m-3 p-4 text-xl bg-button-colored hover:bg-button-colored-hover rounded-md font-medium text-button-colored-text"
        to={"/"}
      >
        All Entries
      </NavLink>
      <NavLink
        className="m-3 p-4 text-xl bg-button-colored hover:bg-button-colored-hover rounded-md font-medium text-button-colored-text"
        to={"/create"}
      >
        New Entry
      </NavLink>
      <NavLink
        className="m-3 p-4 text-xl bg-button-colored hover:bg-button-colored-hover rounded-md font-medium text-button-colored-text"
        to={"/settings"}
      >
        Settings
      </NavLink>
    </nav>
  );
}
