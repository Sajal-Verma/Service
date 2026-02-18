import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user } = useContext(AuthContext);

  const linkClass = ({ isActive }) =>
    `transition ${
      isActive
        ? "text-purple-800 font-semibold"
        : "text-gray-600 hover:text-purple-700"
    }`;

  return (
    <nav className="bg-white border-b border-purple-100 shadow-md px-6 py-4 flex items-center justify-between">
      
      {/* Brand */}
      <Link
        to="/"
        className="text-2xl font-extrabold tracking-wide text-purple-900 flex items-center gap-2"
      >
        ServiceBook
      </Link>

      {/* Links */}
      <div className="flex items-center gap-6 ">
        {user ? (
          <NavLink to="/dashboard" className={linkClass}>
            {user.name}
          </NavLink>
        ) : (
          <>
            <NavLink to="/login" className={linkClass}>
              Login
            </NavLink>

            <NavLink
              to="/register"
              className="bg-purple-800 text-amber-100 px-4 py-1.5 rounded-md
                         hover:bg-purple-900 hover:text-amber-200
                         transition shadow-sm"
            >
              Register
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
