import { useEffect, useState } from 'react'

import { useForm } from 'react-hook-form'

import EmailSent from './EmailSent'
import { useDispatch, useSelector } from 'react-redux'
import { setUserEmail } from '../Redux/Slice/SignInSlice'

// eslint-disable-next-line react/prop-types
const ForgetPassword = ({ toggleModal, showModal }) => {
  const [send, isSend] = useState(false)
  const dispatch = useDispatch()
  const { userEmailError, userEmail } = useSelector((state) => state.signIn)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm()

  const changeUserEmail = watch('email')

  const handleClick = () => {
    dispatch(setUserEmail(changeUserEmail))
  }

  useEffect(() => {
    console.log('Redux State after dispatch:', userEmail, userEmailError)
    if (userEmail && !userEmailError) {
      isSend((prev) => !prev)
    }
  }, [userEmail, userEmailError])

  return (
    <>
      <div className={`fixed inset-0 bg-black opacity-50 z-50 ${showModal ? '' : 'hidden'}`}></div>
      <div className={`fixed inset-0 flex justify-center items-center z-50 ${showModal ? '' : 'hidden'}`}>
        <div className="flex justify-center items-center fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="bg-white p-10 rounded-sm relative w-full max-w-md">
            <img
              onClick={toggleModal}
              className="cursor-pointer absolute top-3 right-4 w-5 h-5 text-gray-500 hover:text-gray-700"
              src="/Skillsync-img/cross.svg"
              alt="close"
            />
            <div className="text-center mt-2">
              <img className="mx-auto mb-4" src="/Skillsync-img/forgotPassword.svg" alt="forgotPassword" />

              <p className="text-lg text-gray-700 mb-4">Enter your email to get your link!</p>

              <input
                className="block w-full p-3 mb-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="email"
                placeholder="Enter Email"
                {...register('email', {
                  required: 'This field is required',
                  pattern: { value: /^\S+@\S+$/i, message: 'Proper pattern not followed' },
                })}
              />
              <p className="text-red-600">{errors.email?.message}</p>
              {userEmailError && <p className="text-red-600">Email does not exist</p>}

              <button
                onClick={handleSubmit(handleClick)}
                disabled={isSubmitting}
                className="w-24 py-3 bg-custom-green text-white"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
      {send && <EmailSent handleClick={handleClick} send={send} />}
    </>
  )
}

export default ForgetPassword
