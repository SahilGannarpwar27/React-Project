import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'

import ModalBackground from '../../../common/ModalBackground'
import InputFieldSecondary from '../../../common/InputFieldSecondary'
import { Strings } from '../../../constants/Strings'
import { editModule } from '../../../Redux/Slice/CoursesSlice'

const fieldData = [
  {
    className: 'w-[90%]',
    htmlFor: 'Module-name',
    value: 'Module name',
    type: 'text',
    id: 'Module-name',
    name: 'module-name',
  },
  {
    className: 'w-auto',
    htmlFor: 'Number',
    value: 'Number',
    type: 'text',
    id: 'Number',
    name: 'number',
  },
]

const EditModuleModal = ({ setEditModal }) => {
  const dispatch = useDispatch()
  const { register, watch } = useForm()

  const handleCancel = () => {
    setEditModal(false)
  }

  const module_name = watch('module-name')
  const number = watch('number')

  const handleUpdateModule = () => {
    dispatch(editModule({ module_name, number }))
    setEditModal(false)
  }

  return (
    <>
      <ModalBackground>
        <div className=" mt-2 ">
          <div className="flex space-x-5 mb-3">
            {fieldData.map((field, index) => (
              <InputFieldSecondary
                key={index}
                className={field.className}
                htmlFor={field.htmlFor}
                value={field.value}
                type={field.type}
                id={field.id}
                register={register(field.name)}
              />
            ))}
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
      </ModalBackground>
    </>
  )
}

EditModuleModal.propTypes = {
  setEditModal: PropTypes.func.isRequired,
}

export default EditModuleModal
