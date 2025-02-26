

// import { useEffect } from 'react'

// import toast from 'react-hot-toast'
// import { useSelector, useDispatch } from 'react-redux'
// import { useLocation, useNavigate } from 'react-router'

// import ForgetPassword from './ForgetPassword'
// import Background from '../../common/Background'

// import AuthForm from './AuthForm'
// import { changeFormType, openModal } from '../../Redux/Slice/ModalSlice'
// import { PATH_DASHBOARD, PATH_RESETPASSWORD, PATH_SIGNUP } from '../../constants/RouteConstants'


// const SignIn = () => {
//   const navigate = useNavigate()
//   const dispatch = useDispatch()
//   const location = useLocation()

//   const { type, formType } = useSelector((state) => state.modal)
//   console.log('type: ', type)
//   console.log('formType: ', formType)
//   const isAuthenticated = useSelector((state) => state?.signIn?.isAuthenticated)

//   useEffect(() => {
//     const currentFormType = location.pathname === PATH_SIGNUP ? 'signUp' : location.pathname === PATH_RESETPASSWORD ? 'resetPassword' : 'signIn'
//     if (formType !== currentFormType) {
//       dispatch(changeFormType(currentFormType))
//     }
//   }, [location.pathname, dispatch, formType])

//   // Navigate to homepage if authenticated
//   useEffect(() => {
//     if (isAuthenticated) {
//       toast.success('Signed In Successfully')
//       navigate(PATH_DASHBOARD, { replace: true })
//     }
//     dispatch(openModal(''))
//   }, [isAuthenticated, navigate, dispatch])

//   return (
//     <>
//       <Background>
//         {/* <SignInForm /> */}
//         <AuthForm formType={formType} />

//         {type !== '' && <ForgetPassword />}
//       </Background>
//     </>
//   )
// }

// export default SignIn
