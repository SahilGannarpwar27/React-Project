import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'

import InputField from '../../common/InputField'
import AuthSelectField from '../../common/AuthSelectField'
import AuthPasswordField from '../../common/AuthPasswordField'

const AuthForm = ({
  inputFields,
  onSubmit,
  passwordFields,
  selectFields,
  errorMessage,
  children,
  submitLabel,
  submittingLabel,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm()

  const data = watch()
  return (
    <form onSubmit={handleSubmit(() => onSubmit(data))}>
      {inputFields.map((inputField, index) => (
        <InputField
          key={index}
          type={inputField.type}
          placeholder={inputField.placeholder}
          register={register(inputField?.name, inputField?.validation)}
          error={errors[inputField.name]}
        />
      ))}
      {selectFields.map((signUpSelectField) => (
        <AuthSelectField
          key={signUpSelectField.name}
          register={register(signUpSelectField?.name, signUpSelectField.validation)}
          error={errors[signUpSelectField.name]}
          options={signUpSelectField?.options || undefined}
        />
      ))}
      {passwordFields.map((field, index) => (
        <AuthPasswordField
          key={index}
          placeholder="Password"
          register={register('password', { required: 'This field is required' })}
          error={errors.password}
        />
      ))}

      {!errors.password && errorMessage && <p className="text-red-600">{errorMessage}</p>}
      <div className="flex justify-between items-center">
        <button type="submit" disabled={isSubmitting} className="btn-primary">
          {isSubmitting ? submittingLabel : submitLabel}
        </button>
      </div>
      {children}
    </form>
  )
}

AuthForm.propTypes = {
  inputFields: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      type: PropTypes.string,
      placeholder: PropTypes.string,
      validation: PropTypes.object,
    })
  ).isRequired,
  passwordFields: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      placeholder: PropTypes.string,
      validation: PropTypes.object,
    })
  ),
  selectFields: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      validation: PropTypes.object,
      options: PropTypes.arrayOf(
        PropTypes.shape({
          label: PropTypes.string.isRequired,
          value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        })
      ),
    })
  ),
  children: PropTypes.node,
  errorMessage: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  submitLabel: PropTypes.string.isRequired,
  submittingLabel: PropTypes.string.isRequired,
}

AuthForm.defaultProps = {
  inputFields : [],
  passwordFields: [],
  selectFields: [],
  errorMessage: '',
  children: null,
  submitLabel: "",
  submittingLabel: "",
}

export default AuthForm
