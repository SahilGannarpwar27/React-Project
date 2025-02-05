import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router'
import { IconPack } from '../../../constants/IconPack.js'
import { Strings } from '../../../constants/Strings'
import { setCurrentCourse } from '../../../Redux/Slice/CoursesSlice'
import Pagination from 'rc-pagination'
import 'rc-pagination/assets/index.css'
import { useForm } from 'react-hook-form'

const Courses = () => {
  const { register,watch } = useForm({
    defaultValues: {
      entries : 2,
    },
  })
  
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const courses = useSelector((state) => state.courses.courses)
  // const currentCourse = useSelector((state) => state.courses.currentCourse)
  // console.log('currentCourse ', currentCourse)
  const isEditMode = useSelector((state) => state.courses.isEditMode)
  console.log(isEditMode)

  const [copyCourses, setCopyCourses] = useState(courses)
  const [selectedStatus, setSelectedstatus] = useState('')

  // For Pagination

  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(2)
  const totalItems = copyCourses.length
  console.log(totalItems)
  const currentItems = copyCourses.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  const entries = watch('entries')

  useEffect(() => {
    setItemsPerPage(entries)
  }, [entries])

  //To filter status
  const handleFilter = (e) => {
    const status = e.target.value
    console.log(status)
    setSelectedstatus(status)
    if (status) {
      setCopyCourses(courses.filter((course) => course.status === status))
    } else {
      setCopyCourses(courses)
    }
    setCurrentPage(1) // Reset to the first page
  }

  const handleAddNew = () => {
    navigate('/courses/add-new-course', { replace: false })
  }

  // Scenario : To navigate to course Details of currentCourse

  const handleCourseClick = (course) => {
    console.log('course ', course)
    dispatch(setCurrentCourse(course))
    navigate('/courses/course-details', { replace: false })
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
            <option value="">{Strings.all}</option>
            <option value="Draft">{Strings.draft}</option>
            <option value="Inactive">{Strings.inactive}</option>
            <option value="Active">{Strings.active}</option>
          </select>
        </div>
        {/* Add New Button */}
        <button onClick={handleAddNew} className="btn-secondary">
          {Strings.addNew}
        </button>
      </div>
      {/* Table of Courses */}
      {/* Conditional Rendering */}
      {copyCourses.length === 0 ? (
        <div className="bg-white p-4 rounded shadow-md flex flex-col items-center space-y-4">
          <h1>{Strings.tableEmpty}</h1>
          <h2>{Strings.addCourses}</h2>
          <button onClick={handleAddNew} className="btn-secondary ml-6">
            {Strings.addNew}
          </button>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse mt-4 bg-white">
            <thead>
              <tr className="text-left">
                <th className="border-b p-2">{Strings.title}</th>
                <th className="flex border-b p-2">
                  <span className="pr-1">{Strings.mandatory}</span>
                  <img className="pt-1" src={IconPack.caretIcon} alt="caret icon" />
                </th>
                <th className="border-b p-2">{Strings.category}</th>
                <th className="flex border-b p-2">
                  <span className="pr-1">{Strings.noOfAssignee}</span>
                  <img className="pt-1" src={IconPack.caretIcon} alt="caret icon" />
                </th>
                <th className="border-b p-2">
                  <span>{Strings.courseDuration}</span>
                  <img className="pt-1 float-right" src={IconPack.caretIcon} alt="caret icon" />
                </th>
                <th className="border-b p-2">{Strings.status}</th>
              </tr>
            </thead>
            {/* Table Body */}
            <tbody>
              {currentItems.map((course, index) => (
                <tr key={index} className="hover:bg-gray-50 cursor-pointer" onClick={() => handleCourseClick(course)}>
                  <td className="border-b p-2 truncate">{course.course_title}</td>
                  <td className="border-b p-2 truncate">{course.is_mandatory ? 'Yes' : 'No'}</td>
                  <td className="border-b p-2 truncate">{course.category}</td>
                  <td className="border-b p-2 truncate">{course.assignee}</td>
                  <td className="border-b p-2 truncate">{course.duration}</td>
                  <td className="border-b p-4 truncate">
                    <span
                      className={
                        course.status === 'Draft'
                          ? 'btn-draft'
                          : course.status === 'Active'
                            ? 'btn-active'
                            : 'btn-Inactive'
                      }
                    >
                      {course.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-between mt-2">
            <div>
              show <input type="number" value={itemsPerPage} className="w-9 pl-1 h-5" {...register('entries')} />{' '}
              entries
            </div>
            <Pagination current={currentPage} total={totalItems} pageSize={itemsPerPage} onChange={onPageChange} />
          </div>
        </div>
      )}
      <Outlet />
    </div>
  )
}

export default Courses
