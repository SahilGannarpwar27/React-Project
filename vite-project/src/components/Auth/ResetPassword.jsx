import { useState } from 'react'

import toast from 'react-hot-toast'
import { useSearchParams } from 'react-router'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'

import InputField from '../../common/InputField'
import ResetSuccessful from './ResetSuccessful'
import usePasswordToggle from '../../hooks/usePasswordToggle'
import Background from '../../common/Background'
import { resetPasswordUser } from '../../Redux/Slice/SignInSlice'
import { Strings } from '../../constants/Strings'

const ResetPassword = () => {
  const [show, setShow] = useState(false)
  const [searchParams] = useSearchParams()
  const dispatch = useDispatch()
  const uidb64 = searchParams.get('uidb64')
  const token = searchParams.get('token')
  const headers = { Authorization: `Token ${token}` }
  console.log('uidb64 == ', uidb64)
  console.log('token == ', token)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm()

  const new_password = watch('new_password')
  const formValues = watch()
  console.log(formValues)
  console.log({ uidb64: uidb64, ...formValues })

  const [showPassword, togglePasswordVisibility] = usePasswordToggle()
  const [showRePassword, toggleRePasswordVisibility] = usePasswordToggle()

  // Resets the password in redux store
  const handleResetClick = async () => {
    try {
      const response = dispatch(resetPasswordUser({ uidb64, formValues, headers })).unwrap()
      if (response) {
        console.log(response)
        toast.success('Password has been reset successfully.')
        setShow(true)
      }
    } catch (errormessage) {
      console.log(errormessage)
      toast.error(errormessage)
    }
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
              register={register('new_password', {
                required: 'This field is required',
                minLength: { value: 8, message: 'Password must be at least 8 characters long' },
                pattern: {
                  value: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/,
                  message:
                    'Make sure your password includes: an uppercase letter, a lowercase letter, a number, a special character, and no spaces.',
                },
              })}
              error={errors.new_password}
              showPasswordToggle
              togglePasswordVisibility={togglePasswordVisibility}
              showPassword={showPassword}
            />
            {/* Re-enter password */}
            <InputField
              type={showRePassword ? 'text' : 'password'}
              placeholder="Re-enter password"
              register={register('confirm_password', {
                required: 'This field is required',
                minLength: { value: 8, message: 'Password must be at least 8 characters long' },
                validate: (value) => value === new_password || 'Passwords do not match',
              })}
              error={errors.confirm_password}
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
                {!isSubmitting ? Strings.reset : 'Resetting'}
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
