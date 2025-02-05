import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useForm } from 'react-hook-form'

const useTestFunctionality = (currentTest) => {
  const [localTest, setLocalTest] = useState(currentTest)
  const [editingOption, setEditingOption] = useState(null)
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm()
  const formValues = watch()
  console.log(formValues)

  // Scenario : To add new option
  const handleAddOption = (q) => {
    const updatedQuestions = localTest.questions.map((question) => {
      if (question.question_id === q.question_id) {
        const updatedOptions = [...question.options, { name: `option ${question.options.length + 1}`, value: false }]

        return {
          ...question,
          options: updatedOptions,
        }
      }
      // Return the question unchanged if it doesn't match
      return question
    })

    setLocalTest({ ...localTest, questions: updatedQuestions })
  }

  // Scenario : to add new question
  const handleAddQuestion = () => {
    const newQuestion = {
      question_id: uuidv4(),
      question_description: '',
      type: '',
      options: [{ name: 'option 1', value: false }],
      correct_option: 'option 1',
    }
    setLocalTest({
      ...localTest,
      questions: [...localTest.questions, newQuestion],
    })
    // module?.test?.questions.push(newQuestion)
    // ${localTest?.options?.length + 1 || 1}
  }

  //  Scenario : to delete question
  const handleDeleteQuestion = (q) => {
    // handleQuestionClick(q)
    const updatedQuestions = localTest.questions.filter((question) => question.question_id !== q.question_id)
    setLocalTest({ ...localTest, questions: updatedQuestions })
  }

  // Delete option
  const handleDeleteOption = (q, optionIndex) => {
    const updatedQuestions = localTest.questions.map((question) => {
      if (question.question_id === q.question_id) {
        const updatedOptions = question.options.filter((_, index) => index !== optionIndex)
        return { ...question, options: updatedOptions }
      }
      return question
    })

    setLocalTest({ ...localTest, questions: updatedQuestions })
  }

  // Save updated option
  const handleSaveOption = (q, optionIndex) => {
    const optionKey = `option-${q.question_id}-${optionIndex}`
    const newName = formValues[optionKey] || q.options[optionIndex].name
    const updatedQuestions = localTest.questions.map((question) => {
      if (question.question_id === q.question_id) {
        const updatedOptions = question.options.map((o, index) => {
          if (index === optionIndex) {
            return { ...o, name: newName }
          }
          return o
        })
        return { ...question, options: updatedOptions }
      }
      return question
    })

    setLocalTest({ ...localTest, questions: updatedQuestions })
    setEditingOption(null) // Exit edit mode
  }

  useEffect(() => {
    setLocalTest(currentTest)

    // Populate form fields with currentTest values
    if (currentTest?.questions) {
      currentTest.questions.forEach((q) => {
        setValue(`description-${q.question_id}`, q.question_description || '')
        setValue(`type-${q.question_id}`, q.type || '')
        setValue(`options-${q.question_id}`, q.correct_option || '')
      })
    }
  }, [currentTest, setValue])

  useEffect(() => {
    if (formValues && localTest?.questions) {
      const updatedQuestions = localTest?.questions.map((q) => {
        const newType = formValues[`type-${q.question_id}`]
        const newDescription = formValues[`description-${q.question_id}`]
        const currentOption = formValues[`options-${q.question_id}`]

        // Update only if values have changed
        if (
          (newType && q.type !== newType) ||
          (newDescription !== undefined && q.question_description !== newDescription) ||
          (currentOption !== undefined && q.correct_option !== currentOption)
        ) {
          return {
            ...q,
            type: newType || q.type,
            question_description: newDescription || q.question_description,
            correct_option: currentOption || q.correct_option,
          }
        }
        //Scenario : Return unchanged question if no updates
        return q
      })

      // Only update state if questions actually change
      if (JSON.stringify(localTest.questions) !== JSON.stringify(updatedQuestions)) {
        setLocalTest((prev) => ({
          ...prev,
          questions: updatedQuestions,
        }))
      }
    }
  }, [formValues, localTest?.questions])

  return [
    handleSaveOption,
    handleDeleteOption,
    handleDeleteQuestion,
    handleAddQuestion,
    handleAddOption,
    setEditingOption,
    editingOption,
    localTest,
    register,
    formValues,
  ]
}

export default useTestFunctionality
