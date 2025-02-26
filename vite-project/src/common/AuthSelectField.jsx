import PropTypes from 'prop-types'

const AuthSelectField = ({ register, options, error }) => {
  return (
    <div className="mb-3 relative">
      <select className="inputFieldStyle" {...register}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="text-red-600 text-sm">{error?.message}</p>}
      {console.log('error: ', error)}
    </div>
  )
}

AuthSelectField.propTypes = {
  register: PropTypes.object.isRequired,
  options: PropTypes.arrayOf({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }),
  error: PropTypes.shape({
    message: PropTypes.string,
  }),
}

AuthSelectField.defaultProps = {
  options: [],
}
export default AuthSelectField
