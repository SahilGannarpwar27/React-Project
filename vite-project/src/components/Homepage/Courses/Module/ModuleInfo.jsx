import { useDispatch, useSelector } from 'react-redux'
import { addModule, setCurrentModule, setShowModal } from '../../../../Redux/Slice/CoursesSlice'
import { IconPack } from '../../../../constants/IconPack.js'
import { Strings } from '../../../../constants/Strings'

const ModuleInfo = () => {
  const currentCourse = useSelector((state) => state.courses.currentCourse)
  const currentModule = useSelector((state) => state.courses.currentModule)
  const dispatch = useDispatch()

  //Scenario : handleAddModule used to add new Module to currentCourse

  const handleAddModule = () => {
    if (currentCourse) {
      dispatch(addModule())
    }
  }

  //Scenario : handleEdit used to edit Module to currentCourse

  const handleEdit = () => {
    dispatch(setShowModal('editModule'))
  }

  //Scenario : handleDelete used to delete Module to currentCourse

  const handleDelete = () => {
    dispatch(setShowModal('deleteModule'))
  }

  //Scenario : Onclick setting the module we are using as CurrentModule

  const handleModuleClick = (module) => {
    dispatch(setCurrentModule(module))
  }
  console.log(currentCourse)

  return (
    <div className="flex space-x-8 border-b border-gray-500 h-9">
      <ul className="flex space-x-8 overflow-x-auto min-w-0 scrollbar-hide h-full">
        {currentCourse.modules.map((module) => (
          <li
            className={`flex items-center cursor-pointer ${module.module_id === currentModule.module_id && 'border-b-2 border-custom-green text-custom-green'}`}
            key={module.module_id}
            onClick={() => handleModuleClick(module)}
          >
            <span className="mr-2">{module.module_name}</span>
            <img
              src={IconPack.editModule}
              alt="edit-module"
              className="size-4 mr-2 cursor-pointer hover:bg-gray-100  hover:border border-gray-200"
              onClick={handleEdit}
            />
            <img
              src={IconPack.trashIcon}
              alt="trash-icon"
              className="size-4 cursor-pointer hover:bg-gray-100  hover:border border-gray-200"
              onClick={handleDelete}
            />
          </li>
        ))}
      </ul>
      
      {/* Add Button */}
      <p className="flex items-center pb-1 cursor-pointer" onClick={handleAddModule}>
        <img src={IconPack.addTraining} alt="add-training" className="mr-2" />
        <span>{Strings.add}</span>
      </p>
    </div>
  )
}

export default ModuleInfo
