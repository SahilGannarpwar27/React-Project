import { signUpGenderOptions, signUpRoleOptions } from './Options'

export const SignUpSelectFields = [
  {
    name: 'gender',
    validation: { required: 'This field is required' },
    options: signUpGenderOptions,
  },
  {
    name: 'role',
    validation: { required: 'This field is required' },
    options: signUpRoleOptions,
  },
]
