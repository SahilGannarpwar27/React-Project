import { useEffect, useState } from 'react'

import Pagination from 'rc-pagination'
import { useForm } from 'react-hook-form'
import { Outlet, useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'

import API from '../../../api/Api.js'
import FilterCourseModal from '../../../common/FilterCourseModal.jsx'
import { Strings } from '../../../constants/Strings'
import { IconPack } from '../../../constants/IconPack.js'
import { setCurrentCourse } from '../../../Redux/Slice/CoursesSlice'
import { PATH_ADDNEWCOURSE, PATH_COURSEDETAILS } from '../../../constants/RouteConstants.js'
import 'rc-pagination/assets/index.css'

const Courses = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [showModal, setShowModal] = useState(false)
  const { status } = useSelector((state) => state?.courses)
  const [copyCourses, setCopyCourses] = useState([])
  console.log('length :', copyCourses.length)
  const { register, watch } = useForm({
    defaultValues: {
      entries: 6,
    },
  })

  const handleAddNew = () => {
    navigate(PATH_ADDNEWCOURSE, { replace: false })
  }

  const handleCourseClick = (course) => {
    console.log('course ', course)
    dispatch(setCurrentCourse(course))
    navigate(PATH_COURSEDETAILS, { replace: false })
  }

  const handleShowFilter = () => {
    setShowModal((prev) => !prev)
  }

  // For Pagination
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(2)
  const totalItems = copyCourses?.length
  const currentItems = copyCourses?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
  const entries = watch('entries')
  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  const fetchData = async () => {
    // try {
    //   const response = dispatch(coursesList()).unwrap()
    //   if (response) {
    //     setCopyCourses(response)
    //   }
    // } catch (error) {
    //   console.log(error)
    // }
    const response = await API.get('/course-list/')
    console.log(response)
    setCopyCourses(response?.data?.results || [])
  }

  // useEffect(() => {
  //   setItemsPerPage(entries)
  // }, [entries])

  // useEffect(() => {
  //   console.log('In useEffect')
  //   try {
  //     const response = dispatch(coursesList()).unwrap()
  //     console.log('response ', response)
  //     if (response) {
  //       console.log("response courses ", response)
  //       setCopyCourses(response)
  //     }
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }, [dispatch]).

  useEffect(() => {
    fetchData()
  }, [])

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
          <img
            src={IconPack.filter}
            alt="filter"
            className="bg-white p-2 border border-gray-300 cursor-pointer"
            onClick={handleShowFilter}
          />
        </div>
        {/* Add New Button */}
        <button onClick={handleAddNew} className="btn-secondary">
          {Strings.addNew}
        </button>
      </div>
      {/* Table of Courses */}
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
                  <td className="border-b p-2 truncate">{course.category_name}</td>
                  <td className="border-b p-2 truncate">{course.no_of_assignee}</td>
                  <td className="border-b p-2 truncate">{course.duration}</td>
                  <td className="border-b p-4 truncate">
                    <span
                      className={
                        course.status === 'draft'
                          ? 'btn-draft'
                          : course.status === 'active'
                            ? 'btn-active'
                            : 'btn-Inactive'
                      }
                    >
                      {course?.status}
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
      {showModal && <FilterCourseModal setShowModal={setShowModal} />}
    </div>
  )
}

export default Courses
