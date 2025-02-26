import PropTypes from 'prop-types'

const CoursesInputField = ({ className, htmlFor, value, id, register }) => {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="block text-sm font-normal text-gray-500">
        {value}
      </label>
      <input type="text" id={id} className="mt-1 p-2 w-full border border-gray-300 rounded-sm bg-white" {...register} />
    </div>
  )
}

CoursesInputField.propTypes = {
  className: PropTypes.string,
  htmlFor: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  register: PropTypes.object.isRequired,
}

CoursesInputField.defaultProps = {
  className: '',
}



export default CoursesInputField
