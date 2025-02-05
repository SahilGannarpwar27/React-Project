import axios from 'axios'

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import Users from '../../utils/users.json'
import { API_ENDPOINTS } from '../../constants/APIConstants'

//CreateAyncThunk
export const signInUser = createAsyncThunk('signIn/signInUser', async (formValues, { rejectWithValue }) => {
  try {
    const response = await axios.post(API_ENDPOINTS.LOGIN, formValues)
    return response?.data
  } catch (error) {
    console.log(error?.response?.data?.detail)
    return rejectWithValue(error?.response?.data?.detail || 'Invalid Email or Password')
  }
})

export const signUpUser = createAsyncThunk('signIn/signUpUser', async (formValues, { rejectWithValue }) => {
  try {
    const response = await axios.post(API_ENDPOINTS.SIGNUP, { ...formValues })
    console.log(response)
    return response?.data
  } catch (error) {
    console.log(error)
    return rejectWithValue(error?.response?.data?.email || error?.message)
  }
})

export const forgetPasswordUser = createAsyncThunk(
  'signIn/forgetPasswordUser',
  async (formValues, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_ENDPOINTS.FORGOT_PASSWORD, { ...formValues })
      console.log(response)
      return response
    } catch (error) {
      console.log(error)
      return rejectWithValue(error?.response?.data?.email || error.message || 'No account exists for this email.')
    }
  }
)
export const resetPasswordUser = createAsyncThunk(
  'signIn/resetPasswordUser',
  async ({ uidb64, formValues, headers }, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_ENDPOINTS.RESET_PASSWORD, { uidb64, ...formValues }, { headers })
      console.log(response)
      return response
    } catch (error) {
      console.log(error)
      return rejectWithValue(error?.response?.data?.message || error.message)
    }
  }
)
const SignInSlice = createSlice({
  name: 'signIn',
  initialState: {
    stateUsers: [...Users],
    isAuthenticated: false,
    user: null,
    error: null,
    authData: null,
    status: 'idle',
  },

  reducers: {
    setAuthData: (state, action) => {
      state.authData = action.payload
      console.log(state.authData)
    },

    logout: (state) => {
      state.isAuthenticated = false
      state.user = null
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(signInUser?.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.isAuthenticated = true
        state.user = action.payload
        state.error = null
      })
      .addCase(signInUser.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
        console.log(state.error)
        state.isAuthenticated = false
      })
      .addCase(signUpUser.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(signUpUser.fulfilled, (state) => {
        state.status = 'succeeded'
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.status = 'failed'
        console.log(action.payload)
      })
      .addCase(forgetPasswordUser.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(forgetPasswordUser.fulfilled, (state) => {
        state.status = 'succeeded'
      })
      .addCase(forgetPasswordUser.rejected, (state, action) => {
        state.status = 'failed'
        console.log(action.payload)
      })
      .addCase(resetPasswordUser.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(resetPasswordUser.fulfilled, (state) => {
        state.status = 'succeeded'
      })
      .addCase(resetPasswordUser.rejected, (state, action) => {
        state.status = 'failed'
        console.log(action.payload)
      })
  },
})

export const { logout, setAuthData } = SignInSlice.actions
export default SignInSlice.reducer
