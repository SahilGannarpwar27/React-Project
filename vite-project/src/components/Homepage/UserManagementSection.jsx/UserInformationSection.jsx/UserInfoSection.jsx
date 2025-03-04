import UserData from './UserData'
import ImageUploader from '../../../../common/ImageUploader'
import { userDataArray } from '../../../../constants/UserManagement'




const UserInfoSection = () => {
  return (
    <div className="flex flex-col sm:flex-row items-start gap-4 bg-white rounded-lg shadow-md p-4 md:basis-[40%] min-w-0">
      <div className="w-24 sm:w-32 flex-shrink-0 rounded-full overflow-hidden border border-gray-300">
        <ImageUploader />
      </div>
      <div className="w-full min-w-0">
        {userDataArray?.map((data, index) => (
          <UserData key={index} {...data} />
        ))}
      </div>
    </div>
  )
}

export default UserInfoSection
