import { useForm } from 'react-hook-form'
import InputFieldSecondary from '../../../../common/InputFieldSecondary'

const QuestionField = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm()

  const questionType = watch('question-type')
  console.log(questionType)

  return (
    <div className="w-full border border-gray-400 p-4 rounded-sm shadow-sm">
      <div className="mb-4 md:flex md:gap-4">
        <InputFieldSecondary
          className="w-full mb-2"
          htmlFor="Question"
          value="Question"
          type="textarea"
          id="Question"
          register={register('lesson-question')}
          rows={2}
          cols={20}
        />
        <InputFieldSecondary
          className="w-full"
          htmlFor="Type"
          value="Type"
          type="select"
          id="Type"
          register={register('question-type')}
        >
          <option value="">Select Type</option>
          <option value="Multiple-choice">Multiple choice</option>
          <option value="Single-choice">Single choice</option>
        </InputFieldSecondary>
      </div>
      <div className="mb-4">
        {questionType === 'Multiple-choice' && (
          <label className="text-gray-700 flex items-center mb-2">
            <input type="checkbox" className="mr-2" {...register('option')} />
            Option 1
          </label>
        )}
        {questionType === 'Single-choice' && (
          <form className="flex flex-col gap-2">
            <label className="text-gray-700 flex items-center">
              <input type="radio" className="mr-2" {...register('option')} />
              Option 1
            </label>
            <label className="text-gray-700 flex items-center">
              <input type="radio" className="mr-2" {...register('option')} />
              Option 2
            </label>
          </form>
        )}
      </div>
      <p className="flex items-center cursor-pointer">
        <img
          src="/Skillsync-img/add-training.svg"
          alt="add-lesson"
          className="mr-2 w-4 h-4"
        />
        <span>Add option</span>
      </p>
    </div>
  )
}

export default QuestionField
