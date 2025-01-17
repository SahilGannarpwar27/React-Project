/* eslint-disable react/prop-types */

const InputFieldSecondary = ({ className, htmlFor, value, type, id, register, children, rows, cols }) => {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="block text-sm font-normal text-gray-500">
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
      {type === 'textarea' && (
        <textarea className="w-full border border-gray-300 rounded-sm" id={id} rows={rows} cols={cols} {...register} />
      )}
    </div>
  )
}

export default InputFieldSecondary
