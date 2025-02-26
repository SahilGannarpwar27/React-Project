import { signUpGenderOptions, signUpRoleOptions } from './Options'

export const SignUpSelectFields = [
  {
    type: 'select',
    name: 'gender',
    validation: { required: 'This field is required' },
    options: signUpGenderOptions,
  },
  {
    type: 'select',
    name: 'role',
    validation: { required: 'This field is required' },
    options: signUpRoleOptions,
  },
]
