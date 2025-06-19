// Let's start with the first component: Navbar

import { NavbarData } from "../data/Navbar";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="w-full h-16 flex items-center justify-center bg-gray-900 shadow-md px-6">
      <div className="max-w-[1200px] w-full flex justify-between items-center">
        <h1 className="text-white font-bold text-2xl tracking-wide">PasteKeeper</h1>
        <div className="flex gap-6">
          {NavbarData.map((link, idx) => (
            <NavLink
              key={idx}
              to={link.path}
              className={({ isActive }) =>
                isActive
                  ? "text-blue-400 font-semibold text-lg border-b-2 border-blue-400 pb-1"
                  : "text-white hover:text-blue-300 text-lg transition-all"
              }
            >
              {link.title}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
