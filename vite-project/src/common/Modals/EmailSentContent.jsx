import { Link } from 'react-router'

import { Strings } from '../../constants/Strings'
import { IconPack } from '../../constants/IconPack'
import { ModalStrings } from '../../constants/ModalStrings'
import { PATH_RESETPASSWORD } from '../../constants/RouteConstants'
import PropTypes from 'prop-types'

const EmailSentContent = ({type}) => {
  return (
    <>
      <div className="mb-4">
        <img className="mx-auto mb-4 w-48" src={IconPack.sentMail} alt="Email-Sent" />
      </div>
      <div className="">
        <p className="text-lg text-gray-700 mb-4">{Strings.clickEmailToReset}</p>
        {type === ModalStrings.forgetPasswordEmailSent && (
          <Link to={PATH_RESETPASSWORD}>
            <button className="w-24 py-3 bg-custom-green text-white ">{Strings.reset}</button>
          </Link>
        )}
      </div>
    </>
  )
}

EmailSentContent.propTypes = {
    type : PropTypes.string
}

EmailSentContent.defaultProps = {
    type: '',
  }

export default EmailSentContent
