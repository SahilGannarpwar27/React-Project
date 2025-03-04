

const PerformanceStat = ({ value, label }) => {
  return (
<div className="border shadow-md p-3 rounded-sm">
    <p className="text-custom-green">{value}</p>
    <p className="text-xs">{label}</p>
  </div>
  )
}

export default PerformanceStat
