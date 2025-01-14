const ModuleInfo = () => {
  return (
    <div className="flex space-x-8 border-b border-gray-500">
      <ul className="flex space-x-8 pb-2">
        <li className="flex items-center">
          <span className="mr-2">Module 1</span>
          <img src="/Skillsync-img/edit-module.svg" alt="edit-module" className="size-4" />
          <img src="/Skillsync-img/trash-icon.svg" alt="trash-icon" className="size-4" />
        </li>
        <li className="flex items-center">
          <span className="mr-2">Module 2</span>
          <img src="/Skillsync-img/edit-module.svg" alt="edit-module" className="size-4" />
          <img src="/Skillsync-img/trash-icon.svg" alt="trash-icon" className="size-4" />
        </li>
      </ul>
      <p className="flex items-center pb-1">
        <img src="/Skillsync-img/add-training.svg" alt="add-training" className="mr-2" />
        <span>Add</span>
      </p>
    </div>
  )
}

export default ModuleInfo
