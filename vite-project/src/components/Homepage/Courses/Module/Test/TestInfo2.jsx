import { useDispatch, useSelector } from 'react-redux'

import InputFieldSecondary from '../../../../../common/InputFieldSecondary'
import useTestFunctionality from '../../../../../hooks/useTestFunctionality'
import { IconPack } from '../../../../../constants/IconPack.js'
import { Strings } from '../../../../../constants/Strings'
import { updateTest } from '../../../../../Redux/Slice/CoursesSlice'

const TestInfo2 = () => {
  const dispatch = useDispatch()
  const showTest = useSelector((state) => state.courses.showTest)
  const currentTest = useSelector((state) => state.courses.currentModule.test)

  //Scenario :  Used custom hooks to maintain functionalities
  const [
    handleSaveOption,
    handleDeleteOption,
    handleDeleteQuestion,
    handleAddQuestion,
    handleAddOption,
    setEditingOption,
    editingOption,
    localTest,
    register,
    // eslint-disable-next-line no-unused-vars
    formValues,
  ] = useTestFunctionality(currentTest)

  const handleSave = () => {
    console.log('While saving the test ', { ...localTest })
    dispatch(updateTest(localTest))
  }

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
            {localTest.questions.map((q, index) => (
              <div key={index} className="w-full border border-gray-400 p-4 cursor-pointer rounded-sm shadow-sm">
                <div className="mb-4 md:flex md:gap-4">
                  <InputFieldSecondary
                    className="w-full mb-2"
                    htmlFor={`question-${q.question_id}`}
                    value="Question"
                    type="textarea"
                    id={`question-${q.question_id}`}
                    register={register(`description-${q.question_id}`)}
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
                    <option className="flex items-center cursor-pointer" value="Multiple-choice">
                      {' '}
                      <img src={IconPack.greenTick} alt="greenTick" />
                      <span>{Strings.multipleChoice}</span>
                    </option>
                    <option className="flex items-center cursor-pointer" value="Single-choice">
                      {' '}
                      <img src={IconPack.singleChoice} alt="singleChoice" />
                      <span>{Strings.singleChoice}</span>
                    </option>
                  </InputFieldSecondary>
                </div>
                <div className="mb-4">
                  {/* Options Section */}
                  {q.options?.map((o, optionIndex) => (
                    <div key={optionIndex} className="flex items-center mb-2">
                      {editingOption?.questionId === q.question_id && editingOption?.optionIndex === optionIndex ? (
                        <>
                          <input
                            className="border p-1 flex-grow"
                            {...register(`option-${q.question_id}-${optionIndex}`)}
                          />
                          <button className="text-green-500 ml-2" onClick={() => handleSaveOption(q, optionIndex)}>
                            ✅
                          </button>
                          <button className="text-red-500 ml-2" onClick={() => setEditingOption(null)}>
                            ❌
                          </button>
                        </>
                      ) : (
                        <>
                          <label className="text-gray-700 flex items-center mb-2">
                            <input
                              type={q.type === 'Multiple-choice' ? 'checkbox' : 'radio'}
                              className="mr-2"
                              {...register(`options-${q.question_id}`)}
                              value={o.name}
                            />
                            {o.name}
                          </label>
                          <button
                            className="text-blue-500 ml-2"
                            onClick={() => setEditingOption({ questionId: q.question_id, optionIndex })}
                          >
                            <img src={IconPack.editModule} alt="trashIcon" className="size-4 mb-2" />
                          </button>
                          <button
                            className="text-red-500 ml-2 cursor-pointer"
                            onClick={() => handleDeleteOption(q, optionIndex)}
                          >
                            <img src={IconPack.trashIcon} alt="trashIcon" className="size-4 mb-2" />
                          </button>
                        </>
                      )}{' '}
                    </div>
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
            <button
              className="btn-primary cursor-pointer bg-custom-green text-white px-4 py-2 rounded-sm"
              onClick={handleSave}
            >
              {Strings.save}
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default TestInfo2
