import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import signInReducer from './Slice/SignInSlice'
import modalReducer from './Slice/ModalSlice'
import coursesReducer from './Slice/CoursesSlice'
import newCoursesReducer from './Slice/NewCoursesSlice'


const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  blacklist: ['courses'],
}
// console.log('coursesReducer ', coursesReducer)
const reducer = combineReducers({
  signIn: signInReducer,
  modal: modalReducer,
  courses: coursesReducer,
  newCourses: newCoursesReducer,
})

const persistedReducer = persistReducer(persistConfig, reducer)

export const Store = configureStore({
    reducer: persistedReducer,
  // reducer: {
  //   signIn: signInReducer,
  //   modal: modalReducer,
  // },
})
