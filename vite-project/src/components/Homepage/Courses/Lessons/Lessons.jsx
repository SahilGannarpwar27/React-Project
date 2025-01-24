import { useSelector, useDispatch } from 'react-redux'
import { addLesson, setCurrentLesson, setShowModal, setShowTest } from '../../../../Redux/Slice/CoursesSlice'
import { IconPack } from '../../../../constants/IconPack.js'
import { Strings } from '../../../../constants/Strings'

const Lessons = () => {
  const dispatch = useDispatch()
  //const currentCourse = useSelector((state) => state.courses.currentCourse) // Get current course from Redux
  const currentModule = useSelector((state) => state.courses.currentModule) // Get current module from Redux
  const currentLesson = useSelector((state) => state.courses.currentLesson)
  const showTest = useSelector((state) => state.courses.showTest)

  const handleLessonClick = (lesson) => {
    dispatch(setCurrentLesson(lesson))
    dispatch(setShowTest(false))
  }

  const handleAddLesson = () => {
    dispatch(addLesson())
  }

  const handleDelete = (e, lesson) => {
    e.stopPropogation
    dispatch(setCurrentLesson(lesson))
    dispatch(setShowModal('deleteLesson'))
  }

  const openTest = () => {
    dispatch(setShowTest(true))
  }

  if(!currentModule){
    return (
      <aside className="w-1/4 min-w-[20%] bg-white pr-4">{Strings.addModulemsg}</aside>
    )
  }

  return (
    <aside className="w-1/4 min-w-[20%] max-w-[300px] bg-white pr-4">
      {currentModule.lessons.length === 0 ? (
        <>
          <p
            className="flex items-center justify-center mb-4 pb-2 border-dashed border-2 border-green-500 p-2 cursor-pointer"
            onClick={handleAddLesson}
          >
            <img src={IconPack.addTraining} alt="add-training" className="mr-2 w-4 h-4 flex-shrink-0" />
            <span className="truncate">{Strings.addLesson}</span>
          </p>
          <p className="bg-gray-100 mb-4 p-3 border-l-2 border-gray-400">{Strings.test}</p>
        </>
      ) : (
        <>
          <ul className="w-full">
            {currentModule.lessons.map((lesson) => (
              <li
                key={lesson.lesson_id}
                className={`mb-4 p-3 border-l-2 flex justify-between items-center cursor-pointer group hover:bg-opacity-90 ${currentLesson?.lesson_id === lesson.lesson_id && showTest === false ? 'bg-green-100 border-green-400' : 'bg-gray-100 border-gray-400'}`}
                onClick={() => handleLessonClick(lesson)}
              >
                <div className="min-w-0 flex-1 mr-2">
                  <p className="text-[10px] sm:text-xs lg:text-sm truncate transition-all">{`Lesson ${lesson.sequence}`}</p>
                  <p className="text-xs sm:text-sm lg:text-base truncate transition-all">{lesson.lesson_name}</p>
                </div>
                <img src={IconPack.trashIcon} alt="trash-icon" className="size-4 sm:w-4 sm:h-4 cursor-pointer flex-shrink- opacity-70 group-hover:opacity-100" onClick={(e) => handleDelete(e ,lesson)} />
              </li>
            ))}
          </ul>
          <p
            className="flex items-center justify-center mb-4 pb-2 border-dashed border-2 border-green-500 p-2 cursor-pointer"
            onClick={handleAddLesson}
          >
            <img src={IconPack.addTraining} alt="add-training" className="mr-2 w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
            <span className='truncate'>{Strings.addLesson}</span>
          </p>
          <p className={`mb-4 p-3 sm:p-4 border-l-2 cursor-pointer truncate  text-xs sm:text-sm lg:text-base ${showTest === true ? 'bg-green-100 border-green-400' : 'bg-gray-100 border-gray-400'}`} onClick={openTest}>{Strings.test}</p>
        </>
      )}
    </aside>
  )
}

export default Lessons
