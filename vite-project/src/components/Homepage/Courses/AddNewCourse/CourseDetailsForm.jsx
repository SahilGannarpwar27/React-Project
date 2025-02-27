import PropTypes from 'prop-types'
import CourseSelectField from '../../../../common/CourseSelectField'
import CoursesInputField from '../../../../common/CoursesInputField'
import { Strings } from '../../../../constants/Strings'
import { courseCategoryOptions } from '../../../../constants/Options'

const CourseDetailsForm = ({ register, isEditMode }) => {
  return (
    <form>
      <div className="flex items-start space-x-4">
        <CoursesInputField
          className="w-1/3"
          htmlFor="Title"
          value={Strings.title}
          id="Title"
          register={register('title')}
        />
        <CourseSelectField
          className="w-1/3"
          htmlFor="Category"
          value={Strings.category}
          id="Category"
          register={register('category')}
          options={courseCategoryOptions}
        />
        <CourseSelectField
          className="w-1/3"
          htmlFor="Status"
          value={Strings.status}
          type="select"
          id="Status"
          register={register('status')}
          options={[
            { value: '', label: '' },
            { value: 'Draft', label: Strings.draft },
            { value: 'Active', label: Strings.active, disabled: !isEditMode },
            { value: 'Inactive', label: Strings.inactive, disabled: !isEditMode },
          ]}
        />
      </div>
    </form>
  )
}

CourseDetailsForm.propTypes = {
  isEditMode: PropTypes.bool,
  register: PropTypes?.object?.isRequired,
}

export default CourseDetailsForm
