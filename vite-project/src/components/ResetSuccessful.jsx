import { useNavigate } from 'react-router'

const ResetSuccessful = ({ show }) => {
  const navigate = useNavigate()

  const handleSignIn = () => {
    navigate('/', { replace: true })
  }

  return (
    <>
      <div className={`fixed inset-0 bg-black opacity-50 z-50 ${show ? '' : 'hidden'}`}></div>{' '}
      <div className={`fixed inset-0 flex justify-center items-center z-50 ${show ? '' : 'hidden'}`}>
        <div className="flex justify-center items-center fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="bg-white p-10 rounded-sm relative w-full max-w-md">
            <div className="text-center mt-2">
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
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ResetSuccessful
