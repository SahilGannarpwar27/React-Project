import { useEffect } from 'react'

import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router'

import ForgetPassword from './ForgetPassword'
import InputField from '../../common/InputField'
import usePasswordToggle from '../../hooks/usePasswordToggle'
import Background from '../../common/Background'
import { checkCredentials } from '../../Redux/Slice/SignInSlice'
import { openModal } from '../../Redux/Slice/ModalSlice'
import { setFalse } from '../../Redux/Slice/SignInSlice'
import './SignIn.css'
import { Strings } from '../../constants/Strings'

const SignIn = () => {
  const userState = useSelector((state) => state.signIn)

  const { type } = useSelector((state) => state.modal)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // Toggle password visibility
  const [showPassword, togglePasswordVisibility] = usePasswordToggle()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm()

  const emailTyped = watch('email')
  const passwordTyped = watch('password')

  // Handle sign-in
  const handleSignIn = () => {
    dispatch(checkCredentials({ emailTyped, passwordTyped }))
  }

  // Handle forgot password modal
  const toggleModal = (e) => {
    e.preventDefault()
    dispatch(setFalse())
    dispatch(openModal('ForgetPassword'))
  }

  // Navigate to homepage if authenticated
  useEffect(() => {
    if (userState?.isAuthenticated) {
      toast.success('Signed In Successfully')
      navigate('/dashboard', { replace: true })
    }
    dispatch(openModal(''))
  }, [userState.isAuthenticated, navigate])

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
            {!errors.password && userState.error && <p className="text-red-600">{Strings.invalidEmailPassword}</p>}

            <div className="flex justify-between items-center">
              {/* Sign In Button */}
              <div className="flex flex-col items-end mr-auto">
                <button type="submit" disabled={isSubmitting} className="btn-primary">
                  {isSubmitting ? 'Signing In' : 'Sign In'}
                </button>
                {/* Sign up button */}
                <Link to="/signup">
                  <p className="text-sm text-white pb-8 hover:underline">{Strings.createAccount}</p>
                </Link>
              </div>
              {/* Forget Password */}
              <button onClick={toggleModal} className=" text-sm text-white pb-8 hover:underline self-start">
                {Strings.forgotPassword}
              </button>
            </div>
          </form>
        </div>
        {/* <Toaster /> */}
        {userState.isAuthenticated && console.log('Sign In')}
        {type !== '' && <ForgetPassword />}
      </Background>
    </>
  )
}

export default SignIn
