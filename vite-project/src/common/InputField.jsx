import PropTypes from 'prop-types'

// Scenario : custom inputfield for Auth Section
const InputField = ({ type, placeholder, register, error }) => (
  <div className="mb-3 relative">
    <input type={type} className="inputFieldStyle" placeholder={placeholder} {...register} />
    {error && <p className="text-red-600 text-sm">{error?.message}</p>}
    {console.log('error: ', error)}
  </div>
)

InputField.propTypes = {
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  register: PropTypes.object.isRequired,
  error: PropTypes.shape({
    message: PropTypes.string,
  }),
}

InputField.defaultProps = {
  type: 'text',
  placeholder: '',
  error: null,
}

export default InputField
