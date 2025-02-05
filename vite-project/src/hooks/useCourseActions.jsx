import { useEffect, useState } from 'react'

import { useDispatch} from 'react-redux'
import { useNavigate } from 'react-router'
import { v4 as uuidv4 } from 'uuid'

import { addCourse, changeStatus, editCourse, setIsEditMode} from '../Redux/Slice/CoursesSlice'
import { useForm } from 'react-hook-form'
import { PATH_COURSES } from '../constants/RouteConstants'

const useCourseActions = ( isEditMode , currentCourse ) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [show, setShow] = useState(false)
      const { register, handleSubmit, watch, reset } = useForm({
        defaultValues: {
          title: '',
          mandatory: false,
          category: '',
          status: '',
          modules: [],
        },
      })
      
  const formValues = watch()

    // Scenario: To save or edit course
      const handleSaveCourse = () => {
        if (formValues['title'] === '' || formValues['status'] === '' || formValues['category'] === '') {
          console.log('Each field is required!!!!!')
        } else {
          const newCourse = {
            course_id: isEditMode ? currentCourse.course_id : uuidv4(),
            course_title: formValues['title'],
            is_mandatory: formValues['mandatory'],
            status: formValues['status'],
            category: formValues['category'],
            assignee: isEditMode ? currentCourse.assignee : 0,
            duration: isEditMode ? currentCourse.duration : '0 min',
            modules: isEditMode ? currentCourse.modules : [], // Preserve existing modules if in edit mode
          }
          {
            isEditMode ? dispatch(editCourse(newCourse)) : dispatch(addCourse(newCourse))
          }
          setShow(true)
        }
      }
    
      //After clicking on Publish Button
      const handlePublish = () => {
        dispatch(changeStatus())
        dispatch(setIsEditMode())
        navigate(PATH_COURSES, { replace: true })
      }
    
      // To navigate back to Course Table
      const handleBack = () => {
        if (isEditMode === true) {
          dispatch(setIsEditMode())
          navigate('/courses/course-details', { replace: true })
        } else {
          navigate(PATH_COURSES, { replace: false })
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
        }, [currentCourse, isEditMode, reset, setShow])
  return [handleBack, handlePublish, handleSaveCourse,handleSubmit, register, show]
}

export default useCourseActions
