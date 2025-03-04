import { PDFDownloadLink } from '@react-pdf/renderer'
import UserPDF from './UserPDF'
import PerformanceSection from './PerformanceSection/PerformanceSection'
import UserInfoSection from './UserInformationSection.jsx/UserInfoSection'
import CourseProgressSection from './CourseProgressSection/CourseProgressSection'
import { userData } from '../../../utils/userData'
import { Strings } from '../../../constants/Strings'
import { useRef, useState } from 'react'
import html2canvas from 'html2canvas'
// import { useDispatch } from 'react-redux'
// import { setShowAll } from '../../../Redux/Slice/CoursesSlice'

const UserManagement = () => {
  // const printRef = useRef()
  const chartRef = useRef(null)
  const [chartImage, setChartImage] = useState('')

  const captureChart = async () => {
    if (chartRef.current) {
      try {
        const canvas = await html2canvas(chartRef.current)
        setChartImage(canvas.toDataURL('image/png'))
      } catch (error) {
        console.error('Error capturing chart:', error)
      }
    }
  }
  return (
    <div className="pt-2">
      {/* Header Section */}
      <div className="flex flex-1 justify-between items-center">
        <h1 className="text-xl font-bold mb-4">{Strings?.userDetails}</h1>
        <div className="flex gap-2">
          <PDFDownloadLink
            document={<UserPDF userData={userData} chartImage={chartImage} />}
            fileName="user_details.pdf"
            className="btn-secondary"
            onClick={() => captureChart()}
          >
            {({ loading }) => (loading ? 'Generating PDF...' : 'Download PDF')}
          </PDFDownloadLink>
          <button className="btn-secondary">{Strings?.back}</button>
        </div>
      </div>
      <div>
        {/* Content Section */}
        <div className="flex flex-col md:flex-row gap-1 w-full">
          {/* User Info Section */}
          <UserInfoSection />
          {/* Course Progress Section */}
          <CourseProgressSection chartRef={chartRef} />
        </div>
        {/* Performance Section */}
        <PerformanceSection />
      </div>
    </div>
  )
}

export default UserManagement
