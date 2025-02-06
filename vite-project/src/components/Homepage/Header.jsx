import toast from 'react-hot-toast'

import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'

import { logout } from '../../Redux/Slice/SignInSlice'
import { IconPack } from '../../constants/IconPack.js'
import { Strings } from '../../constants/Strings'
import { PATH_LOGIN } from '../../constants/RouteConstants'

const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // Reset authentication state on page load or navigation back to sign-in and Clear any errors
  const handleLogout = () => {
    dispatch(logout())
    // dispatch(resetErrors())
    navigate(PATH_LOGIN)
    toast.success('Logged Out Successfully')
  }

  return (
    <div className="flex justify-between items-center sticky bg-slate-800 p-4 pr-8">
      <div>
        <img className="h-12" src={IconPack.logo} alt="Skill Sync Logo" />
      </div>
      <div className="flex items-center space-x-4">
        <img className="h-6" src={IconPack.notification} alt="Notification Icon" />
        <p className="text-white text-2xl font-medium">|</p>
        <div className="w-12 h-12 border border-slate-600 overflow-hidden">
          <img className="w-full h-full object-cover" src={IconPack.userphoto} alt="User Image" />
        </div>
        {/* User Info */}
        <div>
          <h3 className="text-white text-m">{Strings.username}</h3>
          <p className="text-green-500 text-xs">{Strings.admin}</p>
        </div>
        <img src={IconPack.dropdownIcon} alt="dropDownIcon" />
        {/* Logout button */}
        <button
          className="border border-custom-green text-white font-bold py-2 px-4 rounded-sm mt-2 mb-2 mr-7 cursor-pointer"
          onClick={handleLogout}
        >
          {Strings.logout}
        </button>
      </div>
    </div>
  )
}
export default Header
