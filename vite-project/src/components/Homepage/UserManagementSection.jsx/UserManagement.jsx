import CourseProgressSection from './CourseProgressSection'
// import { IconPack } from '../../../constants/IconPack'
import { Strings } from '../../../constants/Strings'
import UserInfoSection from './UserInfoSection'
import PerformanceSection from './PerformanceSection'

const UserManagement = () => {
  return (
    <div className="pt-2">
      {/* Header Section */}
      <div className="flex flex-1 justify-between items-center">
        <h1 className="text-xl font-bold mb-4">{Strings?.userDetails}</h1>
        <div>
          <button className="btn-secondary">{Strings?.back}</button>
        </div>
      </div>
      {/* Content Section */}
      <div className="flex flex-col md:flex-row gap-1 w-full">
        {/* User Info Section */}
        <UserInfoSection />
        {/* Course Progress Section */}
        <CourseProgressSection />
      </div>{' '}
      {/* Performance Section */}
      <PerformanceSection />
    </div>
  )
}

export default UserManagement
