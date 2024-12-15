import { NavLink } from "react-router-dom";

export default function NavBar() {
  return (
    <nav className="w-full flex justify-center gap-5">
      <NavLink className="m-3 p-4 text-xl bg-primary bg-opacity-80 hover:bg-opacity-100 rounded-md font-medium text-white" to={"/"}>
        All Entries
      </NavLink>
      <NavLink
        className="m-3 p-4 text-xl bg-primary bg-opacity-80 hover:bg-opacity-100 rounded-md font-medium text-white"
        to={"/create"}
      >
        New Entry
      </NavLink>
      <NavLink
        className="m-3 p-4 text-xl bg-primary bg-opacity-80 hover:bg-opacity-100 rounded-md font-medium text-white"
        to={"/settings"}
      >
        Settings
      </NavLink>
    </nav>
  );
}
