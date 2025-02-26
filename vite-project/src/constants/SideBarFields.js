import { IconPack } from "./IconPack";
import { PATH_COURSES, PATH_DASHBOARD, PATH_USERMANAGEMENT } from "./RouteConstants";
import { Strings } from "./Strings";

export const SideBarFields = [
    {
        path : PATH_DASHBOARD,
        imgsrc : IconPack.home,
        string : Strings.dashboardName
    },
    {
        path : PATH_COURSES,
        imgsrc : IconPack.graduationCap,
        string : Strings.allCourses
    },
    {
        path : PATH_USERMANAGEMENT,
        imgsrc : IconPack.UserManagement,
        string : Strings.userManagement
    },
]