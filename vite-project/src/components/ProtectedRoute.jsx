// import { useSelector } from "react-redux"
import { useSelector } from "react-redux";
import { Navigate} from "react-router"


const ProtectedRoute = ({children}) => {

    const isAuthenticated = useSelector((state) => state.signIn.isAuthenticated)

    if(!isAuthenticated){
        return <Navigate to='/login' />
    }
    return children;

}

export default ProtectedRoute
