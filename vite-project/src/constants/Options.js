import { Strings } from './Strings'

export const signUpGenderOptions = [
  { value: '', label: 'Select Gender' },
  { value: 'CHRELgT', label: 'Male' },
  { value: 'CHEfbqz', label: 'Female' },
  { value: 'O', label: 'Other' },
]

export const signUpRoleOptions = [
  { value: '', label: 'Select Role' },
  { value: 'CHA6xgL', label: 'HR' },
  { value: 'Admin', label: 'Admin' },
]

export const courseCategoryOptions = [
  {
    value: '',
    label: '',
  },
  {
    value: 'Training',
    label: Strings.trainings,
  },
  {
    value: 'Compliance',
    label: Strings.compliance,
  },
  {
    value: 'Learning',
    label: Strings.learning,
  },
]

export const courseStatusOptions = [
  {
    value: '',
    label: '',
  },
  {
    value: 'Draft',
    label: Strings.draft,
  },
  {
    value: 'Active',
    label: Strings.active,
  },
  {
    value: 'Inactive',
    label: Strings.inactive,
  },
]
