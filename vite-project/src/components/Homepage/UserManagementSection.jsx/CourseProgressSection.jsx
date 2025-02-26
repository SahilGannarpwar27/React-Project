import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js'
ChartJS.register(ArcElement, Tooltip, Legend, Title)

const CourseProgressSection = () => {
  const data = [9, 10, 3, 5]
  return (
    <div className="bg-white rounded-lg shadow-md p-4 md:basis-[60%]">
      <div>
        <h4 className="font-semibold">Course & Training Progress</h4>
      </div>
      <div className="flex">
        <div className="w-1/2 h-44">
          <Doughnut
            data={{
              labels: ['Completed', 'Inprocess', 'Overdue'],
              datasets: [
                {
                  label: 'My First Dataset',
                  data: data,
                  backgroundColor: [
                    'rgba(56, 199, 118, 1)',
                    'rgba(255, 138, 0, 1)',
                    'rgba(255, 68, 88, 1)',
                    'rgba(215, 215, 215, 1)',
                  ],
                  hoverOffset: 4,
                  cutout: '80%',
                },
              ],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: true,
              plugins: {
                legend: {
                  display: false,
                },
              },
            }}
          />
        </div>
        {/* Progress bar */}
        <div className="flex-1 space-y-3">
          <div>
            <div className="flex justify-between">
              <span className="text-gray-400">Completed</span>
              <span className="text-gray-400">09</span>
            </div>

            <div className="bg-gray-400 rounded-xl h-3 w-full">
              <div className="bg-custom-green rounded-xl h-full" style={{ width: `${(9 / 27) * 100}%` }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between">
              <span className="text-gray-400">Inprocess</span>
              <span className="text-gray-400">10</span>
            </div>
            <div className="bg-gray-400 rounded-xl h-3 w-full">
              <div className="bg-orange-400 rounded-xl h-full" style={{ width: `${(10 / 27) * 100}%` }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between">
              <span className="text-gray-400">Overdue</span>
              <span className="text-gray-400">03</span>
            </div>
            <div className="bg-gray-400 rounded-xl h-3 w-full">
              <div className="bg-rose-500 rounded-xl h-full" style={{ width: `${(3 / 27) * 100}%` }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseProgressSection

{
  /* <div className="flex flex-col md:flex-row justify-center">
        <div className="w-[200px] h-[200px] mx-auto">
          <Doughnut
            data={{
              labels: ['Completed', 'Inprocess', 'Overdue'],
              datasets: [
                {
                  label: 'My First Dataset',
                  data: [9, 10, 3, 5],
                  backgroundColor: [
                    'rgba(56, 199, 118, 1)',
                    'rgba(255, 138, 0, 1)',
                    'rgba(255, 68, 88, 1)',
                    'rgba(215, 215, 215, 1)',
                  ],
                  hoverOffset: 4,
                  cutout: '80%',
                },
              ],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: true,
              plugins: {
                // title: {
                //   display: true,
                //   color: '#000',
                //   text: 'Course & Training Progress',
                //   font: {
                //     size: 16,
                //     weight: '600',
                //   },
                //   padding: {
                //     bottom: 20,
                //   },
                // },
                legend: {
                  position: 'right',
                  align: 'center',
                  labels: {
                    boxWidth: 12,
                    padding: 20,
                    font: {
                      size: 12,
                    },
                  },
                },
              },
            }}
          />
        </div>
      </div> */
}
