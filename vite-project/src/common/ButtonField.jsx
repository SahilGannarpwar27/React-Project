import PropTypes from 'prop-types'

const ButtonField = ({ onClickFunction, buttonStyle, strings }) => {
  return (
    <button onClick={onClickFunction} className={buttonStyle}>
      {strings}
    </button>
  )
}
ButtonField.propTypes = {
  onClickFunction: PropTypes.func.isRequired,
  buttonStyle: PropTypes.string,
  strings: PropTypes.string.isRequired,
}

export default ButtonField
