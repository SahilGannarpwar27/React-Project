
const Lessons = () => {
  return (
    <aside className="w-1/4 min-w-[20%] bg-white pr-4">
      <ul>
        <li className="bg-gray-100 mb-4 p-3 border-l-2 border-gray-400 flex justify-between items-center">
          <div>
            <p className="text-xs">Lesson 1</p>
            <p>Lesson name 1</p>
          </div>
          <img src="/Skillsync-img/trash-icon.svg" alt="trash-icon" className="size-4" />
        </li>
        <li className="bg-gray-100 mb-4 p-3 border-l-2 border-gray-400  flex justify-between items-center">
          <div>
            {' '}
            <p className="text-xs">Lesson 2</p>
            <p>Lesson name 2</p>
          </div>
          <img src="/Skillsync-img/trash-icon.svg" alt="trash-icon" className="size-4" />
        </li>
        <li className="bg-gray-100 mb-4 p-3 border-l-2 border-gray-400  flex justify-between items-center">
          <div>
            <p className="text-xs">Lesson 3</p>
            <p>Lesson name 3</p>
          </div>
          <img src="/Skillsync-img/trash-icon.svg" alt="trash-icon" className="size-4" />
        </li>
      </ul>
      <p className="flex items-center justify-center mb-4 pb-2 border-dashed border-2 border-green-500 p-2 cursor-pointer">
        <img src="/Skillsync-img/add-training.svg" alt="add-training" className="mr-2" />
        <span>Add lesson</span>
      </p>
      <p className="bg-gray-100 mb-4 p-3 border-l-2 border-gray-400">Test</p>
    </aside>
  )
}

export default Lessons
