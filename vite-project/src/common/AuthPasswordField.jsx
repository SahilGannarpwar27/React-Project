/* eslint-disable react/prop-types */

import usePasswordToggle from '../hooks/usePasswordToggle'
import { IconPack } from '../constants/IconPack'

const AuthPasswordField = ({ placeholder, register, error }) => {
  const [showPassword, togglePasswordVisibility] = usePasswordToggle()
  return (
    <div className="mb-3 relative">
      <input
        type={showPassword ? 'text' : 'password'}
        className="inputFieldStyle"
        placeholder={placeholder}
        {...register}
      />

      <button
        type="button"
        onClick={togglePasswordVisibility}
        className="absolute top-4 right-3 text-gray-500 hover:text-gray-700"
      >
        <img
          src={showPassword ? IconPack.hide : IconPack.show}
          alt={showPassword ? 'Hide password' : 'Show password'}
          className="w-5 h-5"
        />
      </button>
      {error && <p className="text-red-600 text-sm">{error?.message}</p>}
      {console.log('error: ', error)}
    </div>
  )
}

export default AuthPasswordField
