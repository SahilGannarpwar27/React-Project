import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'

import InputField from '../../common/InputField'
import usePasswordToggle from '../../hooks/usePasswordToggle'
import Background from '../../common/Background'
import ForgetPassword from './ForgetPassword'
import { signUpUser } from '../../Redux/Slice/SignInSlice'
import { Strings } from '../../constants/Strings'
import { openModal } from '../../Redux/Slice/ModalSlice'

const SignUp = () => {
  const dispatch = useDispatch()
  const { type } = useSelector((state) => state.modal)
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm()

  const formValues = watch()
  console.log(formValues)

  const [showPassword, togglePasswordVisibility] = usePasswordToggle()
  const handleSignUp = async () => {
    try {
      await dispatch(signUpUser(formValues)).unwrap()
      dispatch(openModal('createPassword'))
    } catch (errorMessage) {
      console.log(errorMessage)
      toast.error(errorMessage || errorMessage?.email)
    }
  }
  return (
    <>
      <Background>
        <div className="w-full max-w-md p-8 rounded shadow-lg ml-14">
          <h1 className="text-3xl font-bold text-custom-green mb-8 ">{Strings.signUp}</h1>
          <form onSubmit={handleSubmit(handleSignUp)}>
            <InputField
              type="text"
              placeholder="First Name"
              register={register('first_name', {
                required: 'This field is required',
                maxLength: { value: 20, message: 'First cannot exceed 20 characters' },
              })}
              error={errors.first_name}
            />
            <InputField
              type="text"
              placeholder="Last Name"
              register={register('last_name', {
                required: 'This field is required',
                maxLength: { value: 20, message: 'First cannot exceed 20 characters' },
              })}
              error={errors.last_name}
            />
            <InputField
              type="email"
              placeholder="Email"
              register={register('email', {
                required: 'This field is required',
                pattern: { value: /^\S+@\S+$/i, message: 'Please enter a valid email address' },
              })}
              error={errors.email}
            />
            <InputField
              type="text"
              placeholder="Phone Number"
              register={register('phone_number', {
                required: 'This field is required',
                pattern: {
                  value: /^[789]\d{9}$/,
                  message: 'Invalid mobile number (must start with 7, 8, or 9 and be 10 digits long)',
                },
              })}
              error={errors.phone_number}
            />
            <InputField
              type="select"
              register={register('gender', {
                required: 'This field is required',
              })}
              error={errors.gender}
            >
              <option value="" disabled>
                Select Gender
              </option>
              <option value="CHRELgT">Male</option>
              <option value="CHEfbqz">Female</option>
              <option value="O">Other</option>
            </InputField>
            <InputField
              type="select"
              register={register('role', {
                required: 'This field is required',
              })}
              error={errors.role}
            >
              <option value="" >
                Select Role
              </option>
              <option value="CHA6xgL">HR</option>
              <option value="Admin">Admin</option>
            </InputField>
            {/* Password Input */}
            <InputField
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              register={register('password', {
                required: 'This field is required',
                minLength: { value: 8, message: 'Password must be at least 8 characters long' },
                pattern: {
                  value: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/,
                  message:
                    'Password must include an uppercase, a lowercase, a number, a special character, and no spaces.',
                },
              })}
              error={errors.password}
              showPasswordToggle
              togglePasswordVisibility={togglePasswordVisibility}
              showPassword={showPassword}
            />
            {/* Sign Up Button */}
            <div className="flex justify-between">
              <button type="submit" disabled={isSubmitting} className="btn-primary">
                {isSubmitting ? 'Signing Up' : 'Sign Up'}
              </button>
            </div>
          </form>
        </div>
        {type !== '' && <ForgetPassword />}
      </Background>
    </>
  )
}
export default SignUp
