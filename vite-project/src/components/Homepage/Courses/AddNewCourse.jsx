import { useEffect, useState } from 'react'

import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'

import InputFieldSecondary from '../../../common/InputFieldSecondary'
import ModuleInfo from './Module/ModuleInfo'
import Lessons from './Lessons/Lessons'
import LessonInfo from './Lessons/LessonInfo'
import TestInfo2 from './Module/Test/TestInfo2'
import NewModal from './Module/NewModal'
import { Strings } from '../../../constants/Strings'
import { addCourse, changeStatus, editCourse, setIsEditMode } from '../../../Redux/Slice/CoursesSlice'

const AddNewCourse = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {showModalType , showTest, currentCourse, isEditMode } = useSelector((state) => state.courses)
  console.log(isEditMode)
  // const showTest = useSelector((state) => state.courses.showTest)
  const [show, setShow] = useState(false)
  // const [newCourseName, setNewCourseName] = useState('')
  const { register, handleSubmit, watch, reset } = useForm({
    defaultValues: {
      title: '',
      mandatory: false,
      category: '',
      status: '',
      modules: [],
    },
  })

  const course_title = watch('title')
  const is_mandatory = watch('mandatory')
  const status = watch('status')
  const category = watch('category')

  // Scenario: To save or edit course
  const handleSaveCourse = () => {
    if (course_title === '' || status === '' || category === '') {
      console.log('Each field is required!!!!!')
    } else {
      const newCourse = {
        course_id: isEditMode ? currentCourse.course_id : uuidv4(),
        course_title: course_title,
        is_mandatory: is_mandatory,
        status: status,
        category: category,
        assignee: isEditMode ? currentCourse.assignee : 0,
        duration: isEditMode ? currentCourse.duration : '0 min',
        modules: isEditMode ? currentCourse.modules : [], // Preserve existing modules if in edit mode
      }
      if (isEditMode) {
        dispatch(editCourse(newCourse))
      } else {
        dispatch(addCourse(newCourse))
      }

      // dispatch(setCurrentCourse(newCourse))
      setShow(true)
    }
  }

  //After clicking on Publish Button
  const handlePublish = () => {
    dispatch(changeStatus())
    dispatch(setIsEditMode())
    navigate('/courses', { replace: true })
  }

  // To navigate back to Course Table
  const handleBack = () => {
    if (isEditMode === true) {
      dispatch(setIsEditMode())
      navigate('/courses/course-details', { replace: true })
    } else {
      navigate('/courses', { replace: false })
    }
  }

  useEffect(() => {
    if (isEditMode && currentCourse) {
      reset({
        title: currentCourse.course_title,
        mandatory: currentCourse.is_mandatory,
        category: currentCourse.category,
        status: currentCourse.status,
        modules: currentCourse.modules,
      })
      setShow(true)
    }
  }, [currentCourse, reset])

  return (
    <div className="pt-2">
      <div className="flex flex-1 justify-between items-center">
        <h1 className="text-xl font-bold mb-4">{Strings.addNew}</h1>
        <div>
          <button onClick={handleBack} className="btn-secondary">
            {Strings.back}
          </button>
          {isEditMode && (
            <button className="btn-ternary" onClick={handlePublish}>
              {Strings.publish}
            </button>
          )}
        </div>
      </div>
      {/* Course Details Section */}
      <div className="bg-white p-4">
        <div className="flex justify-between items-center mb-4">
          <span>Course details</span>
          <label className="text-gray-600">
            <input type="checkbox" className="mr-1" {...register('mandatory')} />
            {Strings.mandatory}
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
              <option value="Training">{Strings.trainings}</option>
              <option value="Compliance">{Strings.compliance}</option>
              <option value="Learning">{Strings.learning}</option>
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
              <option value="Draft">{Strings.draft}</option>
              <option value="Active" disabled={!isEditMode}>
                {Strings.active}
              </option>
              <option value="Inactive" disabled={!isEditMode}>
                {Strings.inactive}
              </option>
            </InputFieldSecondary>
          </div>
        </form>
        <div className="flex justify-end mt-4">
          <button onClick={handleSubmit(handleSaveCourse)} className="btn-ternary">
            {Strings.save}
          </button>
        </div>
      </div>

      {/* Third Div */}
      {show && (
        <div className="bg-white p-4 mt-2">
          {/* Module Info Section */}

          <ModuleInfo />
          <div className="flex flex-1 pt-4">
            {/* aside section */}

            <Lessons />

            {/* Lesson and Test Info Section */}

            {!showTest && <LessonInfo />}
            {showTest && <TestInfo2 />}
          </div>
        </div>
      )}

      {showModalType !== '' && <NewModal />}
    </div>
  )
}

export default AddNewCourse
