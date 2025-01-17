
const Background = ({children}) => {
  return (
    <div className="overflow-hidden w-full max-h-screen bg-cover bg-center bg-no-repeat bg-[url('/Skillsync-img/authBackground.svg')]">
      <img className="pl-6 pt-3" src="/Skillsync-img/logo.svg" alt="logo" />
      <div className="flex flex-col justify-center min-h-screen">
      {children}
      </div>
    </div>
  )
}

export default Background
