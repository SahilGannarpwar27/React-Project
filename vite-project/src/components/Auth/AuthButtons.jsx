import { useDispatch } from 'react-redux'
import { changeFormType, openModal } from '../../Redux/Slice/ModalSlice'
import { ModalStrings } from '../../constants/ModalStrings'
import { PATH_SIGNUP } from '../../constants/RouteConstants'
import { useNavigate } from 'react-router'
import { Strings } from '../../constants/Strings'
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'

const AuthButtons = ({ formType }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {
    formState: { isSubmitting },
  } = useForm()

  const toggleModal = (e) => {
    e.preventDefault()
    dispatch(openModal(ModalStrings.forgetPassword))
  }

  const handleCreateAccount = () => {
    dispatch(changeFormType('signUp'))
    navigate(PATH_SIGNUP, { replace: false })
  }

  return (
    <div className="flex justify-between items-center">
      <div className="flex flex-col items-start">
        <button type="submit" disabled={isSubmitting} className="btn-primary">
          {isSubmitting
            ? formType === 'signIn'
              ? 'Signing In'
              : 'Signing Up'
            : formType === 'signIn'
              ? 'Sign In'
              : 'Sign Up'}
        </button>
        {formType === 'signIn' && (
          <p className="text-sm text-white pb-8 hover:underline cursor-pointer" onClick={handleCreateAccount}>
            {Strings.createAccount}
          </p>
        )}
      </div>
      {formType === 'signIn' && (
        <button onClick={toggleModal} className="text-sm text-white pb-8 hover:underline">
          {Strings.forgotPassword}
        </button>
      )}
    </div>
  )
}

AuthButtons.propTypes = {
  formType: PropTypes.oneOf(['signIn', 'signUp', 'resetPassword']).isRequired,
}

export default AuthButtons
