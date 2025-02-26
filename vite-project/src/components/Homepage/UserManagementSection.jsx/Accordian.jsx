import { useState } from 'react'

const data = [
  {
    question: 'question 1',
    answer: 'lijdfnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnaskankdnakdnakdnwkndfksnd',
  },
  {
    question: 'question 2',
    answer: 'lijdfnnnnnnnnnnnnnnnnfdhucvmnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnaskankdnakdnakdnwkndfksnd',
  },
  {
    question: 'question 3',
    answer: 'lijdfnnnnnnnnnnnnnnnnnnnnnnnnsdfghgfdnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnaskankdnakdnakdnwkndfksnd',
  },
]
const Accordian = () => {
  const [selected, setselected] = useState(null)
  const toggle = (index) => {
    if (selected == index) {
      return setselected(null)
    }
    setselected(index)
  }

  return (
    <div className="flex h-full w-full justify-center items-center">
      <div className="w-full ">
        {data.map((item, index) => (
          <div key={index} className="item bg-gray-400 mb-1 p-2">
            <div className="title flex justify-between cursor-pointer" onClick={() => toggle(index)}>
              <h2>{item.question}</h2>
              <span>{selected === index ? '-' : '+'}</span>
            </div>
            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                selected === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              {item.answer}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Accordian
