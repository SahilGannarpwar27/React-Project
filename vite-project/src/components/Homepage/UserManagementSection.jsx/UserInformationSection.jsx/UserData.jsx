import PropTypes from 'prop-types'

const UserData = ({ label, value, actionLabel, onActionClick }) => {
  return (
    <div className="flex justify-between items-start sm:items-end w-full mb-4">
      <div className="min-w-0">
        <h5 className="font-bold text-sm">{label}</h5>
        <p className="text-gray-600 text-xs truncate">{value}</p>
      </div>
      {actionLabel && (
        <p
          className={
            actionLabel === 'Active'
              ? 'btn-active text-xs mt-1 sm:mt-0'
              : 'text-green-600 underline text-xs cursor-pointer mt-1 sm:mt-0'
          }
          onClick={onActionClick}
        >
          {actionLabel}
        </p>
      )}
    </div>
  )
}

UserData.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  actionLabel: PropTypes.string.isRequired,
  onActionClick: PropTypes.func,
}

export default UserData
