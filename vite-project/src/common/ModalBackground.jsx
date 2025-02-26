import PropTypes from 'prop-types'
import { ModalStrings } from '../constants/ModalStrings'

const ModalBackground = ({ children, show, type, handleFunction }) => {
  return (
    <div
      className={`fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50 ${show ? '' : 'hidden'} ${type === ModalStrings.signUpEmailSent && 'cursor-pointer'}`}
      onClick={type === ModalStrings.signUpEmailSent ? handleFunction : undefined}
    >
      <div className="bg-white p-10 rounded-sm w-full max-w-md text-center relative">{children}</div>
    </div>
  )
}

ModalBackground.propTypes = {
  children: PropTypes.node.isRequired,
  show: PropTypes.bool,
  type: PropTypes.array,
  handleFunction: PropTypes.func,
}

ModalBackground.defaultProps = {
  show: true,
}

export default ModalBackground
