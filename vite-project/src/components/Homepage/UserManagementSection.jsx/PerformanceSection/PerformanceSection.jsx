import { useState } from 'react'

import CourseRow from './CourseRow'
import PerformanceStat from './PerformanceStat'
import { UserManagementData } from '../../../../utils/userManagementData'
import { performanceStats, tableHeadData } from '../../../../constants/UserManagement'
import { useSelector } from 'react-redux'

const PerformanceSection = () => {
  const [selected, setSelected] = useState(null)
  const toggle = (index) => setSelected(selected === index ? null : index)
  const { showAll } = useSelector((state) => state?.courses)
  console.log('showall: ', showAll);


  return (
    <div className="p-2 mt-2 bg-white">
      <h2 className="font-semibold">Performance & Achievements</h2>
      <div className="flex space-x-4">
        {performanceStats.map((stat, index) => (
          <PerformanceStat key={index} {...stat} />
        ))}
      </div>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100 border-b">
            <tr>
              {tableHeadData.map((header, i) => (
                <th key={i} className="px-4 py-2 text-left">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {UserManagementData.map((data, index) => (
              <CourseRow key={index} data={data} index={index} selected={selected} toggle={toggle} showAll={showAll}  />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default PerformanceSection
