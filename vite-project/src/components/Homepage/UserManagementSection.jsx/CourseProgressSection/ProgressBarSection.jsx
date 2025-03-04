import ProgressBar from '../../../../common/ProgressBar'
import { progressData } from '../../../../constants/UserManagement'

const ProgressBarSection = () => {
  const total = progressData.reduce((sum, item) => sum + item.value, 0)

  return (
    <div className="flex-1 space-y-3">
      {progressData?.map((data, index) => (
        <ProgressBar key={index} {...data} total={total} />
      ))}
    </div>
  )
}

export default ProgressBarSection
