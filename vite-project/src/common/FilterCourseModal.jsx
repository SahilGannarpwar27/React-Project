import PropTypes from 'prop-types'

import ModalBackground from './ModalBackground'
import MultiRangeSliderDemo from './MultiRangeSliderDemo'

const FilterCourseModal = ({ setShowModal }) => {
  const handleCancel = () => {
    setShowModal(false)
  }
  return (
    <ModalBackground>
      <div>
        {/* Mandatory Section */}
        <div className="border-b pb-4 mb-4 text-left">
          <p className="font-medium mb-2">Mandatory</p>
          <div className="ml-2">
            <input type="radio" id="yes" value="yes" className="mr-1" />
            <label htmlFor="yes" className="mr-4">
              Yes
            </label>
            <input type="radio" id="no" value="no" className="mr-1" />
            <label htmlFor="no">No</label>
          </div>
        </div>

        {/* Category Section */}
        <div className="border-b pb-4 mb-4 text-left">
          <p className="font-medium mb-2">Category</p>
          <div className="ml-2">
            <input type="checkbox" id="training" value="training" className="mr-1" />
            <label htmlFor="training" className="mr-4">
              Training
            </label>
            <input type="checkbox" id="compliance" value="compliance" className="mr-1" />
            <label htmlFor="compliance" className="mr-4">
              Compliance
            </label>
            <input type="checkbox" id="learning" value="learning" className="mr-1" />
            <label htmlFor="learning">Learning</label>
          </div>
        </div>

        {/* Status Section */}
        <div className="border-b pb-4 mb-4 text-left">
          <p className="mb-2">Status</p>
          <div className="ml-2">
            <input type="checkbox" id="active" value="active" className="mr-1" />
            <label htmlFor="active" className="mr-4">
              Active
            </label>
            <input type="checkbox" id="inactive" value="inactive" className="mr-1" />
            <label htmlFor="inactive" className="mr-4">
              Inactive
            </label>
            <input type="checkbox" id="draft" value="draft" className="mr-1" />
            <label htmlFor="draft">Draft</label>
          </div>
        </div>

        {/* First Slider Section */}
        <div className="border-b text-left mb-4">
          <p>No of assignee</p>
          <MultiRangeSliderDemo />
        </div>

        {/* Second Slider Section */}
        <div className="border-b text-left">
          <p>Course duration (min)</p>
          <MultiRangeSliderDemo />
        </div>

        {/* Button Section */}
        <div className="flex justify-end mt-6 space-x-4">
          <button className="px-4 py-2 border border-gray-300" onClick={handleCancel}>
            Clear all
          </button>
          <button className="px-4 py-2 bg-custom-green text-white">Apply</button>
        </div>
      </div>
    </ModalBackground>
  )
}

FilterCourseModal.propTypes = {
    setShowModal : PropTypes.func.isRequired
} 

export default FilterCourseModal
