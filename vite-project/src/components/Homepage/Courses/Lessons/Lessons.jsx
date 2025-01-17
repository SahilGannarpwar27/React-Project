import { useSelector, useDispatch } from "react-redux"
import { addLesson, setCurrentLesson } from "../../../../Redux/Slice/CoursesSlice"


const Lessons = () => {
  const dispatch = useDispatch()
  //const currentCourse = useSelector((state) => state.courses.currentCourse) // Get current course from Redux
  const currentModule = useSelector((state) => state.courses.currentModule) // Get current module from Redux
  const currentLesson = useSelector((state) => state.courses.currentLesson)

  const handleLessonClick = (lesson) => {
    dispatch(setCurrentLesson(lesson))
  }

  const handleAddLesson = () => {
    dispatch(addLesson())
  }

  return (
    <aside className="w-1/4 min-w-[20%] bg-white pr-4">
      <ul>
        {currentModule.lessons.map((lesson) => (
          <li
            key={lesson.lesson_id}
            className={`mb-4 p-3 border-l-2 flex justify-between items-center cursor-pointer ${currentLesson?.lesson_id === lesson.lesson_id ? "bg-green-100 border-green-400" : "bg-gray-100 border-gray-400"}`}
            onClick={() => handleLessonClick(lesson)}
          >
            <div>
              <p className="text-xs">{`Lesson ${lesson.sequence}`}</p>
              <p>{lesson.lesson_name}</p>
            </div>
            <img src="/Skillsync-img/trash-icon.svg" alt="trash-icon" className="size-4 cursor-pointer" />
          </li>
        ))}
      </ul>
      <p className="flex items-center justify-center mb-4 pb-2 border-dashed border-2 border-green-500 p-2 cursor-pointer" onClick={handleAddLesson}>
        <img src="/Skillsync-img/add-training.svg" alt="add-training" className="mr-2" />
        <span>Add lesson</span>
      </p>
      <p className="bg-gray-100 mb-4 p-3 border-l-2 border-gray-400">Test</p>
    </aside>
  )
}

export default Lessons
