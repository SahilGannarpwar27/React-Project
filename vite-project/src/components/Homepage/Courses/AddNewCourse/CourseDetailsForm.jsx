import InputFieldSecondary from '../../../../common/InputFieldSecondary'
import { Strings } from '../../../../constants/Strings'
import PropTypes from 'prop-types'

const CourseDetailsForm = ({ register, isEditMode }) => {
  return (
    <form>
      <div className="flex items-start space-x-4">
        <InputFieldSecondary
          className="w-1/3"
          htmlFor="Title"
          value={Strings.title}
          type="text"
          id="Title"
          register={register('title')}
        />
        <InputFieldSecondary
          className="w-1/3"
          htmlFor="Category"
          value={Strings.category}
          type="select"
          id="Category"
          register={register('category')}
        >
          <option value=""></option>
          <option value="Training">{Strings.trainings}</option>
          <option value="Compliance">{Strings.compliance}</option>
          <option value="Learning">{Strings.learning}</option>
        </InputFieldSecondary>
        <InputFieldSecondary
          className="w-1/3"
          htmlFor="Status"
          value={Strings.status}
          type="select"
          id="Status"
          register={register('status')}
        >
          <option value=""></option>
          <option value="Draft">{Strings.draft}</option>
          <option value="Active" disabled={!isEditMode}>
            {Strings.active}
          </option>
          <option value="Inactive" disabled={!isEditMode}>
            {Strings.inactive}
          </option>
        </InputFieldSecondary>
      </div>
    </form>
  )
}

CourseDetailsForm.propTypes = {
  isEditMode: PropTypes.bool,
}

export default CourseDetailsForm
