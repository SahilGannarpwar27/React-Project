import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'

import InputFieldSecondary from '../../../common/InputFieldSecondary'
import { Strings } from '../../../constants/Strings'
import { ModalStrings } from '../../../constants/ModalStrings'
import { editModule, setShowModal } from '../../../Redux/Slice/CoursesSlice'
import ModalBackground from '../../../common/ModalBackground'

const CoursesSectionModals = () => {
  const dispatch = useDispatch()
  const showModalType = useSelector((state) => state?.courses?.showModalType)
  const { register, watch } = useForm()

  const handleCancel = () => {
    dispatch(setShowModal(''))
  }

  const module_name = watch('module-name')
  const number = watch('number')

  const handleUpdateModule = () => {
    dispatch(editModule({ module_name, number }))
    dispatch(setShowModal(''))
  }

  return (
    <>
      <ModalBackground>
        {/* update Module modal */}
        {showModalType === ModalStrings.editModule && (
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
        {showModalType === ModalStrings.filterCourses && (
          <div className=" mt-2 ">
            <div>
              <p>Mandatory</p>
              <input type="radio" id="yes" value="yes" />
              <label htmlFor="yes">Yes</label>
              <input type="radio" id="no" value="no" />
              <label htmlFor="no">No</label>
            </div>
            <div>
              <p>Category</p>
              <input type="checkbox" id="training" value="training" />
              <label htmlFor="training">Training</label>
              <input type="checkbox" id="compliance" value="compliance" />
              <label htmlFor="compliance">Compliance</label>
              <input type="checkbox" id="learning" value="learning" />
              <label htmlFor="learning">Learning</label>
            </div>
            <div>
              <p>Status</p>
              <input type="checkbox" id="active" value="active" />
              <label htmlFor="active">Active</label>
              <input type="checkbox" id="inactive" value="inactive" />
              <label htmlFor="inactive">Inactive</label>
              <input type="checkbox" id="draft" value="draft" />
              <label htmlFor="draft">Draft</label>
            </div>
            <button className="btn-secondary" onClick={handleCancel}>
              {Strings.no}
            </button>
          </div>
        )}
      </ModalBackground>
    </>
  )
}

export default CoursesSectionModals
