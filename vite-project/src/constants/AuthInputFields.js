export const signInInputFields = [
  {
    type: 'email',
    placeholder: 'Email',
    name: 'email',
    validation: {
      required: 'This field is required',
      pattern: { value: /^\S+@\S+$/i, message: 'Please enter a valid email address' },
    },
  },
]

export const ForgetPasswordFields = [
  {
    type: 'email',
    placeholder: 'Enter Email',
    name: 'email',
    validation: {
      required: 'This field is required',
      pattern: {
        value: /^\S+@\S+$/i,
        message: 'Enter a valid email address with an "@" symbol, a domain name, and no spaces.',
      },
    },
  },
]

export const SignInPasswordFields = [
  {
    placeholder: 'Password',
    name: 'password',
    validation: { required: 'This field is required' },
  },
]
export const signUpInputFields = [
  {
    type: 'text',
    placeholder: 'First Name',
    name: 'first_name',
    validation: {
      required: 'This field is required',
      maxLength: { value: 20, message: 'First name cannot exceed 20 characters' },
    },
  },
  {
    type: 'text',
    placeholder: 'Last Name',
    name: 'last_name',
    validation: {
      required: 'This field is required',
      maxLength: { value: 20, message: 'Last name cannot exceed 20 characters' },
    },
  },
  {
    type: 'email',
    placeholder: 'Email',
    name: 'email',
    validation: {
      required: 'This field is required',
      pattern: { value: /^\S+@\S+$/i, message: 'Please enter a valid email address' },
    },
  },
  {
    type: 'text',
    placeholder: 'Phone Number',
    name: 'phone_number',
    validation: {
      required: 'This field is required',
      pattern: {
        value: /^[789]\d{9}$/,
        message: 'Invalid mobile number (must start with 7, 8, or 9 and be 10 digits long)',
      },
    },
  },
]

export const SignUpPasswordFields = [
  {
    placeholder: 'Password',
    name: 'password',
    validation: {
      required: 'This field is required',
      minLength: { value: 8, message: 'Password must be at least 8 characters long' },
      pattern: {
        value: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/,
        message:
          'Make sure your password includes: an uppercase letter, a lowercase letter, a number, a special character, and no spaces.',
      },
    },
  },
]

export const resetPasswordFields = [
  {
    placeholder: 'Enter password',
    name: 'new_password',
    validation: {
      required: 'This field is required',
      minLength: { value: 8, message: 'Password must be at least 8 characters long' },
      pattern: {
        value: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/,
        message:
          'Make sure your password includes: an uppercase letter, a lowercase letter, a number, a special character, and no spaces.',
      },
    },
  },
  {
    placeholder: 'Re-enter password',
    name: 'confirm_password',
    validation: {
      required: 'This field is required',
      minLength: { value: 8, message: 'Password must be at least 8 characters long' },
      validate: (value) => value === resetPasswordFields[0] || 'Passwords do not match',
    },
  },
]
