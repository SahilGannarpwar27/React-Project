import SidebarField from '../../common/SidebarField'

import { SideBarFields } from '../../constants/SideBarFields.js'

const Sidebar = () => {
  return (
    <aside className="w-1/5 min-w-[20%] bg-white text-black h-screen shadow-[1px_2px_12px_0px_#00000014] border-gray-300">
      <ul className="space-y-4 p-4">
        {SideBarFields.map((field) => (
          <SidebarField key={field.string} path={field.path} imgsrc={field.imgsrc} string={field.string} />
        ))}
      </ul>
    </aside>
  )
}

export default Sidebar
