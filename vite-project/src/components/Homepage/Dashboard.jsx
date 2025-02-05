import { Strings } from "../../constants/Strings"

const Dashboard = () => {
  //This is the dashboard where user will navigate after signing in
  return (
    <div>
      <h1 className="text-2xl font-bold">{Strings.dashboard}</h1>
    </div>
  )
}

export default Dashboard
