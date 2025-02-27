import PropTypes from 'prop-types'
import { ModalStrings } from '../constants/ModalStrings'

const ModalBackground = ({ children, type, handleFunction }) => {
  return (
    <div
      className={`fixed inset-0 w-screen h-screen flex justify-center items-center bg-black bg-opacity-50 z-50 ${type === ModalStrings.signUpEmailSent && 'cursor-pointer'}`}
      onClick={type === ModalStrings.signUpEmailSent ? handleFunction : undefined}
    >
      <div className="bg-white p-10 rounded-sm w-full max-w-md text-center relative">{children}</div>
    </div>
  )
}

ModalBackground.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.string,
  handleFunction: PropTypes.func,
}


export default ModalBackground
