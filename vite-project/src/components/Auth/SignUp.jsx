import toast from 'react-hot-toast'

import { useDispatch, useSelector } from 'react-redux'

import AuthForm from './AuthForm'
import ForgetPassword from './ForgetPassword'
import Background from '../../common/Background'
import { Strings } from '../../constants/Strings'
import { openModal } from '../../Redux/Slice/ModalSlice'
import { signUpUser } from '../../Redux/Slice/SignInSlice'
import { SignUpSelectFields } from '../../constants/AuthSelectFields'
import { signUpInputFields, SignUpPasswordFields } from '../../constants/AuthInputFields'

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
          <AuthForm
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
