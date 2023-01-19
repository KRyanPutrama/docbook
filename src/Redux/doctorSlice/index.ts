import { fetchApi } from '@/Utils/function'
import { createAsyncThunk, createSlice, isRejectedWithValue } from '@reduxjs/toolkit'

interface InitialState {
  doctorData: GetDoctorData[] | []
  detailDoctorData: GetDoctorData | null
  state: 'idle' | 'loading' | 'fulfilled' | 'rejected'
  detailState: 'idle' | 'loading' | 'fulfilled' | 'rejected'
}

export type GetDoctorData = {
  id: string,
  name: string,
  description: string,
  address: {
    line_1: string,
    line_2: string,
    district: string
  },
  opening_hours: [
    {
      start: string,
      end: string,
      isClosed: true,
      day: 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT' | 'SUN'
    }
  ]
}

const initialState: InitialState = {
  doctorData: [],
  detailDoctorData: null,
  state: 'idle',
  detailState: 'idle',
}

const doctorSlice = createSlice({
  initialState,
  name: 'doctor',
  reducers: {
    doctorDetailReset: (state) => {
      state.detailDoctorData = null
      state.detailState = 'idle'
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchDoctors.pending, (state,) => {
        state.state = 'loading'
      })
      .addCase(fetchDoctors.fulfilled, (state, action) => {
        state.doctorData = action.payload
        state.state = 'fulfilled'
      })
      .addCase(fetchDoctors.rejected, (state,) => {
        state.state = 'rejected'
      })
      .addCase(fetchDoctorsDetail.pending, (state) => {
        state.detailDoctorData = null
        state.detailState = 'loading'
      })
      .addCase(fetchDoctorsDetail.fulfilled, (state, action) => {
        state.detailDoctorData = action.payload
        state.detailState = 'fulfilled'
      })
      .addCase(fetchDoctorsDetail.rejected, (state) => {
        state.detailState = 'rejected'
      })
  },
})


export const fetchDoctors = createAsyncThunk('doctor/fetchDoctors', async () => {
  const response = await fetchApi({ uri: 'doctor', method: 'GET'})
  return await response.json()
})

export const fetchDoctorsDetail = createAsyncThunk('doctor/fetchDocotrsDetail', async (id: any) => {
  const response = await fetchApi({ uri: `doctor/${id}`, method: 'GET'})
  if (response.status === 200) {
    return await response.json()
  }
  return isRejectedWithValue(await response.json())
})


export const { doctorDetailReset } = doctorSlice.actions
export default doctorSlice
