import { useState } from 'react'

import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router'

import { forgetPasswordUser } from '../../Redux/Slice/SignInSlice'
import { openModal } from '../../Redux/Slice/ModalSlice'
import { IconPack } from '../../constants/IconPack.js'
import { PATH_LOGIN, PATH_RESETPASSWORD } from '../../constants/RouteConstants.jsx'
import { Strings } from '../../constants/Strings.jsx'


const ForgetPassword = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [userEmailError, setUserEmailError] = useState(null)
  const { userEmail } = useSelector((state) => state.signIn)
  const { type } = useSelector((state) => state.modal)
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm()

  const formValues = watch()
  console.log(formValues)
  console.log(formValues['email'])

  const handleClick = async () => {
    try {
      const response = await dispatch(forgetPasswordUser(formValues)).unwrap()
      console.log(response)
      console.log(response?.data)
      if (response) {
        dispatch(openModal('Emailsent'))
        toast.success(response?.data?.message)
      }
    } catch (errorMessage) {
      console.log(errorMessage)
      setUserEmailError((prev) => !prev)
      toast.error(errorMessage || 'Invalid Email')
    }
  }

  //When clicked on close button
  const handleCross = (e) => {
    e.preventDefault()
    dispatch(openModal(''))
    console.log('Redux State after dispatch in CROSS:', userEmail, userEmailError)
    console.log('type in handleCross = ', type)
  }

  console.log('type = ', type)

  const handleClickSignUp = () => {
    dispatch(openModal(''))
    navigate(PATH_LOGIN, { replace: true })
  }

  return (
    <>
      <div className="fixed inset-0 bg-black opacity-50 z-50"></div>
      <div
        className={`fixed inset-0 flex ${type === 'createPassword' && 'cursor-pointer'} justify-center items-center z-50 `}
        onClick={type === 'createPassword' ? handleClickSignUp : undefined}
      >
        <div className="flex justify-center items-center fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="bg-white p-10 rounded-sm relative w-full max-w-md">
            {(type === 'ForgetPassword' || type === 'Emailsent') && (
              <img
                onClick={handleCross}
                className="cursor-pointer absolute top-3 right-4 w-5 h-5 text-gray-500 hover:text-gray-700"
                src={IconPack.cross}
                alt="close"
              />
            )}

            <div className="text-center mt-2">
              {/* ForgotPassword Section */}
              {type === 'ForgetPassword' && (
                <>
                  <img className="mx-auto mb-4" src={IconPack.forgotPassword} alt="forgotPassword" />
                  <p className="text-lg text-gray-700 mb-4">{Strings.emailLink}</p>
                  <input
                    className="block w-full p-3 mb-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="email"
                    placeholder="Enter Email"
                    {...register('email', {
                      required: 'This field is required',
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: 'Enter a valid email address with an "@" symbol, a domain name, and no spaces.',
                      },
                    })}
                  />
                  <p className="text-red-600">{errors.email?.message}</p>
                  {!errors.email && userEmailError && <p className="text-red-600">{Strings.emailNotExist}</p>}
                  {/* Send Button */}
                  <button
                    onClick={handleSubmit(handleClick)}
                    disabled={isSubmitting}
                    className="w-24 py-3 bg-custom-green text-white"
                  >
                    {!isSubmitting ? Strings.send : 'Sending'}
                  </button>
                </>
              )}
              {/* EmailSent Section */}
              {(type === 'Emailsent' || type === 'createPassword') && (
                <>
                  <div className="mb-4">
                    <img className="mx-auto mb-4 w-48" src={IconPack.sentMail} alt="Email-Sent" />
                  </div>
                  <div className="">
                    <p className="text-lg text-gray-700 mb-4">{Strings.clickEmailToReset}</p>
                    {type === 'Emailsent' && (
                      <Link to={PATH_RESETPASSWORD}>
                        <button className="w-24 py-3 bg-custom-green text-white ">{Strings.reset}</button>
                      </Link>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ForgetPassword
