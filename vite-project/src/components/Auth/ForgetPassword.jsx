import { useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'

import ModalBackground from '../../common/ModalBackground'
import EmailSentContent from '../../common/Modals/EmailSentContent'
import ForgetPasswordForm from '../../common/Modals/ForgetPasswordForm'
import { IconPack } from '../../constants/IconPack'
import { openModal } from '../../Redux/Slice/ModalSlice'
import { ModalStrings } from '../../constants/ModalStrings'
import { PATH_LOGIN } from '../../constants/RouteConstants'

const ForgetPassword = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { type } = useSelector((state) => state.modal)

  const handleClose = () => {
    dispatch(openModal(''))
  }

  const handleClickSignUp = () => {
    dispatch(openModal(''))
    navigate(PATH_LOGIN, { replace: true })
  }

  return (
    <ModalBackground type={ModalStrings.signUpEmailSent} handleFunction={handleClickSignUp}>
      {(type === ModalStrings.forgetPassword || type === ModalStrings.forgetPasswordEmailSent) && (
        <img
          onClick={handleClose}
          className="cursor-pointer absolute top-3 right-4 w-5 h-5 text-gray-500 hover:text-gray-700"
          src={IconPack.cross}
          alt="close"
        />
      )}
      <div className="text-center mt-2">
        {type === ModalStrings.forgetPassword && <ForgetPasswordForm />}
        {(type === ModalStrings.forgetPasswordEmailSent || type === ModalStrings.signUpEmailSent) && (
          <EmailSentContent type={type} />
        )}
      </div>
    </ModalBackground>
  )
}

export default ForgetPassword

