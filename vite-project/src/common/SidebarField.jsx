import PropTypes from 'prop-types'
import { NavLink } from 'react-router'

const SidebarField = ({ path, imgsrc, string }) => {
  return (
    <li>
      <NavLink
        to={path}
        className={({ isActive }) =>
          `flex items-center space-x-4 py-2 px-4 rounded-sm ${
            isActive ? 'bg-custom-green text-white' : 'hover:bg-custom-green'
          }`
        }
      >
        <img src={imgsrc} alt={imgsrc} className="w-6 h-6" />
        <span className="text-sm font-medium truncate">{string}</span>
      </NavLink>
    </li>
  )
}

SidebarField.propTypes = {
  path: PropTypes.string.isRequired,
  imgsrc: PropTypes.string.isRequired,
  string: PropTypes.string.isRequired,
}

export default SidebarField
