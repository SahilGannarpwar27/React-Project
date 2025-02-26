import { useEffect } from 'react'

import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'

import InputFieldSecondary from '../../../../../common/InputFieldSecondary'
import { Strings } from '../../../../../constants/Strings'
import { editLesson } from '../../../../../Redux/Slice/CoursesSlice'

const LessonInfo = () => {
  const dispatch = useDispatch()
  const currentLesson = useSelector((state) => state.courses.currentLesson)
  const showTest = useSelector((state) => state.courses.showTest)
  const { register, handleSubmit, watch, reset } = useForm({
    defaultValues: {
      lessonName: currentLesson?.lesson_name,
      duration: currentLesson?.Duration,
      number: currentLesson?.sequence,
      lessonDescription: currentLesson?.content,
    },
  })
  const lessonName = watch('lessonName')
  const duration = watch('duration')
  const number = watch('number')
  const lessonDescription = watch('lessonDescription')
  console.log(lessonName)

  // Scenario : Saving the lesson in slice
  const handleSave = () => {
    dispatch(
      editLesson({ lessonName: lessonName, duration: duration, number: number, lessonDescription: lessonDescription })
    )
  }

  //Scenario: to prepopulate after saving
  useEffect(() => {
    if (currentLesson) {
      reset({
        lessonName: currentLesson.lesson_name || '',
        duration: currentLesson.Duration || '',
        number: currentLesson.sequence || '',
        lessonDescription: currentLesson.content || '',
      })
    }
  }, [currentLesson, reset])

  return (
    <>
      {!currentLesson ? (
        <>
          <p>Add Lesson.......</p>
        </>
      ) : (
        !showTest && (
          <form>
            <div className="flex items-start space-x-4">
              <InputFieldSecondary
                className="w-1/2"
                htmlFor="Lesson-name"
                value="Lesson name"
                type="text"
                id="Lesson-name"
                register={register('lessonName')}
              />

              <InputFieldSecondary
                className="w-auto"
                htmlFor="Duration(min)"
                value="Duration(min)"
                type="text"
                id="Duration(min)"
                register={register('duration')}
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
            <div className="mt-2 flex flex-col items-stretch">
              <textarea
                className="w-full border border-gray-300 rounded-sm p-3"
                name=""
                id=""
                rows={10}
                cols={40}
                {...register('lessonDescription')}
              />
              <div className="mt-4 flex justify-end">
                <button
                  className="btn-primary bg-custom-green text-white px-4 py-2 rounded-sm"
                  onClick={handleSubmit(handleSave)}
                >
                  {Strings.save}
                </button>
              </div>
            </div>
          </form>
        )
      )}
    </>
  )
}

export default LessonInfo
