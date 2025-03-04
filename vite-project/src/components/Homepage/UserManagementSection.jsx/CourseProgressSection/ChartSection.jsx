import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js'
ChartJS.register(ArcElement, Tooltip, Legend, Title)

const centerTextPlugin = {
  id: 'centerText',
  beforeDraw: (chart) => {
    const { width, height } = chart
    const ctx = chart.ctx
    ctx.restore()

    // Define text properties
    const boldText = '27'
    const subText = 'Assigned'
    const boldFontSize = (height / 100) * 10
    const subFontSize = (height / 100) * 5

    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillStyle = '#333'

    const x = width / 2
    const y = height / 2

    // Draw bold number
    ctx.font = `bold ${boldFontSize}px Arial`
    ctx.fillText(boldText, x, y - subFontSize)

    // Draw subtext below
    ctx.font = `${subFontSize}px Arial`
    ctx.fillText(subText, x, y + subFontSize)

    ctx.save()
  },
}

const ChartSection = ({ data, progressColors }) => {
  return (
    <div className="w-1/2 h-44 relative">
      <Doughnut
        data={{
          labels: ['Completed', 'Inprocess', 'Overdue'],
          datasets: [
            {
              label: 'Progress Data',
              data: data,
              backgroundColor: progressColors,
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
        plugins={[centerTextPlugin]}
      />
    </div>
  )
}


export default ChartSection
