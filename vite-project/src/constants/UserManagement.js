export const performanceStats = [
  { value: '92.45%', label: 'Avg. score achieved per module' },
  { value: '6hr 28min', label: 'Avg. time taken to complete the course' },
  { value: '07', label: 'Avg. number attempts per module' },
]

export const tableHeadData = [
  'Courses',
  'Score Achieved',
  'Time Taken',
  'No. of Attempts',
  'Assigned Date',
  'Completed Date',
  'Task Status',
]

export const userDataArray = [
  { label: 'Name', value: 'Peter Laningard', actionLabel: 'Active' },
  {
    label: 'Email',
    value: 'peter.leningard@gmail.com',
    actionLabel: 'update',
    onActionClick: () => console.log('Update email'),
  },
  { label: 'Username', value: 'PeterL' },
  {
    label: 'Password',
    value: '***************',
    actionLabel: 'change',
    onActionClick: () => console.log('Change password'),
  },
]

export const progressData = [
  { label: 'Completed', value: 9, color: 'bg-custom-green' },
  { label: 'Inprocess', value: 10, color: 'bg-orange-400' },
  { label: 'Overdue', value: 3, color: 'bg-rose-500' },
]
