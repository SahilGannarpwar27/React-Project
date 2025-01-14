import { useForm } from 'react-hook-form'

import InputFieldSecondary from '../../../common/InputFieldSecondary'

const LessonInfo = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm()

  return (
    <div>
      <div className="flex items-start space-x-4">
        {/* <div className="w-1/2">
        <label htmlFor="Lesson-name" className="block text-sm font-medium text-gray-700">
          Lesson name
        </label>
        <input
          type="text"
          id="Lesson-name"
          className="mt-1 p-2 w-full border border-gray-300 rounded-sm bg-white"
        />
      </div> */}
        <InputFieldSecondary
          className="w-1/2"
          htmlFor="Lesson-name"
          value="Lesson name"
          type="text"
          id="Lesson-name"
          register={register('lesson-name')}
        />
        {/* <div className="w-auto">
        <label htmlFor="Duration(min)" className="block text-sm font-medium text-gray-700">
          Duration(min)
        </label>
        <input
          type="text"
          id="Duration(min)"
          className="mt-1 p-2 w-full border border-gray-300 rounded-sm bg-white"
        />
      </div> */}
        <InputFieldSecondary
          className="w-auto"
          htmlFor="Duration(min)"
          value="Duration(min)"
          type="text"
          id="Duration(min)"
          register={register('duration')}
        />
        {/* <div className="w-auto">
        <label htmlFor="Number" className="block text-sm font-medium text-gray-700">
          Number
        </label>
        <input type="text" id="Number" className="mt-1 p-2 w-full border border-gray-300 rounded-sm bg-white" />
      </div> */}
        <InputFieldSecondary
          className="w-auto"
          htmlFor="Number"
          value="Number"
          type="text"
          id="Number"
          register={register('number')}
        />
      </div>
      <div className="mt-2 flex flex-col items-stretch">
        <textarea className="w-full border border-gray-300 rounded-sm" name="" id="" rows={10} cols={40} />
        <div className="mt-4 flex justify-end">
          <button className="btn-primary bg-custom-green text-white px-4 py-2 rounded-sm">Save</button>
        </div>
      </div>
    </div>
  )
}

export default LessonInfo
