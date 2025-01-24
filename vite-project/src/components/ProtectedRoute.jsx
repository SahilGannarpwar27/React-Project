
import { useSelector } from "react-redux";
import { Navigate} from "react-router"

import HomePage from "./Homepage/HomePage";


const ProtectedRoute = () => {

    const isAuthenticated = useSelector((state) => state.signIn.isAuthenticated)

    if(!isAuthenticated){
        return <Navigate to='/login' />
    }
    else{
        return <HomePage />
    }


}

export default ProtectedRoute
