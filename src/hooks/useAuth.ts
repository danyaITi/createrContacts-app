import { useDispatch } from "react-redux";
import { setAuth } from "../store/slice/auth";

export const useAuth = () =>{
    const dispatch = useDispatch()

    const logoutUser = () => {
        localStorage.removeItem('userToken')
        localStorage.removeItem('user')
        dispatch(setAuth(false))
    }

    const isAuth = () => {
        return !!localStorage.getItem('userToken')
    }

    const init = () => {
        if (isAuth()) {
            dispatch(setAuth(true))
        }
    }

    return {
        logoutUser,
        init
    }
}