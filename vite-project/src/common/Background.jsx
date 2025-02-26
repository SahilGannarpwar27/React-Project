import { IconPack } from "../constants/IconPack.js"
import PropTypes from "prop-types"

//Scenario : Background for Auth Section
const Background = ({children}) => {
  return (
    <div className="overflow-hidden w-full  bg-cover bg-center bg-no-repeat bg-[url('/Skillsync-img/authBackground.svg')]">
      <img className="pl-6 pt-3" src={IconPack.logo} alt="logo" />
      <div className="flex flex-col justify-center min-h-screen">
      {children}
      </div>
    </div>
  )
}
Background.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Background
