import PropTypes from 'prop-types'

const CourseSelectField = ({ className, htmlFor, value, id, register, options }) => {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="block text-sm font-normal text-gray-500">
        {value}
      </label>
      <select id={id} className="mt-1 p-2 w-full border border-gray-300 rounded-sm bg-white" {...register}>
        {options.map((option) => (
          <option key={option.value} value={option.value} disabled={option.disabled}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}

CourseSelectField.propTypes = {
  className: PropTypes.string,
  htmlFor: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  register: PropTypes.object.isRequired,
  options: PropTypes.arrayOf({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
  }),
}

export default CourseSelectField
