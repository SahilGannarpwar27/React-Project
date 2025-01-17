import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

import { logout, resetErrors } from "../../Redux/Slice/SignInSlice";

const   Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

   // Reset authentication state on page load or navigation back to sign-in and Clear any errors

  const handleLogout = () => {

    dispatch(logout())
    dispatch(resetErrors())
    navigate('/login')
    toast.success("Logged Out Successfully")
  }
  
  return (
    <div className="flex justify-between items-center sticky bg-slate-800 p-4 pr-8">
      <div>
        <img className="h-12" src="/Skillsync-img/logo.svg" alt="Skill Sync Logo" />
      </div>
      <div className="flex items-center space-x-4">
        <img
          className="h-6"
          src="/Skillsync-img/notification.svg"
          alt="Notification Icon"
        />
        <p className="text-white text-2xl font-medium">|</p>
        <div className="w-12 h-12 border border-slate-600 overflow-hidden">
          <img
            className="w-full h-full object-cover"
            src="/Skillsync-img/userphoto.jpg"
            alt="User Image"
          />
        </div>
        <div>
          <h3 className="text-white text-m">User Name</h3>
          <p className="text-green-500 text-xs">Admin</p>
        </div>
        <img src="/Skillsync-img/dropdownIcon.svg" alt="dropDownIcon" />
        <button className="border border-custom-green text-white font-bold py-2 px-4 rounded-sm mt-2 mb-2 mr-7 cursor-pointer" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};
export default Header;