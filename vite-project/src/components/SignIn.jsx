import { useState } from 'react'

import { useForm } from 'react-hook-form'
import { useSelector , useDispatch } from 'react-redux'

import ForgetPassword from './ForgetPassword'
import { checkCredentials } from '../Redux/Slice/SignInSlice'

let renderCount = 0

const SignIn = () => {

  renderCount++
  console.log(renderCount)

  const [showModal, setShowModal] = useState(false)
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm()

  const userState = useSelector((state) => state.signIn)
  const dispatch = useDispatch();

  // console.log(initialState)

  const toggleModal = (e) => {
    e.preventDefault()
    setShowModal((prev) => !prev)
  }

  const emailTyped = watch('email')
  const passwordTyped = watch('password')

  const handleSignIn = () => {
    dispatch(checkCredentials({emailTyped, passwordTyped}));
  }

  return (
    <>
      <div className="w-full max-w-md p-8 rounded shadow-lg ml-14">
        <h1 className="text-3xl font-bold text-custom-green mb-1">Sign In</h1>
        <p className="text-white mb-5">Admin Login: Access Your Dashboard</p>
        <form onSubmit={handleSubmit(handleSignIn)}>
          <div className="mb-6">
            <input
              type="email"
              className="mt-1 p-2 w-full border rounded-sm bg-white "
              placeholder="Email"
              {...register('email', {
                required: 'This field is required',
                pattern: { value: /^\S+@\S+$/i, message: 'Proper pattern not followed' },
              })}
            />
            <p className="text-red-600">{errors.email?.message}</p>
          </div>
          <div className="mb-4">
            <input
              type="password"
              className="mt-1 p-2 w-full border rounded-sm bg-white"
              placeholder="Password"
              {...register('password', { required: 'This field is required' })}
            />
            <p className="text-red-600">{errors.password?.message}</p>
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              disabled={isSubmitting}
              className="border border-custom-green text-white font-bold py-2 px-4 rounded-sm mt-4 cursor-pointer"
            >
              {isSubmitting ? 'Signing In' : 'Sign In'}
            </button>
            <button onClick={toggleModal} className="text-sm text-white pb-8 hover:underline">
              Forgot password?
            </button>
          </div>
        </form>
      </div>
      {userState.error && console.log("not Sign In")}
      {userState.isAuthenticated && console.log("Sign In")}
      {showModal && <ForgetPassword toggleModal={toggleModal} showModal={showModal} />}
    </>
  )
}

export default SignIn
