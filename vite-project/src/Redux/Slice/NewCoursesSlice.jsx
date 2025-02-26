import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import API from '../../api/Api'

export const coursesList = createAsyncThunk('courses/coursesList', async () => {
  try {
    const response = await API.get('/course-list/')
    console.log('response slice : ', response)
    return response?.data?.results || []
  } catch (error) {
    return error
  }
})

const NewCoursesSlice = createSlice({
  name: 'newCourses',
  initialState: {
    status: 'idle',
    error: null,
    data:[],
    filteredData:[],

  },
  extraReducers: (builder) => {
    builder
      .addCase(coursesList?.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(coursesList?.fulfilled, (state) => {
        console.log('Succeed ')
        state.status = 'succeeded'
        state.error = null
      })
      .addCase(coursesList?.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
        console.log(state.error)
      })
  },
})

export default NewCoursesSlice.extraReducers
