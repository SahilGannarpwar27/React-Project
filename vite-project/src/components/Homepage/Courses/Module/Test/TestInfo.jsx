import { useCallback, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'

import { IconPack } from '../../../../../constants/IconPack.js'
import { Strings } from '../../../../../constants/Strings'
import InputFieldSecondary from '../../../../../common/InputFieldSecondary'
import {
  addOption,
  addQuestion,
  deleteQuestion,
  setCurrentQuestion,
  updateCorrectOption,
  updateQuestionDescription,
  updateQuestionType,
  updateTest,
} from '../../../../../Redux/Slice/CoursesSlice'

const TestInfo = () => {
  const dispatch = useDispatch()
  const showTest = useSelector((state) => state.courses.showTest)
  const currentModule = useSelector((state) => state.courses.currentModule)
  const currentTest = useSelector((state) => state.courses.currentModule.test)
  console.log('Current Test', currentTest)
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm()

  const formValues = watch()
  console.log(formValues)

  // Scenario : to change the currentQuestion

  const handleQuestionClick = (q) => {
    dispatch(setCurrentQuestion(q))
  }

  // Scenario : to add new option

  const handleAddOption = (q) => {
    handleQuestionClick(q)
    dispatch(addOption())
  }

  // Scenario : to add new question
  const handleAddQuestion = () => {
    dispatch(addQuestion())
  }

  //  Scenario : to delete question
  const handleDeleteQuestion = (q) => {
    handleQuestionClick(q)
    dispatch(deleteQuestion())
  }

  // const handleEditOption = (questionId, optionIndex, option) => {
  //   setValue(`editOption-${questionId}-${optionIndex}`, option.name)
  // }

  const handleSaveOption = useCallback((questionId, optionIndex) => {
    const newValue = formValues[`editOption-${questionId}-${optionIndex}`]
    if (newValue) {
      dispatch({
        type: 'UPDATE_OPTION',
        payload: {
          questionId,
          optionIndex,
          value: newValue,
        },
      })
    }
  },[dispatch, formValues])

  const handleTestSave = () => {
    dispatch(updateTest())
  }

  // const handleOptionEdit = (q) => {
  //   handleQuestionClick(q)
  //   dispatch()

  // }

  // Scenario : To dynamically save the data

  useEffect(() => {
    if (formValues && currentModule?.test?.questions) {
      currentModule.test.questions.forEach((q) => {
        q.options?.forEach((o, optionIndex) => {
          const editOptionKey = `editOption-${q.question_id}-${optionIndex}`
          if (formValues[editOptionKey] !== undefined && formValues[editOptionKey] !== o.name) {
            handleSaveOption(q.question_id, optionIndex)
          }
        })

        // Watch for type changes
        const newType = formValues[`type-${q.question_id}`]
        if (newType && q.type !== newType) {
          dispatch(
            updateQuestionType({
              question_id: q.question_id,
              type: newType,
            })
          )
        }

        // Watch for description changes
        const newDescription = formValues[`description-${q.question_id}`]
        if (newDescription !== undefined && q.question_description !== newDescription) {
          dispatch(
            updateQuestionDescription({
              question_id: q.question_id,
              question_description: newDescription,
            })
          )
        }

        //Watch for Current Option changes
        const currentOption = formValues[`options-${q.question_id}`]
        if (currentOption != undefined && q.correct_option !== currentOption) {
          dispatch(
            updateCorrectOption({
              question_id: q.question_id,
              current_option: currentOption,
            })
          )
        }
      })
    }
  }, [currentModule.test.questions, dispatch, formValues, handleSaveOption])

  return (
    <>
      {showTest && (
        <div>
          <div className="flex mb-3">
            <img className="w-4 h-4 mt-1 pr-1 " src={IconPack.infoIcon} alt="info-icon" />
            <p>{Strings.info}</p>
          </div>
          {/* <QuestionField /> */}
          <div className="space-y-4">
            {currentModule.test.questions.map((q, index) => (
              <div
                key={index}
                className="w-full border border-gray-400 p-4 cursor-pointer rounded-sm shadow-sm"
                onClick={() => handleQuestionClick(q)}
              >
                <div className="mb-4 md:flex md:gap-4">
                  <InputFieldSecondary
                    className="w-full mb-2"
                    htmlFor={`question-${q.question_id}`}
                    value="Question"
                    type="textarea"
                    id={`question-${q.question_id}`}
                    register={register(`questions.${q.question_id}.description`)}
                    rows={2}
                    cols={20}
                  />
                  <InputFieldSecondary
                    className="w-full"
                    htmlFor={`type-${q.question_id}`}
                    value="Type"
                    type="select"
                    id={`type-${q.question_id}`}
                    register={register(`type-${q.question_id}`)}
                  >
                    <option value="">{Strings.selectType}</option>
                    <option value="Multiple-choice">{Strings.multipleChoice}</option>
                    <option value="Single-choice">{Strings.singleChoice}</option>
                  </InputFieldSecondary>
                </div>
                <div className="mb-4">
                  {q.options?.map((o, optionIndex) => (
                    <label key={optionIndex} className="text-gray-700 flex items-center mb-2">
                      <input
                        type={q.type === 'Multiple-choice' ? 'checkbox' : 'radio'}
                        className="mr-2"
                        {...register(`options-${q.question_id}`)}
                        value={o.name}
                      />
                      {/* <span className="mr-2">{o.name}</span> */}
                      <input
                        type="text"
                        className="border border-gray-300 rounded px-2 py-1 mr-2"
                        {...register(`editOption-${q.question_id}-${optionIndex}`)}
                        defaultValue={o.name}
                        onBlur={() => handleSaveOption(q.question_id, optionIndex)}
                        onClick={(e) => e.stopPropagation()}
                      />

                      <img
                        src={IconPack.editModule}
                        alt="edit-option"
                        className="size-4 mr-2 cursor-pointer hover:bg-gray-100  hover:border border-gray-200"
                      />
                      <img
                        src={IconPack.trashIcon}
                        alt="trash-icon"
                        className="size-4 cursor-pointer hover:bg-gray-100  hover:border border-gray-200"
                      />
                    </label>
                  ))}
                </div>
                <p className="flex items-center cursor-pointer" onClick={() => handleAddOption(q)}>
                  <img src={IconPack.addTraining} alt="add-lesson" className="mr-2 w-4 h-4" />
                  <span>{Strings.addOption}</span>
                </p>
                <p
                  className="flex mt-2 border-t border-gray-200 p-2 cursor-pointer"
                  onClick={() => handleDeleteQuestion(q)}
                >
                  <img src={IconPack.trashIcon} alt="trashIcon" className="size-5 ml-auto" />
                </p>
              </div>
            ))}
          </div>
          <p className="flex items-center mt-1 cursor-pointer text-custom-green" onClick={handleAddQuestion}>
            <img src={IconPack.addTrainingGreen} alt="add-lesson" className="mr-2 w-4 h-4" />
            <span>{Strings.addQuestion}</span>
          </p>
          <div className="mt-4 flex justify-end">
            <button className="btn-primary bg-custom-green text-white px-4 py-2 rounded-sm" onClick={handleSubmit(handleTestSave)}>{Strings.save}</button>
          </div>
        </div>
      )}
    </>
  )
}

export default TestInfo
