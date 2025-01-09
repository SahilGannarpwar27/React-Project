import {useState } from 'react'

import { useForm } from 'react-hook-form'

import ResetSuccessful from './ResetSuccessful'
import { useDispatch, useSelector } from 'react-redux'
import { changePassword } from '../Redux/Slice/SignInSlice'

const ResetPassword = () => {
  const [show, setShow] = useState(false)

  const dispatch = useDispatch()

  const { userEmail } = useSelector((state) => state.signIn)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm()

  const newPassword = watch('password')

  const handleResetClick = () => {
    if (userEmail) {
      dispatch(changePassword(newPassword))
      setShow(true);
    }

    // setShow(!show)
  }

  return (
    <>
      <div className="w-full max-w-md p-8 rounded shadow-lg ml-14">
        <h1 className="text-3xl font-bold text-custom-green mb-1">Reset Password</h1>
        <p className="text-white mb-5">Reset Your Password To Regain Access</p>
        <form>
          <div className="mb-6">
            <input
              type="password"
              className="mt-1 p-2 w-full border rounded-sm bg-white "
              placeholder="Enter password"
              {...register('password', {
                required: 'This field is required',
                minLength: { value: 8, message: 'Atleast 8 characters' },
                pattern: {
                  value: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/,
                  message: 'Proper pattern not followed',
                },
              })}
            />
            {errors.password && <p className="text-red-600">{errors.password?.message}</p>}
          </div>
          <div className="mb-4">
            <input
              type="password"
              className="mt-1 p-2 w-full border rounded-sm bg-white"
              placeholder="Re-enter password"
              {...register('confirmPassword', {
                required: 'This field is required',
                minLength: { value: 8, message: 'Atleast 8 characters' },
                validate: (value) => value === newPassword || 'Passwords do not match',
              })}
            />
            {errors.confirmPassword && <p className="text-red-600">{errors.confirmPassword?.message}</p>}
          </div>
          <div className="flex justify-between">
            <button
              onClick={handleSubmit(handleResetClick)}
              type="submit"
              disabled={isSubmitting}
              className="border border-custom-green text-white font-bold py-2 px-4 rounded-sm mt-4"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
      {show && <ResetSuccessful show={show} />}
    </>
  )
}

export default ResetPassword
