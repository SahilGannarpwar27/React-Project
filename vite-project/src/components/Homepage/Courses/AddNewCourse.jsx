import { useForm } from 'react-hook-form'
import InputFieldSecondary from '../../../common/InputFieldSecondary'
import ModuleInfo from './ModuleInfo'
import Lessons from './Lessons'
import LessonInfo from './LessonInfo'

const AddNewCourse = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm()

  //   const title = watch('title')
  //   const status = watch('status')
  const mandatory = watch('mandatory')

  //   console.log(title)
  //   console.log(status)
  console.log(mandatory)

  return (
    <div className="pt-2">
      <div className="flex flex-1 justify-between items-center">
        <h1 className="text-xl font-bold mb-4">Add New</h1>
        <div>
          <button className="btn-secondary">Back</button>
          <button className="btn-primary bg-custom-green text-">Publish</button>
        </div>
      </div>
      {/* Course Details Section */}
      <div className="bg-white p-4">
        <div className="flex justify-between items-center mb-4">
          <span>Course details</span>
          <label className="text-gray-600">
            <input type="checkbox" className="mr-1" {...register('mandatory')} />
            Mandatory to all
          </label>
        </div>
        <form>
          <div className="flex items-start space-x-4">
            {/* <div className="w-1/3">
              <label htmlFor="Title" className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input type="text" id="Title" className="mt-1 p-2 w-full border border-gray-300 rounded-sm bg-white" />
            </div> */}
            <InputFieldSecondary
              className="w-1/3"
              htmlFor="Title"
              value="Title"
              type="text"
              id="Title"
              register={register('title')}
            />
            {/* <div className="w-1/3">
              <label htmlFor="Category" className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <select id="Category" className="mt-1 p-2 w-full border border-gray-300 rounded-sm bg-white">
                <option value=""></option>
                <option value="Training">Training</option>
                <option value="Compliance">Compliance</option>
                <option value="Learning">Learning</option>
              </select>
            </div> */}
            <InputFieldSecondary
              className="w-1/3"
              htmlFor="Category"
              value="Category"
              type="select"
              id="Category"
              register={register('category')}
            >
              <option value=""></option>
              <option value="Training">Training</option>
              <option value="Compliance">Compliance</option>
              <option value="Learning">Learning</option>
            </InputFieldSecondary>
            {/* <div className="w-1/3">
              <label htmlFor="Status" className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <select id="Status" className="mt-1 p-2 w-full border border-gray-300 rounded-sm bg-white">
                <option value=""></option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div> */}
            <InputFieldSecondary
              className="w-1/3"
              htmlFor="Status"
              value="Status"
              type="select"
              id="Status"
              register={register('status')}
            >
              <option value=""></option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </InputFieldSecondary>
          </div>
        </form>
        <div className="flex justify-end mt-4">
          <button className="btn-primary bg-custom-green">Save</button>
        </div>
      </div>

      {/* Third Div */}

      <div className="bg-white p-4 mt-2 ">
        {/* Module Info Section */}

        <ModuleInfo />
        <div className="flex flex-1 pt-4">
          {/* aside section */}
          {/* Lesson Info Section */}
          <Lessons />

          <LessonInfo />
        </div>
      </div>
    </div>
  )
}

export default AddNewCourse
