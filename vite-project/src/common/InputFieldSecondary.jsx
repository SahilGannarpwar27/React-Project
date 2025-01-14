/* eslint-disable react/prop-types */

const InputFieldSecondary = ({ className, htmlFor, value, type, id, register, children }) => {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700">
        {value}
      </label>
      {type === 'text' && (
        <input
          type={type}
          id={id}
          className="mt-1 p-2 w-full border border-gray-300 rounded-sm bg-white"
          {...register}
        />
      )}
      {type === 'select' && (
        <select id={id} className="mt-1 p-2 w-full border border-gray-300 rounded-sm bg-white" {...register}>
          {children}
        </select>
      )}
    </div>
  )
}

export default InputFieldSecondary
