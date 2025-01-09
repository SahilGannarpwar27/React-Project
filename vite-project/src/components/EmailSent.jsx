import { Link } from 'react-router'

const EmailSent = ({handleClick , send}) => {
  return (
    <>
      <div className={`fixed inset-0 bg-black opacity-50 z-50 ${send ? '' : 'hidden'}`}></div>{' '}
      {/* Dark background */}
      <div className={`fixed inset-0 flex justify-center items-center z-50 ${send ? '' : 'hidden'}`}>
        <div className="flex justify-center items-center fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="bg-white p-10 rounded-sm relative w-full max-w-md">
            {/* Close Icon */}
            <img
              onClick={handleClick}
              className="cursor-pointer absolute top-2 right-2 w-6 h-6 text-gray-500 hover:text-gray-700"
              src="/Skillsync-img/cross.svg"
              alt="close"
            />

            {/* Forgot Password Content */}
            <div className="text-center mt-2">
              <div className="mb-4">
                <img className="mx-auto mb-4 w-48" src="/Skillsync-img/sent-mail.gif" alt="Email-Sent" />
              </div>
              <div className="">
                <p className="text-lg text-gray-700 mb-4">Please click on the link sent to your registered email to reset your password</p>
                <Link to='/reset-password'><button className="w-24 py-3 bg-custom-green text-white ">
                  Reset
                </button></Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default EmailSent
