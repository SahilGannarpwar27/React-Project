import { useEffect } from 'react'

import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router'

import { setUserEmail, setFalse } from '../../Redux/Slice/SignInSlice'
import { openModal } from '../../Redux/Slice/ModalSlice'

const ForgetPassword = () => {
  const dispatch = useDispatch()
  // const navigate = useNavigate()
  const { userEmailError, userEmail } = useSelector((state) => state.signIn)
  const { type } = useSelector((state) => state.modal)
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

  const handleCross = (e) => {
    e.preventDefault()
    dispatch(setFalse());
    dispatch(setUserEmail(''))
    dispatch(openModal(''))
    console.log('Redux State after dispatch in CROSS:', userEmail, userEmailError)
  }

  // const handleSignIn = () => {
  //   navigate('/', { replace: true })
  // }

  useEffect(() => {
    console.log('Redux State after dispatch:', userEmail, userEmailError)

    if (userEmail !== '' && userEmailError === false) {
      dispatch(openModal('Emailsent'))
    }
  }, [userEmail, userEmailError, dispatch])

  return (
    <>
      <div className={`fixed inset-0 bg-black opacity-50 z-50`}></div>
      <div className={`fixed inset-0 flex justify-center items-center z-50 `}>
        <div className="flex justify-center items-center fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="bg-white p-10 rounded-sm relative w-full max-w-md">
            {(type === 'ForgetPassword' || type === 'Emailsent') && (
              <img
                onClick={handleCross}
                className="cursor-pointer absolute top-3 right-4 w-5 h-5 text-gray-500 hover:text-gray-700"
                src="/Skillsync-img/cross.svg"
                alt="close"
              />
            )}

            <div className="text-center mt-2">
              {type === 'ForgetPassword' && (
                <>
                  <img className="mx-auto mb-4" src="/Skillsync-img/forgotPassword.svg" alt="forgotPassword" />
                  <p className="text-lg text-gray-700 mb-4">Enter your email to get your link!</p>
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
                  {!errors.email && userEmailError && <p className="text-red-600">Email does not exist</p>}
                  {/* Send Button */}
                  <button
                    onClick={handleSubmit(handleClick)}
                    disabled={isSubmitting}
                    className="w-24 py-3 bg-custom-green text-white"
                  >
                    Send
                  </button>
                </>
              )}
              {type === 'Emailsent' && (
                <>
                  <div className="mb-4">
                    <img className="mx-auto mb-4 w-48" src="/Skillsync-img/sent-mail.gif" alt="Email-Sent" />
                  </div>
                  <div className="">
                    <p className="text-lg text-gray-700 mb-4">
                      Please click on the link sent to your registered email to reset your password
                    </p>
                    <Link to="/reset-password">
                      <button className="w-24 py-3 bg-custom-green text-white ">Reset</button>
                    </Link>
                  </div>
                </>
              )}
              {/* {type === 'ResetSuccessfull' && (
                <>
                  <div className="mb-4">
                    <img className="mx-auto mb-4 w-48" src="/Skillsync-img/password.gif" alt="Password-Reset" />
                  </div>
                  <div className="">
                    <p className="text-lg text-gray-700 mb-4">Password Reset Successful</p>
                    <p>You will be redirected to the sign-in page in 10 seconds.</p>
                    <p>00 : 10</p>
                    <button onClick={handleSignIn} className="w-24 py-3 bg-custom-green text-white">
                      Sign In
                    </button>
                  </div>
                </>
              )} */}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ForgetPassword
