import { useState } from 'react'

import PropTypes from 'prop-types'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'

import InputField from '../../common/InputField'
import AuthPasswordField from '../../common/AuthPasswordField'
import AuthSelectField from '../../common/AuthSelectField'
import { Strings } from '../../constants/Strings'
import { ModalStrings } from '../../constants/ModalStrings'
import { PATH_SIGNUP } from '../../constants/RouteConstants'
import { signInUser, signUpUser } from '../../Redux/Slice/SignInSlice'
import { openModal, changeFormType } from '../../Redux/Slice/ModalSlice'
import { SignUpSelectFields } from '../../constants/AuthSelectFields'
import {
  signInInputFields,
  SignInPasswordFields,
  signUpInputFields,
  SignUpPasswordFields,
} from '../../constants/AuthInputFields'


const AuthForm = ({ formType }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isInvalidError, setIsInvalidError] = useState(null)
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm()

  const formValues = watch()

  const handleAuthSubmit = async () => {
    try {
      if (formType === 'signIn') {
        await dispatch(signInUser({ org_username: 'Amazatic', ...formValues })).unwrap()
      } else {
        await dispatch(signUpUser(formValues)).unwrap()
        dispatch(openModal('createPassword'))
      }
    } catch (error) {
      setIsInvalidError(error)
      toast.error(error) //Check here
    }
  }

  const toggleModal = (e) => {
    e.preventDefault()
    dispatch(openModal(ModalStrings.forgetPassword))
  }

  const handleCreateAccount = () => {
    dispatch(changeFormType('signUp'))
    navigate(PATH_SIGNUP, { replace: false })
  }

  return (
    <div className="w-full max-w-md p-8 rounded shadow-lg ml-14">
      <h1 className="text-3xl font-bold text-custom-green mb-1">
        {formType === 'signIn' ? Strings.signIn : Strings.signUp}
      </h1>
      {formType === 'signIn' && <p className="text-white mb-5">{Strings.adminLogin}</p>}
      <form onSubmit={handleSubmit(handleAuthSubmit)}>
        {(formType === 'signIn' ? signInInputFields : signUpInputFields).map((inputField) => (
          <InputField
            key={inputField?.placeholder}
            type={inputField?.type}
            placeholder={inputField?.placeholder}
            register={register(inputField?.name, inputField?.validation)}
            error={errors[inputField?.name]}
          />
        ))}

        {formType === 'signUp' &&
          SignUpSelectFields.map((field) => (
            <AuthSelectField
              key={field.name}
              register={register(field.name, field.validation)}
              error={errors[field.name]}
              options={field?.options || undefined}
            />
          ))}

        {(formType === 'signUp' ? SignUpPasswordFields : SignInPasswordFields).map((field) => (
          <AuthPasswordField
            key={field.name}
            placeholder={field.placeholder}
            register={register(field.name, field.validation)}
            error={errors[field.name]}
          />
        ))}

        {!errors.password && isInvalidError && <p className="text-red-600">{isInvalidError}</p>}

        <div className="flex justify-between items-center">
          <div className="flex flex-col items-start">
            <button type="submit" disabled={isSubmitting} className="btn-primary">
              {isSubmitting
                ? formType === 'signIn'
                  ? 'Signing In'
                  : 'Signing Up'
                : formType === 'signIn'
                  ? 'Sign In'
                  : 'Sign Up'}
            </button>
            {formType === 'signIn' && (
              <p className="text-sm text-white pb-8 hover:underline cursor-pointer" onClick={handleCreateAccount}>
                {Strings.createAccount}
              </p>
            )}
          </div>
          {formType === 'signIn' && (
            <button onClick={toggleModal} className="text-sm text-white pb-8 hover:underline">
              {Strings.forgotPassword}
            </button>
          )}
        </div>
        {/* <AuthButtons formType={formType}/> */}
      </form>
    </div>
  )
}

AuthForm.propTypes = {
  formType: PropTypes.oneOf(['signIn', 'signUp', 'resetPassword']).isRequired,
}

export default AuthForm
