import { useState } from 'react'

import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'

import InputFieldSecondary from '../../../common/InputFieldSecondary'
import ModuleInfo from './Module/ModuleInfo'
import Lessons from './Lessons/Lessons'
import LessonInfo from './Lessons/LessonInfo'
import { addCourse, setCurrentCourse } from '../../../Redux/Slice/CoursesSlice'
import TestInfo from './Lessons/TestInfo'
import NewModal from './Module/NewModal'

const AddNewCourse = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const showModal = useSelector((state) => state.courses.showModal);
  const [show, setShow] = useState(false)
  // const [newCourseName, setNewCourseName] = useState('')
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm()

  const course_title = watch('title')
  const is_mandatory = watch('mandatory')
  const status = watch('status')
  const category = watch('category')
  // console.log(title)
  // console.log(status)
  // console.log(mandatory)
  const handleSaveCourse = () => {
    if (course_title === '' || is_mandatory === '' || status === '') {
      console.log('Each field is required!!!!!')
    } else {
      const newCourse = {
        course_id: uuidv4(),
          course_title: course_title,
          is_mandatory: is_mandatory,
          status: status,
          category: category,
          assignee: 0,
          duration: '0 min',

      }
      dispatch(addCourse(newCourse))
      // dispatch(setCurrentCourse(newCourse))
      setShow(true)
    }
  }

  const handleBack = () => {
    navigate('/courses', { replace: false })
  }

  return (
    <div className="pt-2">
      <div className="flex flex-1 justify-between items-center">
        <h1 className="text-xl font-bold mb-4">Add New</h1>
        <div>
          <button onClick={handleBack} className="btn-secondary">
            Back
          </button>
          <button className="btn-ternary">Publish</button>
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
            <InputFieldSecondary
              className="w-1/3"
              htmlFor="Title"
              value="Title"
              type="text"
              id="Title"
              register={register('title')}
            />
            <InputFieldSecondary
              className="w-1/3"
              htmlFor="Category"
              value="Category"
              type="select"
              id="Category"
              register={register('category')}
            >
              <option value=""></option>
              <option value="Training">Trainings</option>
              <option value="Compliance">Compliance</option>
              <option value="Learning">Learning</option>
            </InputFieldSecondary>
            <InputFieldSecondary
              className="w-1/3"
              htmlFor="Status"
              value="Status"
              type="select"
              id="Status"
              register={register('status')}
            >
              <option value=""></option>
              <option value="Active">Draft</option>
              <option value="Active" disabled>
                Active
              </option>
              <option value="Inactive" disabled>
                Inactive
              </option>
            </InputFieldSecondary>
          </div>
        </form>
        <div className="flex justify-end mt-4">
          <button onClick={handleSubmit(handleSaveCourse)} className="btn-ternary">
            Save
          </button>
        </div>
      </div>

      {/* Third Div */}
      {show && (
        <div className="bg-white p-4 mt-2">
          {/* Module Info Section */}

          <ModuleInfo/>
          <div className="flex flex-1 pt-4">
            {/* aside section */}
            {/* Lesson Info Section */}
            <Lessons />

            <LessonInfo />
            {/* <TestInfo /> */}
          </div>
          <div className="flex justify-end mt-4">
            <button onClick={handleSubmit(handleSaveCourse)} className="btn-ternary">
              Save
            </button>
          </div>
        </div>
      )}

      {showModal && <NewModal />}
    </div>
  )
}

export default AddNewCourse
