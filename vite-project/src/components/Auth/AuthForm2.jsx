/* eslint-disable react/prop-types */
import { useForm } from 'react-hook-form'
import AuthPasswordField from '../../common/AuthPasswordField'
import InputField from '../../common/InputField'
// import { PATH_SIGNUP } from '../../constants/RouteConstants'
// import { Strings } from '../../constants/Strings'
// import { Link } from 'react-router'
// import PropTypes from 'prop-types'
import AuthSelectField from '../../common/AuthSelectField'

const AuthForm2 = ({
  inputFields = [],
  onSubmit,
  passwordFields = [],
  selectFields = [],
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

// const fieldShape = PropTypes.shape({
//   name: PropTypes.string.isRequired,
//   type: PropTypes.string,
//   placeholder: PropTypes.string,
//   validation: PropTypes.object,
//   options: PropTypes.arrayOf(PropTypes.object),
// })

// AuthForm2.propTypes = {
//   inputFields: PropTypes.arrayOf(fieldShape).isRequired,
//   passwordFields: PropTypes.arrayOf(fieldShape),
//   selectFields: PropTypes.arrayOf(fieldShape),
//   errorMessage: PropTypes.string,
//   onSubmit: PropTypes.func.isRequired,
//   submitLabel: PropTypes.string.isRequired,
//   submittingLabel: PropTypes.string.isRequired,
//   children: PropTypes.node,
//   toggleModal: PropTypes.func,
// }

// AuthForm2.defaultProps = {
//   passwordFields: [],
//   selectFields: [],
//   errorMessage: null,
//   children: null,
// }

export default AuthForm2
