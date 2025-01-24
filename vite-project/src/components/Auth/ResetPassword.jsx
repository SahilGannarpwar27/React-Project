import { useState } from 'react'

import { useForm } from 'react-hook-form'
import { useDispatch} from 'react-redux'

import ResetSuccessful from './ResetSuccessful'
import { changePassword } from '../../Redux/Slice/SignInSlice'
import InputField from '../../common/InputField'
import usePasswordToggle from '../../hooks/usePasswordToggle'
import Background from '../../common/Background'
import { Strings } from '../../constants/Strings'

const ResetPassword = () => {
  const [show, setShow] = useState(false)

  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm()

  const newPassword = watch('password')

  const [showPassword, togglePasswordVisibility] = usePasswordToggle()
  const [showRePassword, toggleRePasswordVisibility] = usePasswordToggle()


  // Resets the password in redux store
  const handleResetClick = () => {
    dispatch(changePassword(newPassword))
    setShow(true)
  }

  return (
    <>
      <Background>
        <div className="w-full max-w-md p-8 rounded shadow-lg ml-14">
          <h1 className="text-3xl font-bold text-custom-green mb-1">{Strings.resetPassword}</h1>
          <p className="text-white mb-5">{Strings.passwordRegain}</p>
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
            {/* Reset Button */}
            <div className="flex justify-between">
              <button
                onClick={handleSubmit(handleResetClick)}
                type="submit"
                disabled={isSubmitting}
                className="btn-primary"
              >
                {Strings.reset}
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
