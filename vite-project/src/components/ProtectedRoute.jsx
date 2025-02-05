
import { useSelector } from "react-redux";
import { Navigate} from "react-router"

import HomePage from "./Homepage/HomePage";
import { PATH_LOGIN } from "../constants/RouteConstants";


const ProtectedRoute = () => {

    const isAuthenticated = useSelector((state) => state.signIn.isAuthenticated)

    if(!isAuthenticated){
        return <Navigate to={PATH_LOGIN} />
    }
    else{
        return <HomePage />
    }


}

export default ProtectedRoute
