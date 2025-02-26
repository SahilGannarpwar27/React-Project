import { useState } from 'react'

import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useSearchParams } from 'react-router'

import Background from '../../common/Background'
import AuthPasswordField from '../../common/AuthPasswordField'
import ResetSuccessfulModal from '../../common/Modals/ResetSuccessfulModal'
import { Strings } from '../../constants/Strings'
import { resetPasswordUser } from '../../Redux/Slice/SignInSlice'
import { resetPasswordFields } from '../../constants/AuthInputFields'
import AuthForm2 from './AuthForm2'

const ResetPassword = () => {
  const [show, setShow] = useState(false)
  const [searchParams] = useSearchParams()
  const dispatch = useDispatch()
  const uidb64 = searchParams.get('uidb64')
  const token = searchParams.get('token')
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
          <AuthForm2 passwordFields={resetPasswordFields} submitLabel={Strings.reset} submittingLabel='Resetting' onSubmit={handleResetClick} />
        </div>
        {show && <ResetSuccessfulModal show={show} />}
      </Background>
    </>
  )
}

export default ResetPassword

          // <form>
          //   {resetPasswordFields.map((field) => (
          //     <AuthPasswordField
          //       key={field.name}
          //       placeholder={field.placeholder}
          //       register={register(field.name, field.validation)}
          //       error={errors[field.name]}
          //     />
          //   ))}

          //   {/* Reset Button */}
          //   <div className="flex justify-between">
          //     <button
          //       onClick={handleSubmit(handleResetClick)}
          //       type="submit"
          //       disabled={isSubmitting}
          //       className="btn-primary"
          //     >
          //       {!isSubmitting ? Strings.reset : 'Resetting'}
          //     </button>
          //   </div>
          // </form>