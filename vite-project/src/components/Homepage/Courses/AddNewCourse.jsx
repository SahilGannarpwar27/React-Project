import { useSelector } from 'react-redux'

import ModuleInfo from './Module/ModuleInfo'
import Lessons from './Lessons/Lessons'
import LessonInfo from './Lessons/LessonInfo'
import TestInfo2 from './Module/Test/TestInfo2'
import NewModal from './Module/NewModal'
import CourseDetailsForm from './AddNewCourse/CourseDetailsForm'
import useCourseActions from '../../../hooks/useCourseActions'
import ButtonField from '../../../common/ButtonField'
import { Strings } from '../../../constants/Strings'

const AddNewCourse = () => {
  const { showModalType, showTest, currentCourse, isEditMode } = useSelector((state) => state.courses)

  console.log(isEditMode)
  const [handleBack, handlePublish, handleSaveCourse, handleSubmit, register, show] = useCourseActions(
    isEditMode,
    currentCourse
  )
  return (
    <div className="pt-2">
      <div className="flex flex-1 justify-between items-center">
        <h1 className="text-xl font-bold mb-4">{Strings.addNew}</h1>
        <div>
          <ButtonField onClickFunction={handleBack} buttonStyle="btn-secondary" strings={Strings.back} />
          {isEditMode && (
            <ButtonField onClickFunction={handlePublish} buttonStyle="btn-ternary" strings={Strings.publish} />
          )}
        </div>
      </div>
      {/* Course Details Section */}
      <div className="bg-white p-4">
        <div className="flex justify-between items-center mb-4">
          <span>{Strings.courseDetails}</span>
          <label className="text-gray-600">
            <input type="checkbox" className="mr-1" {...register('mandatory')} />
            {Strings.mandatoryToAll}
          </label>
        </div>
        <CourseDetailsForm register={register} isEditMode={isEditMode} />
        <div className="flex justify-end mt-4">
          <ButtonField
            onClickFunction={handleSubmit(handleSaveCourse)}
            buttonStyle="btn-ternary"
            strings={Strings.save}
          />
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
            {!showTest ? <LessonInfo /> : <TestInfo2 />}
          </div>
        </div>
      )}
      {showModalType !== '' && <NewModal />}
    </div>
  )
}

export default AddNewCourse
