
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'

import InputFieldSecondary from '../../../../common/InputFieldSecondary'
import { deleteCourse, deleteLesson, deleteModule, editModule, setShowModal } from '../../../../Redux/Slice/CoursesSlice'
import { Strings } from '../../../../constants/Strings'

const NewModal = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const showModalType = useSelector((state) => state.courses.showModalType)
  const {
    register,
    watch,
  } = useForm()

  //Scenario : handleCancel will invoke when cancel button is clicked

  const handleCancel = () => {
    dispatch(setShowModal(''))
  }

  const module_name = watch('module-name')
  const number = watch('number')

  //Scenario : handleUpdateModule will invoke to provide new name and number to module

  const handleUpdateModule = () => {
    dispatch(editModule({ module_name, number }))
    dispatch(setShowModal(''))
  }

  //Scenario : handleDeleteModule will invoke to delete Module

  const handleDeleteModule = () => {
    dispatch(deleteModule())
    dispatch(setShowModal(''))
  }

  //Scenario : handleDeleteModule will invoke to delete Lesson

  const handleDeleteLesson = () => {
    dispatch(deleteLesson())
    dispatch(setShowModal(''))
  }

    const handleDeleteCourse = () => {
      dispatch(deleteCourse())
      navigate('/courses', { replace: true })
      dispatch(setShowModal(''))
    }
  

  return (
    <>
      <div className={`fixed inset-0 bg-black opacity-50 z-50`}></div>
      <div className={`fixed inset-0 flex justify-center items-center z-50 `}>
        <div className="flex justify-center  items-center fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="bg-white p-5  rounded-sm relative w-full max-w-md">
            {/* update Module modal */}
            {showModalType === 'editModule' && (
              <div className=" mt-2 ">
                <div className="flex space-x-5 mb-3">
                  <InputFieldSecondary
                    className="w-[90%]"
                    htmlFor="Module-name"
                    value="Module name"
                    type="text"
                    id="Module-name"
                    register={register('module-name')}
                  />
                  <InputFieldSecondary
                    className="w-auto"
                    htmlFor="Number"
                    value="Number"
                    type="text"
                    id="Number"
                    register={register('number')}
                  />
                </div>

                <div className="text-center">
                  <button className="btn-secondary" onClick={handleCancel}>
                    {Strings.cancel}
                  </button>
                  <button className="btn-primary bg-custom-green text-" onClick={handleUpdateModule}>
                    {Strings.update}
                  </button>
                </div>
              </div>
            )}
            {/* delete Module Modal */}
            {showModalType === 'deleteModule' && (
              <div className=" mt-2 ">
                <h1 className='text-center'>Are you sure, want to delete the Module?</h1>
                <div className="text-center">
                  <button className="btn-secondary" onClick={handleCancel}>
                    {Strings.no}
                  </button>
                  <button className="btn-primary bg-custom-green text-" onClick={handleDeleteModule}>
                    {Strings.yes}
                  </button>
                </div>
              </div>
            )}
            {/* delete Lesson Modal */}
            {showModalType === 'deleteLesson' && (
              <div className=" mt-2 ">
                <h1 className='text-center'>Are you sure, want to delete the Lesson?</h1>
                <div className="text-center">
                  <button className="btn-secondary" onClick={handleCancel}>
                    {Strings.no}
                  </button>
                  <button className="btn-primary bg-custom-green text-" onClick={handleDeleteLesson}>
                    {Strings.yes}
                  </button>
                </div>
              </div>
            )}
            {/* delete Course Modal */}
            {showModalType === 'deleteCourse' && (
              <div className=" mt-2 ">
                <h1 className='text-center'>Are you sure, want to delete the Course?</h1>
                <div className="text-center">
                  <button className="btn-secondary" onClick={handleCancel}>
                    {Strings.no}
                  </button>
                  <button className="btn-primary bg-custom-green text-" onClick={handleDeleteCourse}>
                    {Strings.yes}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default NewModal
