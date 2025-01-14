import { useEffect, useState } from 'react'

import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router'

import ForgetPassword from './ForgetPassword'
import InputField from '../../common/InputField'
import usePasswordToggle from '../../hooks/usePasswordToggle'
import Background from '../../common/Background';
import { checkCredentials } from '../../Redux/Slice/SignInSlice'
import { openModal } from '../../Redux/Slice/ModalSlice'
import { setFalse } from '../../Redux/Slice/SignInSlice'


const SignIn = () => {
  const userState = useSelector((state) => state.signIn)

  const { type } = useSelector((state) => state.modal)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [showPassword, togglePasswordVisibility] = usePasswordToggle();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm()

  const emailTyped = watch('email')
  const passwordTyped = watch('password')

  // Toggle password visibility


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
    if (userState.isAuthenticated) {
      toast.success('Signed In Successfully')
      navigate('/homepage', { replace: true })
    }
    dispatch(openModal(''))
  }, [userState.isAuthenticated, navigate])

  return (
    <>
      <Background>
      <div className="w-full max-w-md p-8 rounded shadow-lg ml-14">
        <h1 className="text-3xl font-bold text-custom-green mb-1">Sign In</h1>
        <p className="text-white mb-5">Admin Login: Access Your Dashboard</p>
        <form onSubmit={handleSubmit(handleSignIn)}>
          {/* <div className="mb-6">
            <input
              type="email"
              className="mt-1 p-2 w-full border rounded-sm bg-white "
              placeholder="Email"
              {...register('email', {
                required: 'This field is required',
                pattern: { value: /^\S+@\S+$/i, message: 'Please enter a valid email address' },
              })}
            />
            <p className="text-red-600">{errors.email?.message}</p>
          </div> */}
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
          {!errors.password && userState.error && <p className="text-red-600">Invalid email or password</p>}

          <div className="flex justify-between items-center">
            {/* Sign In Button */}
            <div className="flex flex-col items-end mr-auto">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary"
              >
                {isSubmitting ? 'Signing In' : 'Sign In'}
              </button>
              {/* Sign up button */}
              <Link to="/signup">
                <p className="text-sm text-white pb-8 hover:underline">Create an account</p>
              </Link>
            </div>
            {/* Forget Password */}
            <button onClick={toggleModal} className=" text-sm text-white pb-8 hover:underline self-start">
              Forgot password?
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
