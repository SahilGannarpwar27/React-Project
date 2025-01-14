
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'

import InputField from '../../common/InputField'
import usePasswordToggle from '../../hooks/usePasswordToggle'
import Background from '../../common/Background'
import { createUser } from '../../Redux/Slice/SignInSlice'

const SignUp = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm()

  const username = watch('username')
  const email = watch('email')
  const password = watch('password')

  const [showPassword, togglePasswordVisibility] = usePasswordToggle();
  const [showRePassword, toggleRePasswordVisibility] = usePasswordToggle();

  const handleSignUp = () => {
    dispatch(createUser({ username, email, password }))
    toast.success("Signed Up Successfully")
    navigate('/login', { replace: true })
  }

  return (
    <>
      <Background>
      <div className="w-full max-w-md p-8 rounded shadow-lg ml-14">
        <h1 className="text-3xl font-bold text-custom-green mb-8 ">Sign Up</h1>
        <form onSubmit={handleSubmit(handleSignUp)}>
          {/* Username Input */}
          <InputField 
          type="text"
          placeholder="Username"
          register = {register('username', {
            required: 'This field is required',
            maxLength: { value: 20, message: 'Username cannot exceed 20 characters' },
          })}
          error={errors.username}

          />
          {/* <div className="mb-6">
            <input
              type="text"
              className="mt-3 p-3 w-full border rounded-sm bg-white"
              placeholder="Username"
              {...register('username', {
                required: 'This field is required',
                maxLength: { value: 20, message: 'Username cannot exceed 20 characters' },
              })}
            />
            {errors.username && <p className="text-red-600 mt-1">{errors.username.message}</p>}
          </div> */}

          {/* Email Input */}
          <InputField
            type="email"
            placeholder="Email"
            register={register('email', {
              required: 'This field is required',
              pattern: { value: /^\S+@\S+$/i, message: 'Please enter a valid email address' },
            })}
            error={errors.email}
          />

          {/* Password Input */}
          <InputField 
          type={showPassword ? 'text' : 'password'}
          placeholder="Password"
          register = {register('password', {
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

          {/* <div className="mb-6 relative">
            <input
              type={showPassword ? 'text' : 'password'}
              className="mt-3 p-3 w-full border rounded-sm bg-white"
              placeholder="Password"
              {...register('password', {
                required: 'This field is required',
                minLength: { value: 8, message: 'Password must be at least 8 characters long' },
                pattern: {
                  value: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/,
                  message:
                    'Password must include an uppercase, a lowercase, a number, a special character, and no spaces.',
                },
              })}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute top-6 right-3 text-gray-500 hover:text-gray-700"
            >
              <img
                src={showPassword ? '/Skillsync-img/hide.svg' : '/Skillsync-img/show.svg'}
                alt={showPassword ? 'Hide password' : 'Show password'}
                className="w-5 h-5"
              />
            </button>
            {errors.password && <p className="text-red-600 mt-1">{errors.password.message}</p>}
          </div> */}

          {/* Re-enter Password Input */}
          <InputField
          type={showRePassword ? 'text' : 'password'}
          placeholder="Re-enter Password"
          register = {register('rePassword', {
            required: 'This field is required',
            minLength: { value: 8, message: 'At least 8 characters' },
            validate: (value) => value === password || 'Passwords do not match',
          })}
          error = {errors.rePassword}
          showPasswordToggle
          togglePasswordVisibility={toggleRePasswordVisibility}
          showPassword={showRePassword}
           />
          {/* <div className="mb-6 relative">
          <input
            type={showRePassword ? 'text' : 'password'}
            className="mt-3 p-3 w-full border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Re-enter Password"
            {...register('rePassword', {
              required: 'This field is required',
              minLength: { value: 8, message: 'At least 8 characters' },
              validate: (value) => value === password || 'Passwords do not match',
            })}
          />
          <button
            type="button"
            onClick={toggleRePasswordVisibility}
            className="absolute top-6 right-3 text-gray-500 hover:text-gray-700"
          >
            <img
              src={showRePassword ? '/Skillsync-img/hide.svg' : '/Skillsync-img/show.svg'}
              alt={showRePassword ? 'Hide password' : 'Show password'}
              className="w-5 h-5"
            />
          </button>
            {errors.rePassword && <p className="text-red-500">{errors.rePassword?.message}</p>}
          </div> */}

          {/* Sign Up Button */}
          <div className="flex justify-between">
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary"
            >
              {isSubmitting ? 'Signing Up' : 'Sign Up'}
            </button>
          </div>
        </form>
      </div>
      </Background>
    </>
  )
}

export default SignUp
