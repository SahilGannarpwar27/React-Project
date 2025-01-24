import { useEffect } from 'react'

import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'

import InputFieldSecondary from '../../../../common/InputFieldSecondary'
import { editLesson } from '../../../../Redux/Slice/CoursesSlice'
import { Strings } from '../../../../constants/Strings'

const LessonInfo2 = () => {
  const dispatch = useDispatch()
  // const currentModule = useSelector((state) => state.courses.currentModule)
  const currentLesson = useSelector((state) => state.courses.currentLesson)
  const showTest = useSelector((state) => state.courses.showTest)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      lessonName: currentLesson.lesson_name,
      duration: currentLesson.Duration,
      number: currentLesson.sequence,
      lessonDescription: currentLesson.content,
    },
  })



  const handleSave = (data) => {
    dispatch(editLesson({
      lessonName: data.lessonName,
      duration: data.duration,
      number: data.number,
      lessonDescription: data.lessonDescription
    }))
  }


//   const handleSave = () => {
//     dispatch(editLesson({ lessonName : lessonName, duration :duration , number : number, lessonDescription : lessonDescription }))

//   }

  //Scenario :  Watch all form fields
  // const formValues = watch()

  //Scenario : Update lesson data whenever form values change

  // useEffect(() => {
  //   if (formValues && currentLesson) {
  //     const { lessonName, duration, number, lessonDescription } = formValues
      
  //     // Only dispatch if values have actually changed
  //     if (
  //       lessonName !== currentLesson.lesson_name ||
  //       duration !== currentLesson.Duration ||
  //       number !== currentLesson.sequence ||
  //       lessonDescription !== currentLesson.content
  //     ) {
  //       dispatch(editLesson({
  //         lessonName: lessonName || currentLesson.lesson_name,
  //         duration: duration || currentLesson.Duration,
  //         number: number || currentLesson.sequence,
  //         lessonDescription: lessonDescription || currentLesson.content
  //       }))
  //     }
  //   }
  // }, [formValues, currentLesson, dispatch])

  useEffect(() => {
    if (currentLesson) {
      reset({
        lessonName: currentLesson.lesson_name,
        duration: currentLesson.Duration,
        number: currentLesson.sequence,
        lessonDescription: currentLesson.content
      })
    }
  }, [currentLesson, reset])



  return (
    <>
      {!showTest && (
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
              className="w-full border border-gray-300 rounded-sm"
              name=""
              id=""
              rows={10}
              cols={40}
              {...register('lessonDescription')}
            />
            <div className="mt-4 flex justify-end">
              <button className="btn-primary bg-custom-green text-white px-4 py-2 rounded-sm" onClick={handleSubmit(handleSave)}>{Strings.save}</button>
            </div>
          </div>
        </form>
      )}
    </>
  )
}

export default LessonInfo2
