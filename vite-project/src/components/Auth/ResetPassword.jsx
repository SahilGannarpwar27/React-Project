import { useState } from 'react'

import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { useSearchParams } from 'react-router'

import AuthForm from './AuthForm'
import Background from '../../common/Background'
import ResetSuccessfulModal from '../../common/Modals/ResetSuccessfulModal'
import { Strings } from '../../constants/Strings'
import { resetPasswordUser } from '../../Redux/Slice/SignInSlice'
import { resetPasswordFields } from '../../constants/AuthInputFields'

const ResetPassword = () => {
  const dispatch = useDispatch()
  const [show, setShow] = useState(false)
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')
  const uidb64 = searchParams.get('uidb64')
  const headers = { Authorization: `Token ${token}` }

  const handleResetClick = async (data) => {
    try {
      const response = dispatch(resetPasswordUser({ uidb64, data, headers })).unwrap()
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
          <AuthForm
            passwordFields={resetPasswordFields}
            submitLabel={Strings.reset}
            submittingLabel="Resetting"
            onSubmit={handleResetClick}
          />
        </div>
        {show && <ResetSuccessfulModal/>}
      </Background>
    </>
  )
}

export default ResetPassword
