import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'

import ForgetPassword from './ForgetPassword'
import InputField from '../../common/InputField'
import Background from '../../common/Background'
import AuthSelectField from '../../common/AuthSelectField'
import AuthPasswordField from '../../common/AuthPasswordField'
import { Strings } from '../../constants/Strings'
import { openModal } from '../../Redux/Slice/ModalSlice'
import { signUpUser } from '../../Redux/Slice/SignInSlice'
import { SignUpSelectFields } from '../../constants/AuthSelectFields'
import { signUpInputFields, SignUpPasswordFields } from '../../constants/AuthInputFields'
import AuthForm2 from './AuthForm2'

const SignUp = () => {
  const dispatch = useDispatch()
  const { type } = useSelector((state) => state.modal)

  const handleSignUp = async (data) => {
    try {
      await dispatch(signUpUser(data)).unwrap()
      dispatch(openModal('createPassword'))
    } catch (errorMessage) {
      console.log(errorMessage)
      toast.error(errorMessage || errorMessage?.email)
    }
  }

  return (
    <>
      <Background>
        <div className="w-full max-w-md p-8 rounded shadow-lg ml-14">
          <h1 className="text-3xl font-bold text-custom-green mb-8 ">{Strings.signUp}</h1>
          <AuthForm2
            inputFields={signUpInputFields}
            onSubmit={handleSignUp}
            passwordFields={SignUpPasswordFields}
            selectFields={SignUpSelectFields}
            submitLabel="Sign Up"
            submittingLabel="Signing Up"
          />
        </div>
        {type !== '' && <ForgetPassword />}
      </Background>
    </>
  )
}
export default SignUp

// <form onSubmit={handleSubmit(handleSignUp)}>
//   {signUpInputFields.map((signUpInputField) => (
//     <InputField
//       key={signUpInputField?.placeholder}
//       type={signUpInputField?.type}
//       placeholder={signUpInputField.placeholder}
//       register={register(signUpInputField?.name, signUpInputField.validation)}
//       error={errors[signUpInputField.name]}
//     />
//   ))}
//   {SignUpSelectFields.map((signUpSelectField) => (
//     <AuthSelectField
//       key={signUpSelectField.name}
//       register={register(signUpSelectField?.name, signUpSelectField.validation)}
//       error={errors[signUpSelectField.name]}
//       options={signUpSelectField?.options || undefined}
//     />
//   ))}
//   {SignUpPasswordFields.map((field) => (
//     <AuthPasswordField
//       key={field.name}
//       placeholder={field.placeholder}
//       register={register(field.name, field.validation)}
//       error={errors[field.name]}
//     />
//   ))}

//   {/* Sign Up Button */}
//   <div className="flex justify-between">
//     <button type="submit" disabled={isSubmitting} className="btn-primary">
//       {isSubmitting ? 'Signing Up' : 'Sign Up'}
//     </button>
//   </div>
// </form>
