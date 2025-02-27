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
import { ForgetPasswordFields } from '../../constants/AuthInputFields'

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

  const handleClick = async () => {
    try {
      const response = await dispatch(forgetPasswordUser(emailData)).unwrap()
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
      {ForgetPasswordFields.map((field, index) => (
        <InputField
          key={index}
          type={field.type}
          placeholder={field.placeholder}
          register={register(field?.name, field?.validation)}
          error={errors[field.name]}
        />
      ))}
      {!errors?.email && userEmailError && <p className="text-red-600">{Strings.emailNotExist}</p>}
      <button
        className="w-24 py-3 bg-custom-green text-white"
        onClick={handleSubmit(handleClick)}
        disabled={isSubmitting}
      >
        {!isSubmitting ? Strings.send : 'Sending'}
      </button>
    </>
  )
}

export default ForgetPasswordForm
