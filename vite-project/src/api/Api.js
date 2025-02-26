import axios from 'axios'
import { API_BASE_URL } from '../constants/APIConstants'
// import { authToken } from '../Redux/Slice/SignInSlice'
import { Store } from '../Redux/Store'

const API = axios.create({
  baseURL: API_BASE_URL,
})



API.interceptors.request.use(
  (config) => {
    const token = Store?.getState()?.signIn?.authData?.token
    if (token) {
      config.headers.Authorization = `Token ${token}`
    }
    return config
  },
  (error) => {
    Promise.reject(error)
  }
)


export default API;
