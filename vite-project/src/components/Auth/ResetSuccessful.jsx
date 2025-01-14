import { useEffect, useState } from 'react';

import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'

import { openModal } from '../../Redux/Slice/ModalSlice';

const ResetSuccessful = ({ show }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [timer, setTimer] = useState(10);

  const handleSignIn = () => {
    dispatch(openModal(""))
    navigate('/login', { replace: true })
  };

  useEffect(() => {
    if (timer > 0) {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(countdown); // Cleanup timeout
    } else if (timer === 0) {
      handleSignIn();
    }
  }, [timer]);

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
                <p className='pb-2 text-custom-green'>00 : {timer}</p>
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
