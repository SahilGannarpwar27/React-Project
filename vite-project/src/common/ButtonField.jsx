import PropTypes from 'prop-types' //A library/object for type-checking props

const ButtonField = ({ onClickFunction, buttonStyle, strings }) => {
  return (
    <button onClick={onClickFunction} className={buttonStyle}>
      {strings}
    </button>
  )
}
//propTypes is the property of a React component for defining prop types
ButtonField.propTypes = {
  onClickFunction: PropTypes.func.isRequired,
  buttonStyle: PropTypes.string,
  strings: PropTypes.string.isRequired,
}

export default ButtonField
