import { useState } from 'react'

import toast from 'react-hot-toast'
import { Link } from 'react-router'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'

import InputField from '../../common/InputField'
import AuthPasswordField from '../../common/AuthPasswordField'
import { Strings } from '../../constants/Strings'
import { openModal } from '../../Redux/Slice/ModalSlice'
import { signInUser } from '../../Redux/Slice/SignInSlice'
import { ModalStrings } from '../../constants/ModalStrings'
import { PATH_SIGNUP } from '../../constants/RouteConstants'
import { signInInputFields } from '../../constants/AuthInputFields'

const SignInForm = () => {
  const dispatch = useDispatch()
  const [isInvalidError, setIsInvalidError] = useState(null)
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm()

  const signInCredentials = watch()
  const handleSignIn = async () => {
    try {
      await dispatch(signInUser({ org_username: 'Amazatic', ...signInCredentials })).unwrap()
    } catch (errorMessage) {
      setIsInvalidError(errorMessage)
      toast.error(errorMessage)
    }
  }
  // Handle forgot password modal
  const toggleModal = (e) => {
    e.preventDefault()
    dispatch(openModal(ModalStrings.forgetPassword))
  }

  return (
    <form onSubmit={handleSubmit(handleSignIn)}>
      {signInInputFields.map((inputField) => (
        <InputField
          key={inputField?.placeholder}
          type={inputField.type}
          placeholder={inputField.placeholder}
          register={register(inputField?.name, inputField?.validation)}
          error={errors[inputField.name]}
        />
      ))}
      <AuthPasswordField
        placeholder="Password"
        register={register('password', { required: 'This field is required' })}
        error={errors.password}
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
  )
}

export default SignInForm
