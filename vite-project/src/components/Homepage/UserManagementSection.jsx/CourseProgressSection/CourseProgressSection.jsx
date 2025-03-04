import ChartSection from './ChartSection'
import ProgressBarSection from './ProgressBarSection'

const progressColors = [
  'rgba(56, 199, 118, 1)',
  'rgba(255, 138, 0, 1)',
  'rgba(255, 68, 88, 1)',
  'rgba(215, 215, 215, 1)',
]

const CourseProgressSection = ({chartRef}) => {
  const data = [9, 10, 3, 5]

  return (
    <div className="bg-white rounded-lg shadow-md p-4 md:basis-[60%]">
      <div>
        <h4 className="font-semibold">Course & Training Progress</h4>
      </div>
      <div ref={chartRef} className="flex">
        <ChartSection data={data} progressColors={progressColors} />

        {/* Progress bar */}
        <ProgressBarSection />
      </div>
    </div>
  )
}

export default CourseProgressSection
