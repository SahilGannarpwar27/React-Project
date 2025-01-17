import React from 'react'
import InputFieldSecondary from '../../../../common/InputFieldSecondary'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { editModule, setShowModal } from '../../../../Redux/Slice/CoursesSlice'

const NewModal = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm()

  const handleCancel = () => {
    dispatch(setShowModal())

  }

  const module_name = watch('module-name')
  const number = watch('number')

  const handleUpdateModule = () => {
    dispatch(editModule({module_name,number}))
    dispatch(setShowModal())

  }


  return (
    <>
      <div className={`fixed inset-0 bg-black opacity-50 z-50`}></div>
      <div className={`fixed inset-0 flex justify-center items-center z-50 `}>
        <div className="flex justify-center  items-center fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="bg-white p-5  rounded-sm relative w-full max-w-md">
            <div className=" mt-2 ">
              <div className='flex space-x-5 mb-3'>
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

              <div className='text-center'>
                <button className="btn-secondary" onClick={handleCancel}>Cancel</button>
                <button className="btn-primary bg-custom-green text-" onClick={handleUpdateModule}>Update</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default NewModal
