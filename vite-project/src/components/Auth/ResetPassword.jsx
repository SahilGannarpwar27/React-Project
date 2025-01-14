import { useState } from 'react'

import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'

import ResetSuccessful from './ResetSuccessful'
import { changePassword } from '../../Redux/Slice/SignInSlice'
import InputField from '../../common/InputField'
import usePasswordToggle from '../../hooks/usePasswordToggle'
import Background from '../../common/Background'
// import { openModal } from '../Redux/Slice/ModalSlice'

const ResetPassword = () => {
  const [show, setShow] = useState(false)

  const dispatch = useDispatch()
  // const { type } = useSelector((state) => state.modal)

  // const { userEmail } = useSelector((state) => state.signIn)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm()

  const newPassword = watch('password')

  const [showPassword, togglePasswordVisibility] = usePasswordToggle()
  const [showRePassword, toggleRePasswordVisibility] = usePasswordToggle()

  const handleResetClick = () => {
    dispatch(changePassword(newPassword))
    // dispatch(openModal('ResetSuccessfull'))
    setShow(true)

    // setShow(!show)
  }

  // useEffect(() => {
  //   dispatch(openModal('ResetSuccessfull'))
  // },[dispatch, type])

  // useEffect(() => {
  //   console.log('Modal type:', type);
  // }, [type]);

  return (
    <>
      <Background>
        <div className="w-full max-w-md p-8 rounded shadow-lg ml-14">
          <h1 className="text-3xl font-bold text-custom-green mb-1">Reset Password</h1>
          <p className="text-white mb-5">Reset Your Password To Regain Access</p>
          <form>
            {/* password */}
            <InputField
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter password"
              register={register('password', {
                required: 'This field is required',
                minLength: { value: 8, message: 'Password must be at least 8 characters long' },
                pattern: {
                  value: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/,
                  message:
                    'Make sure your password includes: an uppercase letter, a lowercase letter, a number, a special character, and no spaces.',
                },
              })}
              error={errors.password}
              showPasswordToggle
              togglePasswordVisibility={togglePasswordVisibility}
              showPassword={showPassword}
            />
            {/* <div className="mb-6 relative">
            <input
              type={showPassword ? 'text' : 'password'}
              className="mt-1 p-2 w-full border rounded-sm bg-white "
              placeholder="Enter password"
              {...register('password', {
                required: 'This field is required',
                minLength: { value: 8, message: 'Password must be at least 8 characters long' },
                pattern: {
                  value: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/,
                  message:
                    'Make sure your password includes: an uppercase letter, a lowercase letter, a number, a special character, and no spaces.',
                },
              })}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute top-4 right-3 text-gray-500 hover:text-gray-700"
            >
              <img
                src={showPassword ? '/Skillsync-img/hide.svg' : '/Skillsync-img/show.svg'}
                alt={showPassword ? 'Hide password' : 'Show password'}
                className="w-5 h-5"
              />
            </button>
            {errors.password && <p className="text-red-500">{errors.password?.message}</p>}
          </div> */}
            {/* Re-enter password */}
            <InputField
              type={showRePassword ? 'text' : 'password'}
              placeholder="Re-enter password"
              register={register('confirmPassword', {
                required: 'This field is required',
                minLength: { value: 8, message: 'Password must be at least 8 characters long' },
                validate: (value) => value === newPassword || 'Passwords do not match',
              })}
              error={errors.confirmPassword}
              showPasswordToggle
              togglePasswordVisibility={toggleRePasswordVisibility}
              showPassword={showRePassword}
            />
            {/* <div className="mb-4 relative">
            <input
              type={showRePassword ? 'text' : 'password'}
              className="mt-1 p-2 w-full border rounded-sm bg-white"
              placeholder="Re-enter password"
              {...register('confirmPassword', {
                required: 'This field is required',
                minLength: { value: 8, message: 'Password must be at least 8 characters long' },
                validate: (value) => value === newPassword || 'Passwords do not match',
              })}
            />
            <button
              type="button"
              onClick={toggleRePasswordVisibility}
              className="absolute top-4 right-3 text-gray-500 hover:text-gray-700"
            >
              <img
                src={showRePassword ? '/Skillsync-img/hide.svg' : '/Skillsync-img/show.svg'}
                alt={showRePassword ? 'Hide password' : 'Show password'}
                className="w-5 h-5"
              />
            </button>
            {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword?.message}</p>}
          </div> */}
            {/* Reset Button */}
            <div className="flex justify-between">
              <button
                onClick={handleSubmit(handleResetClick)}
                type="submit"
                disabled={isSubmitting}
                className="btn-primary"
              >
                Reset
              </button>
            </div>
          </form>
        </div>
        {show && <ResetSuccessful show={show} />}
      </Background>
    </>
  )
}

export default ResetPassword
