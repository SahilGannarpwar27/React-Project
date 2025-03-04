/* eslint-disable react/prop-types */
import { IconPack } from "../../../../constants/IconPack"


const CourseRow = ({ data, index, selected, toggle, showAll }) => {
  return (
<>
    <tr className="border-b cursor-pointer" onClick={() => toggle(index)}>
      <td className="px-4 py-2 flex space-x-2">
        <img src={selected === index ? IconPack.dropdownIconup : IconPack.dropdownIcon} alt="icon" />
        <p>{data.course}</p>
      </td>
      <td className="px-4 py-2">{data.scoreAchieved}</td>
      <td className="px-4 py-2">{data.timeTaken}</td>
      <td className="px-4 py-2">{data.noOfAttempts}</td>
      <td className="px-4 py-2">{data.assignedDate}</td>
      <td className="px-4 py-2">{data.completedDate}</td>
      <td className="flex justify-center space-x-1 p-1 text-green-900 bg-custom-green rounded-sm font-semibold">
        <span>{data.taskStatus}</span>
        <img src={IconPack.dropdownIcon} alt="icon" />
      </td>
    </tr>
    {(selected === index || showAll) &&
      data.subCourses?.map((course, subIndex) => (
        <tr key={subIndex} className="bg-gray-50">
          <td className="px-4 py-2">{course.course}</td>
          <td className="px-4 py-2">{course.scoreAchieved}</td>
          <td className="px-4 py-2">{course.timeTaken}</td>
          <td className="px-4 py-2">{course.noOfAttempts}</td>
          <td className="px-4 py-2">{course.assignedDate}</td>
          <td className="px-4 py-2">{course.completedDate}</td>
          <td className="px-4 py-2 text-green-600 font-semibold">{course.taskStatus}</td>
        </tr>
      ))}
  </>
  )
}

export default CourseRow
