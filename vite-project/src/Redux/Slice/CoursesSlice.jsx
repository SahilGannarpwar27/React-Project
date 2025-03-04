import toast from 'react-hot-toast'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'
// import API from '../../api/Api'

// export const coursesList = createAsyncThunk('courses/coursesList', async () => {
//   try {
//     const response = await API.get('/course-list/')
//     console.log("response slice : ", response)
//     return response?.data?.results || []
//   } catch (error) {
//     return error
//   }
// })

const CoursesSlice = createSlice({
  name: 'courses',
  initialState: {
    courses: [],
    currentCourse: null,
    currentModule: null,
    currentLesson: null,
    currentQuestion: null,
    showModalType: '',
    showTest: false,
    isEditMode: false,
    status: 'idle',
    error: null,
    showAll: false
  },
  reducers: {
    addCourse: (state, action) => {
      const data = action.payload
      const existingData = state?.courses?.find((course) => course?.course_title === data?.course_title)
      if (existingData && !state.isEditMode) {
        toast.error('Data Already Exist')
        console.log('Data Already Exist')
      } else {
        const newCourse = {
          ...data,

          modules: [
            {
              module_id: uuidv4(),
              module_name: `Module ${data.modules?.length + 1 || 1}`,
              sequence: data.modules?.length + 1 || 1,
              type: 'chapter',
              lessons: [
                {
                  lesson_id: uuidv4(),
                  lesson_name: `Lesson ${data.lessons?.length + 1 || 1}`,
                  Duration: '50min',
                  sequence: data.lessons?.length + 1 || 1,
                  content: 'test content',
                },
              ],
              test: {
                questions: [
                  {
                    question_id: uuidv4(),
                    question_description: '',
                    type: '',
                    options: [{ name: `option ${data.modules?.test?.options?.length + 1 || 1}`, value: false }],
                    correct_option: '',
                  },
                ],
              },
            },
          ],
        }
        state.courses.push(newCourse)
        state.currentCourse = newCourse
        state.currentModule = newCourse?.modules[0]
        state.currentLesson = newCourse?.modules[0]?.lessons[0]
        state.currentQuestion = newCourse?.modules[0]?.test.questions[0]

        console.log('courses', JSON.stringify(state.courses))
        console.log('currentCourse', JSON.stringify(state.currentCourse))
        console.log('currentModule', JSON.stringify(state.currentModule))
        console.log('currentLesson', JSON.stringify(state.currentLesson))
        console.log('currentQuestion', JSON.stringify(state.currentQuestion))
      }
    },

    addModule: (state) => {
      if (state.currentCourse) {
        const targetCourse = state.courses.find((c) => c.course_id === state.currentCourse?.course_id)
        if (targetCourse) {
          const newModuleNumber = targetCourse.modules.length + 1
          const newModule = {
            module_id: uuidv4(),
            module_name: `Module ${newModuleNumber}`,
            sequence: newModuleNumber,
            type: 'chapter',
            lessons: [
              {
                lesson_id: uuidv4(),
                lesson_name: `Lesson ${targetCourse.modules?.lessons?.length + 1 || 1}`,
                Duration: '50min',
                sequence: targetCourse.lessons?.length + 1 || 1,
                content: 'test content',
              },
            ],
            test: {
              questions: [
                {
                  question_id: uuidv4(),
                  question_description: '',
                  type: '',
                  options: [{ name: `option ${targetCourse?.modules?.test?.options?.length + 1 || 1}`, value: false }],
                  correct_option: '',
                },
              ],
            },
          }
          targetCourse.modules.push(newModule)
          state.currentCourse = targetCourse
          state.currentModule = newModule
          state.currentLesson = newModule?.lessons[0]
          state.currentQuestion = newModule?.test.questions[0]
        }
      }
      console.log('After adding module')
      console.log('courses', JSON.stringify(state.courses))
      console.log('currentCourse', JSON.stringify(state.currentCourse))
      console.log('currentModule', JSON.stringify(state.currentModule))
      console.log('currentLesson', JSON.stringify(state.currentLesson))
      console.log('currentQuestion', JSON.stringify(state.currentQuestion))
    },
    addLesson: (state) => {
      if (state.currentModule && state.currentCourse) {
        const targetCourse = state.courses?.find((c) => c.course_id === state.currentCourse?.course_id)
        if (targetCourse) {
          const targetModule = targetCourse.modules?.find((m) => m.module_id === state.currentModule?.module_id)
          if (targetModule) {
            const newLesson = {
              lesson_id: uuidv4(),
              lesson_name: `Lesson ${targetModule.lessons?.length + 1 || 1}`,
              Duration: '50min',
              sequence: targetModule.lessons?.length + 1 || 1,
              content: 'test content',
            }
            // Add the new lesson
            targetModule.lessons.push(newLesson)
            state.currentCourse = targetCourse
            state.currentModule = targetModule
            state.currentLesson = newLesson
          }
        }
      }
      console.log('After adding lesson')
      console.log('courses', JSON.stringify(state.courses))
      console.log('currentCourse', JSON.stringify(state.currentCourse))
      console.log('currentModule', state.currentModule)
      console.log('currentLesson', state.currentLesson)
    },

    deleteCourse: (state) => {
      state.courses = state.courses.filter((course) => course.course_id !== state.currentCourse.course_id)
      state.currentCourse = null
    },

    deleteModule: (state) => {
      const targetCourse = state.courses?.find((c) => c.course_id === state.currentCourse?.course_id)
      if (targetCourse) {
        const targetModuleIndex = targetCourse?.modules?.findIndex(
          (m) => m.module_id === state?.currentModule?.module_id
        )
        targetCourse.modules.splice(targetModuleIndex, 1)
        state.currentCourse = targetCourse
        state.currentModule = targetCourse?.modules[0]
      }
      console.log('After deleting module')
      console.log('courses', JSON.stringify(state.courses))
      console.log('currentCourse', JSON.stringify(state.currentCourse))
      console.log('currentModule', JSON.stringify(state.currentModule))
      console.log('currentLesson', JSON.stringify(state.currentLesson))
    },
    deleteLesson: (state) => {
      const targetCourse = state.courses?.find((c) => c.course_id === state?.currentCourse?.course_id)
      if (targetCourse) {
        const targetModule = targetCourse.modules.find((m) => m.module_id === state?.currentModule?.module_id)
        if (targetModule) {
          const targetLessonIndex = targetModule.lessons.findIndex(
            (l) => l.lesson_id === state.currentLesson?.lesson_id
          )
          // Remove the lesson
          targetModule.lessons.splice(targetLessonIndex, 1)

          // Reassign sequence numbers
          targetModule.lessons = targetModule?.lessons?.map((lesson, index) => ({
            ...lesson,
            sequence: index + 1,
            lesson_name: `Lesson ${index + 1}`,
          }))
          state.currentCourse = targetCourse
          state.currentModule = targetModule
          state.currentLesson = targetModule?.lessons[0]
        }
      }
      console.log('After deleting lesson')
      console.log('courses', JSON.stringify(state.courses))
      console.log('currentCourse', JSON.stringify(state.currentCourse))
      console.log('currentModule', JSON.stringify(state.currentModule))
      console.log('currentLesson', JSON.stringify(state.currentLesson))
    },

    editCourse: (state, action) => {
      const updatedCourse = action.payload
      const courseIndex = state.courses.findIndex((course) => course.course_id === updatedCourse.course_id)

      if (courseIndex !== -1) {
        state.courses[courseIndex] = { ...state.courses[courseIndex], ...updatedCourse }
        state.currentCourse = state.courses[courseIndex]
        toast.success('Course updated successfully!')
      } else {
        toast.error('Course not found!')
      }
    },

    editModule: (state, action) => {
      const { module_name, number } = action.payload
      console.log(module_name)
      console.log(number)
      const targetCourse = state.courses?.find((c) => c.course_id === state.currentCourse?.course_id)
      if (targetCourse) {
        const targetModule = targetCourse?.modules?.find((m) => m.module_id === state?.currentModule?.module_id)
        targetModule.module_name = `${module_name} ${number}`
        targetModule.sequence = number
        state.currentCourse = targetCourse
        state.currentModule = targetModule
        toast.success('Module name edited successfully!')
      }
      console.log('After editing module')
      console.log('courses', JSON.stringify(state.courses))
      console.log('currentCourse', JSON.stringify(state.currentCourse))
      console.log('currentModule', state.currentModule)
      console.log('currentLesson', state.currentLesson)
    },
    editLesson: (state, action) => {
      const { lessonName, duration, number, lessonDescription } = action.payload
      const targetCourse = state.courses?.find((c) => c.course_id === state.currentCourse?.course_id)
      if (targetCourse) {
        const targetModule = targetCourse.modules?.find((m) => m.module_id === state.currentModule?.module_id)
        if (targetModule) {
          const targetLesson = targetModule.lessons.find((l) => l.lesson_id === state.currentLesson?.lesson_id)
          if (targetLesson) {
            if (lessonName !== undefined) targetLesson.lesson_name = lessonName
            if (duration !== undefined) targetLesson.Duration = duration
            if (number !== undefined) targetLesson.sequence = number
            if (lessonDescription !== undefined) targetLesson.content = lessonDescription

            // Reorder lessons
            targetModule.lessons.sort((a, b) => a.sequence - b.sequence)

            // Reassign sequential numbers
            targetModule.lessons.forEach((lesson, index) => {
              lesson.sequence = index + 1
            })

            state.currentCourse = targetCourse
            state.currentModule = targetModule
            state.currentLesson = targetLesson
            toast.success('Lesson edited successfully!')
          }
        }
      }
      console.log('After editing lesson')
      console.log('courses', JSON.stringify(state.courses))
      console.log('currentCourse', JSON.stringify(state.currentCourse))
      console.log('currentModule', JSON.stringify(state.currentModule))
      console.log('currentLesson', JSON.stringify(state.currentLesson))
    },
    setShowTest: (state, action) => {
      state.showTest = action.payload
      console.log(state.showTest)
    },
    setCurrentCourse: (state, action) => {
      const course = state.courses.find((c) => c.course_id === action.payload.course_id)
      state.currentCourse = course || null
      state.currentModule = course.modules[0]
      state.currentLesson = course.modules[0].lessons[0]
      state.currentQuestion = course?.modules[0]?.test.questions[0] || null
    },
    setCurrentModule: (state, action) => {
      const module = state.currentCourse?.modules.find((m) => m.module_id === action.payload.module_id)
      state.currentModule = module || null
      state.currentLesson = module.lessons[0] || null
      state.currentQuestion = module.test.questions[0]
    },

    setCurrentLesson: (state, action) => {
      const lesson = state.currentModule?.lessons.find((l) => l.lesson_id === action.payload.lesson_id)
      state.currentLesson = lesson || null
    },
    setShowModal: (state, action) => {
      const modalType = action.payload
      state.showModalType = modalType
      console.log(state.showModalType)
    },
    updateTest: (state, action) => {
      if (state.currentModule && state.currentCourse) {
        console.log('Payload before dispatch:', JSON.stringify(action.payload))

        const targetCourse = state.courses?.find((c) => c.course_id === state.currentCourse?.course_id)
        if (targetCourse) {
          const targetModule = targetCourse.modules?.find((m) => m.module_id === state.currentModule?.module_id)
          if (targetModule) {
            targetModule.test = action.payload
            state.currentModule = targetModule
            state.currentCourse = targetCourse
          }
          toast.success('Test saved')
        }
        console.log('After adding test')
        console.log('courses', JSON.stringify(state.courses))
        console.log('currentCourse', JSON.stringify(state.currentCourse))
        console.log('currentModule', JSON.stringify(state.currentModule))
        console.log('currentQuestion', state.currentQuestion)
      }
    },
    setIsEditMode: (state) => {
      state.isEditMode = !state.isEditMode
    },
    changeStatus: (state) => {
      const targetCourse = state.courses?.find((c) => c.course_id === state.currentCourse?.course_id)
      if (targetCourse) {
        targetCourse.status = 'Active'
        state.currentCourse.status = 'Active'
      }
    },
    setShowAll: (state) => {
      state.showAll = !state.showAll
    },

  },

  // extraReducers: (builder) => {
  //   builder
  //     .addCase(coursesList?.pending, (state) => {
  //       state.status = 'loading'
  //       state.error = null
  //     })
  //     .addCase(coursesList?.fulfilled, (state) => {
  //       console.log('Succeed ')
  //       state.status = 'succeeded'
  //       state.error = null
  //     })
  //     .addCase(coursesList?.rejected, (state, action) => {
  //       state.status = 'failed'
  //       state.error = action.error.message
  //       console.log(state.error)
  //     })
  // },
})

export const {
  addCourse,
  addModule,
  addLesson,

  setCurrentCourse,
  setShowModal,
  setCurrentModule,
  setCurrentLesson,

  deleteCourse,
  deleteModule,
  deleteLesson,

  editCourse,
  editModule,
  editLessonName,
  editLesson,

  updateTest,

  setIsEditMode,
  setShowTest,

  changeStatus,
  setShowAll,
} = CoursesSlice.actions

export default CoursesSlice.reducer
