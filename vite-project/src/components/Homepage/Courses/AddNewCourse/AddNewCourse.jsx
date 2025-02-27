import { useSelector } from 'react-redux'

import Lessons from '../Module/Lessons/Lessons'
import CourseDetailsForm from './CourseDetailsForm'
import ModuleInfo from '../Module/ModuleInformation'
import TestInformation from '../Module/Test/TestInformation'
import useCourseActions from '../../../../hooks/useCourseActions'
import LessonInformation from '../Module/Lessons/LessonInformation'
import { Strings } from '../../../../constants/Strings'

const AddNewCourse = () => {
  const { showTest, currentCourse, isEditMode } = useSelector((state) => state?.courses)

  console.log(isEditMode)
  const [handleBack, handlePublish, handleSaveCourse, handleSubmit, register, show] = useCourseActions(
    isEditMode,
    currentCourse
  )
  return (
    <div className="pt-2">
      <div className="flex flex-1 justify-between items-center">
        <h1 className="text-xl font-bold mb-4">{Strings?.addNew}</h1>
        <div>
          <button className="btn-secondary" onClick={handleBack}>
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
          <span>{Strings?.courseDetails}</span>
          <label className="text-gray-600">
            <input type="checkbox" className="mr-1" {...register('mandatory')} />
            {Strings.mandatoryToAll}
          </label>
        </div>
        <CourseDetailsForm register={register} isEditMode={isEditMode} />
        <div className="flex justify-end mt-4">
          <button className="btn-ternary" onClick={handleSubmit(handleSaveCourse)}>
            {Strings.save}
          </button>
        </div>
      </div>
      {/* Third Div */}
      {show && (
        <div className="bg-white p-4 mt-2">
          {/* Module Info Section */}
          <ModuleInfo />
          {/* Lesson section */}
          <div className="flex flex-1 pt-4">
            <Lessons />
            {/* Lesson and Test Info Section */}
            {!showTest ? <LessonInformation /> : <TestInformation />}
          </div>
        </div>
      )}
    </div>
  )
}

export default AddNewCourse
