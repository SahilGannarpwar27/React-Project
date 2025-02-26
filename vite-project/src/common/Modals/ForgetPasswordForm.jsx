import { useState } from 'react'

import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'

import InputField from '../InputField'
import { Strings } from '../../constants/Strings'
import { IconPack } from '../../constants/IconPack'
import { openModal } from '../../Redux/Slice/ModalSlice'
import { ModalStrings } from '../../constants/ModalStrings'
import { ErrorMsgStrings } from '../../constants/ErrorMsgStrings'
import { forgetPasswordUser } from '../../Redux/Slice/SignInSlice'

const ForgetPasswordForm = () => {
  const dispatch = useDispatch()

  const [userEmailError, setUserEmailError] = useState(null)
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm()

  const emailData = watch()
  console.log(emailData)

  const handleClick = async () => {
    try {
      const response = await dispatch(forgetPasswordUser(emailData)).unwrap()
      console.log(response)
      console.log(response?.data)
      if (response) {
        dispatch(openModal(ModalStrings.forgetPasswordEmailSent))
        toast.success(response?.message)
      }
    } catch (errorMessage) {
      console.log(errorMessage)
      setUserEmailError((prev) => !prev)
      toast.error(errorMessage || ErrorMsgStrings.invalidEmail)
    }
  }

  return (
    <>
      <img className="mx-auto mb-4" src={IconPack.forgotPassword} alt="forgotPassword" />
      <p className="text-lg text-gray-700 mb-4">{Strings.emailLink}</p>
      <InputField
        type="Enter Email"
        placeholder="Enter Email"
        register={register('email', {
          required: 'This field is required',
          pattern: {
            value: /^\S+@\S+$/i,
            message: 'Enter a valid email address with an "@" symbol, a domain name, and no spaces.',
          },
        })}
        error={errors.email}
      />
      {!errors?.email && userEmailError && <p className="text-red-600">{Strings.emailNotExist}</p>}
      {/* Send Button */}
      <button
        onClick={handleSubmit(handleClick)}
        disabled={isSubmitting}
        className="w-24 py-3 bg-custom-green text-white"
      >
        {!isSubmitting ? Strings.send : 'Sending'}
      </button>
    </>
  )
}

export default ForgetPasswordForm
