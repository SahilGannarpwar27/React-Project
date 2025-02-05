import { IconPack } from "../constants/IconPack.js"

//Scenario : Background for Auth Section
// eslint-disable-next-line react/prop-types
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

export default Background
