/* eslint-disable react/prop-types */
import { IconPack } from "../constants/IconPack.js";

// Scenario : custom inputfield for Auth Section
const InputField = ({ type, placeholder, register, error, showPasswordToggle, togglePasswordVisibility, showPassword }) => (
  <div className="mb-3 relative">
    <input
      type={type}
      className="mt-1 p-2 w-full border rounded-sm bg-white"
      placeholder={placeholder}
      {...register}
    />
    {showPasswordToggle && (
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
    )}
    {error && <p className="text-red-600">{error?.message}</p>}
  </div>
);

export default InputField;
