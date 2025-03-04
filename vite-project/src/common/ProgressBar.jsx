import PropTypes from "prop-types";

const ProgressBar = ({ label, value, color, total }) => {
  return (
    <div>
      <div className="flex justify-between">
        <span className="text-gray-400">{label}</span>
        <span className="text-gray-400">{value}</span>
      </div>
      <div className="bg-gray-400 rounded-xl h-3 w-full">
        <div className={`${color} rounded-xl h-full`} style={{ width: `${(value / total) * 100}%` }}></div>
      </div>
    </div>
  )
}

ProgressBar.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
    total: PropTypes.number.isRequired,
  };

export default ProgressBar
