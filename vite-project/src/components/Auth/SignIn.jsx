import { useEffect, useState } from 'react'

import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'

import ForgetPassword from './ForgetPassword'
import Background from '../../common/Background'
import InputField from '../../common/InputField'
import AuthPasswordField from '../../common/AuthPasswordField'

import { Strings } from '../../constants/Strings'
import { openModal } from '../../Redux/Slice/ModalSlice'
import { signInUser } from '../../Redux/Slice/SignInSlice'
import { ModalStrings } from '../../constants/ModalStrings'
import { signInInputFields, SignInPasswordFields } from '../../constants/AuthInputFields'
import { PATH_SIGNUP, PATH_DASHBOARD } from '../../constants/RouteConstants'
import AuthForm2 from './AuthForm2'

const SignIn = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { type } = useSelector((state) => state.modal)
  const [isInvalidError, setIsInvalidError] = useState(null)
  const isAuthenticated = useSelector((state) => state?.signIn?.isAuthenticated)

  const handleSignIn = async (data) => {
    try {
      await dispatch(signInUser({ org_username: 'Amazatic', ...data })).unwrap()
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

  // Navigate to homepage if authenticated
  useEffect(() => {
    if (isAuthenticated) {
      toast.success('Signed In Successfully')
      navigate(PATH_DASHBOARD, { replace: true })
    }
    dispatch(openModal(''))
  }, [isAuthenticated, navigate, dispatch])

  return (
    <>
      <Background>
        <div className="w-full max-w-md p-8 rounded shadow-lg ml-14">
          <h1 className="text-3xl font-bold text-custom-green mb-1">{Strings.signIn}</h1>
          <p className="text-white mb-5">{Strings.adminLogin}</p>
          <AuthForm2
            inputFields={signInInputFields}
            onSubmit={handleSignIn}
            passwordFields={SignInPasswordFields}
            errorMessage={isInvalidError}
            submittingLabel="Signing In"
            submitLabel="Sign In"
          >
            <div className='flex justify-between'>
              <Link to={PATH_SIGNUP}>
                <p className="text-sm text-white hover:underline">{Strings.createAccount}</p>
              </Link>
              <button onClick={toggleModal} className="text-sm text-white hover:underline self-start">
                {Strings.forgotPassword}
              </button>
            </div>
          </AuthForm2>
        </div>
        {type !== '' && <ForgetPassword />}
      </Background>
    </>
  )
}

export default SignIn
