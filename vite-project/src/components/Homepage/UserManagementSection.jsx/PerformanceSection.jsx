import { UserManagementData } from '../../../utils/userManagementData'
import { useState } from 'react'
import { IconPack } from '../../../constants/IconPack'

const PerformanceSection = () => {
  const [selected, setselected] = useState(null)
  const toggle = (index) => {
    if (selected == index) {
      return setselected(null)
    }
    setselected(index)
  }

  return (
    <div className="p-2 mt-2 bg-white">
      <h2 className="font-semibold">Performance & Achievements</h2>
      <div className="flex space-x-4">
        {/* {Data Section} */}
        <div className="border shadow-md p-3 rounded-sm">
          <p className="text-custom-green">92.45%</p>
          <p className="text-xs">Avg. score achieved per module</p>
        </div>
        <div className="border shadow-md p-3 rounded-sm">
          <p className="text-custom-green">6hr 28min</p>
          <p className="text-xs">Avg. time taken to complete the course</p>
        </div>
        <div className="border shadow-md p-3 rounded-sm">
          <p className="text-custom-green">07</p>
          <p className="text-xs">Avg. number attempts per module</p>
        </div>
      </div>
      {/* Table Section */}
      <div className="mt-4 overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="px-4 py-2 text-left">Courses</th>
              <th className="px-4 py-2 text-left">Score Achieved</th>
              <th className="px-4 py-2 text-left">Time Taken</th>
              <th className="px-4 py-2 text-left">No. of Attempts</th>
              <th className="px-4 py-2 text-left">Assigned Date</th>
              <th className="px-4 py-2 text-left">Completed Date</th>
              <th className="px-4 py-2 text-left">Task Status</th>
            </tr>
          </thead>
          <tbody>
            {UserManagementData.map((data, index) => (
              <>
                <tr key={index} className="border-b cursor-pointer" onClick={() => toggle(index)}>
                  <td className="px-4 py-2 flex space-x-2">
                    <img src={selected === index ? IconPack.dropdownIconup : IconPack.dropdownIcon} alt="icon" />
                    <p>{data.course}</p>
                  </td>
                  <td className="px-4 py-2">{data.scoreAchieved}</td>
                  <td className="px-4 py-2">{data.timeTaken}</td>
                  <td className="px-4 py-2">{data.noOfAttempts}</td>
                  <td className="px-4 py-2">{data.assignedDate}</td>
                  <td className="px-4 py-2">{data.completedDate}</td>
                  <td className="flex justify-center space-x-1 p-1 text-green-900 bg-custom-green rounded-sm font-semibold"><span>{data.taskStatus}</span><img src={IconPack.dropdownIcon} alt="icon" /></td>
                </tr>
                {selected === index &&
                  data?.subCourses?.map((course, subIndex) => (
                    <tr key={subIndex} className="bg-gray-50">
                      <td className="px-4 py-2">{course.course}</td>
                      <td className="px-4 py-2">{course.scoreAchieved}</td>
                      <td className="px-4 py-2">{course.timeTaken}</td>
                      <td className="px-4 py-2">{course.noOfAttempts}</td>
                      <td className="px-4 py-2">{course.assignedDate}</td>
                      <td className="px-4 py-2">{course.completedDate}</td>
                      <td className="px-4 py-2 text-green-600 font-semibold">{data.taskStatus}</td>
                    </tr>
                  ))}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default PerformanceSection
