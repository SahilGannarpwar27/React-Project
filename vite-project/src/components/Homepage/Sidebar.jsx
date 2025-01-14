
import { NavLink } from "react-router";

const Sidebar = () => {
  return (
    <aside className="w-1/5 min-w-[20%] bg-white text-black h-screen shadow-[1px_2px_12px_0px_#00000014] border-gray-300">
      <ul className="space-y-4 p-4">
        {/* Dashboard Link */}
        <li>
          <NavLink 
            to="/homepage/dashboard"
            className="flex items-center space-x-4 py-2 px-4 rounded-sm hover:bg-custom-green"
          >
            <img
              src="/Skillsync-img/home.svg"
              alt="Home"
              className="w-6 h-6"
            />
            <span className="text-sm font-medium truncate">Dashboard</span>
          </NavLink>
        </li>

        {/* Courses Link */}
        <li>
        <NavLink
            to="/homepage/courses" 
            className="flex items-center space-x-4 py-2 px-4 rounded-sm hover:bg-custom-green"
          >
            <img
              src="/Skillsync-img/graduation-cap-fill.svg"
              alt="Courses"
              className="w-6 h-6"
            />
            <span className="text-sm font-medium truncate">All courses</span>
          </NavLink>
        </li>

        {/* User Management Link */}
        <li>
        <NavLink
            to="/homepage/user-management"
            className="flex items-center space-x-4 py-2 px-4 rounded-sm hover:bg-custom-green"
            // activeClassName="bg-custom-green text-white"
          >
            <img
              src="/Skillsync-img/UserManagement.png"
              alt="User Management"
              className="w-6 h-6"
            />
            <span className="text-sm font-medium truncate">User Management</span>
          </NavLink>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;