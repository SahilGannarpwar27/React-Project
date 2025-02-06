import SidebarField from '../../common/SidebarField'
import { IconPack } from '../../constants/IconPack.js'
import { PATH_COURSES, PATH_DASHBOARD, PATH_USERMANAGEMENT } from '../../constants/RouteConstants'
import { Strings } from '../../constants/Strings'

const Sidebar = () => {
  return (
    <aside className="w-1/5 min-w-[20%] bg-white text-black h-screen shadow-[1px_2px_12px_0px_#00000014] border-gray-300">
      <ul className="space-y-4 p-4">
        {/* Dashboard Link */}
        <SidebarField path={PATH_DASHBOARD} imgsrc={IconPack.home} string={Strings.dashboardName} />

        {/* Courses Link */}
        <SidebarField path={PATH_COURSES} imgsrc={IconPack.graduationCap} string={Strings.allCourses} />

        {/* User Management Link */}
        <SidebarField path={PATH_USERMANAGEMENT} imgsrc={IconPack.UserManagement} string={Strings.userManagement} />
      </ul>
    </aside>
  )
}

export default Sidebar
