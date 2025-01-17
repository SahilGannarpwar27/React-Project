
import { useForm } from 'react-hook-form'
import QuestionField from './QuestionField'

const TestInfo = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm()

  const questionType = watch('question-type')
  console.log(questionType)
  return (
    <div>
      <div className='flex mb-3' >
        <img src="/Skillsync-img/info-icon.svg" alt="info-icon" />
        <p>Create a dynamic test packed with at least 25 engaging questions!</p>
      </div>
      <QuestionField />
    </div>
  )
}

export default TestInfo

// /Skillsync-img/add-training.svg
