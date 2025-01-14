import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router'

const Courses = () => {
  const courses = useSelector((state) => state.courses)

  const navigate = useNavigate();
  const [copyCourses, setCopyCourses] = useState(courses)
  const [selectedStatus, setSelectedstatus] = useState('')

  const handleFilter = (e) => {
    const status = e.target.value
    console.log(status)
    setSelectedstatus(status)
    if (status) {
      setCopyCourses(copyCourses.filter((course) => course.status === status))
      // setIsTrue(true)
    } else {
      setCopyCourses(courses)
    }
  }
  console.log(copyCourses)

  const handleAddNew = () => {
    navigate('/homepage/courses/add-new-course' , {replace : false})
    
  }

  return (
    <div className="pt-2">
      <h1 className="text-xl font-bold mb-4">All Courses</h1>
      <div className="flex justify-between items-center flex-wrap mb-4">
        <div className="flex items-center space-x-4 mb-2 sm:mb-0">
          {/* Search Tab */}
          <input
            type="text"
            placeholder="Search"
            className="border border-gray-300 px-2 py-1 focus:outline-none focus:ring-1 focus:ring-gray-500"
          />

          {/* Filter */}
          <select value={selectedStatus} onChange={handleFilter}>
            <option value="">All</option>
            <option value="Draft">Draft</option>
            <option value="Inactive">Inactive</option>
            <option value="Active">Active</option>
          </select>
          {/* <div className="relative w-8 h-8 border border-gray-300 bg-white p-2 cursor-pointer">
            <img
              className="absolute w-6 h-6 top-1 left-1 object-contain pointer-events-none"
              src="/Skillsync-img/filter.svg"
              alt="filter"
            />
            <select
              value={selectedStatus}
              onChange={handleFilter}
              className="absolute opacity-0 cursor-pointer"
            >
              <option value="">All</option>
              <option value="draft">Draft</option>
              <option value="inactive">Inactive</option>
              <option value="active">Active</option>
            </select>
          </div> */}
          {/* <img onClick={handleFilter} className="w-8 h-8 border border-gray-300 bg-white p-2 cursor-pointer " src="/Skillsync-img/filter.svg" alt="filter" /> */}
        </div>
        {/* Add New Button */}
        <button onClick={handleAddNew} className="btn-secondary">
          Add new
        </button>
      </div>

      {/* Table of Courses */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse mt-4 bg-white">
          <thead>
            <tr className="text-left">
              <th className="border-b p-2">Title</th>
              <th className="flex border-b p-2">
                <span className="pr-1">Mandatory</span>
                <img className="pt-1" src="/Skillsync-img/caretIcon.svg" alt="caret icon" />
              </th>
              <th className="border-b p-2">Category</th>
              <th className="flex border-b p-2">
                <span className="pr-1">No of assignee</span>
                <img className="pt-1" src="/Skillsync-img/caretIcon.svg" alt="caret icon" />
              </th>
              <th className="border-b p-2">
                <span>Course duration</span>
                <img className="pt-1 float-right" src="/Skillsync-img/caretIcon.svg" alt="caret icon" />
              </th>
              <th className="border-b p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {copyCourses.map((course, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="border-b p-2 truncate">{course.course_title}</td>
                <td className="border-b p-2 truncate">{course.is_mandatory ? 'Yes' : 'No'}</td>
                <td className="border-b p-2 truncate">{course.category}</td>
                <td className="border-b p-2 truncate">{course.assignee}</td>
                <td className="border-b p-2 truncate">{course.duration}</td>
                <td className="border-b p-4 truncate">
                  <span className={course.status === "Draft" ? "btn-draft" : course.status === 'Active' ? "btn-active" : "btn-Inactive"} >
                    {course.status}
                  </span>
                </td>
                {/* className="text-green-400 border border-green-600 rounded-3xl pl-2 pr-2 bg-green-200" */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Outlet />
    </div>
  )
}

export default Courses
