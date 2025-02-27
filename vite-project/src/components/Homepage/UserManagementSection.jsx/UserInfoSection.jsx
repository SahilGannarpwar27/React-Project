import ImageUploader from '../../../common/ImageUploader'
import { IconPack } from '../../../constants/IconPack'

const UserInfoSection = () => {
  return (
    <div className="flex flex-col sm:flex-row items-start gap-4 bg-white rounded-lg shadow-md p-4 md:basis-[40%] min-w-0">
      <div className="w-24 sm:w-32 aspect-square flex-shrink-0 rounded-full overflow-hidden border border-gray-300">
        {/* <img src={IconPack.userImage} alt="User" className="w-full h-full object-cover" /> */}
        <ImageUploader
          initialImage={IconPack.userImage}
          onImageChange={(newImageDataUrl) => {
            // Optional: Do something with the new image URL
            // For example, you could save it to state or send to your backend
            console.log(newImageDataUrl)
          }}
        />
      </div>
      <div className="w-full min-w-0">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full mb-4">
          <div className="min-w-0">
            <h4 className="font-bold text-sm">Peter Laningard</h4>
            <p className="text-gray-600 text-xs">Employee</p>
          </div>
          <p className="btn-active text-xs mt-1 sm:mt-0">Active</p>
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end w-full mb-4">
          <div className="min-w-0">
            <h5 className="font-bold text-sm">Email</h5>
            <p className="text-gray-600 text-xs truncate">peter.leningard@gmail.com</p>
          </div>
          <p className="text-green-600 underline text-xs cursor-pointer mt-1 sm:mt-0">update</p>
        </div>
        <div className="flex justify-between items-start sm:items-end w-full mb-4">
          <div className="min-w-0">
            <h5 className="font-bold text-sm">Username</h5>
            <p className="text-gray-600 text-xs truncate">PeterL</p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end w-full">
          <div className="min-w-0">
            <h5 className="font-bold text-sm">Password</h5>
            <p className="text-gray-600 text-xs">***************</p>
          </div>
          <p className="text-green-600 underline text-xs cursor-pointer mt-1 sm:mt-0">change</p>
        </div>
      </div>
    </div>
  )
}

export default UserInfoSection
