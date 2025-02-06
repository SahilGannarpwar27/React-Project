import { useEffect, useState } from 'react'

import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router'

import ForgetPassword from './ForgetPassword'
import InputField from '../../common/InputField'
import usePasswordToggle from '../../hooks/usePasswordToggle'
import Background from '../../common/Background'
import { openModal } from '../../Redux/Slice/ModalSlice'
import { signInUser } from '../../Redux/Slice/SignInSlice'
import './SignIn.css'
import { Strings } from '../../constants/Strings'
import { PATH_SIGNUP, PATH_DASHBOARD } from '../../constants/RouteConstants'

const SignIn = () => {
  const [isInvalidError, setIsInvalidError] = useState(null)
  const isAuthenticated = useSelector((state) => state?.signIn?.isAuthenticated)
  const { type } = useSelector((state) => state.modal)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [showPassword, togglePasswordVisibility] = usePasswordToggle()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm()

  const formValues = watch()
  // Handle sign-in
  const handleSignIn = async () => {
    try {
      await dispatch(signInUser(formValues)).unwrap()
    } catch (errorMessage) {
      setIsInvalidError(errorMessage)
      toast.error(errorMessage)
    }
  }
  console.log('type in handleCross = ', type)
  // Handle forgot password modal
  const toggleModal = (e) => {
    e.preventDefault()
    dispatch(openModal('ForgetPassword'))
  }

  // Navigate to homepage if authenticated
  useEffect(() => {
    if (isAuthenticated) {
      toast.success('Signed In Successfully')
      navigate(PATH_DASHBOARD, { replace: true })
    }
    dispatch(openModal(''))
  }, [isAuthenticated, navigate, dispatch])

  return (
    <>
      <Background>
        <div className="w-full max-w-md p-8 rounded shadow-lg ml-14">
          <h1 className="heading">{Strings.signIn}</h1>
          <p className="text-white mb-5">{Strings.adminLogin}</p>
          <form onSubmit={handleSubmit(handleSignIn)}>
            <InputField
              type="email"
              placeholder="Email"
              register={register('email', {
                required: 'This field is required',
                pattern: { value: /^\S+@\S+$/i, message: 'Please enter a valid email address' },
              })}
              error={errors.email}
            />
            <InputField
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              register={register('password', { required: 'This field is required' })}
              error={errors.password}
              showPasswordToggle
              togglePasswordVisibility={togglePasswordVisibility}
              showPassword={showPassword}
            />
            
            {!errors.password && isInvalidError && <p className="text-red-600">{isInvalidError}</p>}

            <div className="flex justify-between items-center">
              <div className="flex flex-col items-end mr-auto">
                <button type="submit" disabled={isSubmitting} className="btn-primary">
                  {isSubmitting ? 'Signing In' : 'Sign In'}
                </button>
                <Link to={PATH_SIGNUP}>
                  <p className="text-sm text-white pb-8 hover:underline">{Strings.createAccount}</p>
                </Link>
              </div>
              <button onClick={toggleModal} className=" text-sm text-white pb-8 hover:underline self-start">
                {Strings.forgotPassword}
              </button>
            </div>
          </form>
        </div>
        {isAuthenticated && console.log('Sign In')}
        {type !== '' && <ForgetPassword />}
      </Background>
    </>
  )
}

export default SignIn
