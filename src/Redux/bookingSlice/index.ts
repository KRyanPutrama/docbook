import { fetchApi } from '@/Utils/function'
import { createAsyncThunk, createSlice, isRejectedWithValue } from '@reduxjs/toolkit'

interface InitialState {
  bookingData: GetBookingData[] | []
  bookingState: 'idle' | 'loading' | 'fulfilled' | 'rejected'
  bookingDetailData: GetBookingData | null
  bookingDetailState: 'idle' | 'loading' | 'fulfilled' | 'rejected'

  postBookingState: 'idle' | 'loading' | 'fulfilled' | 'rejected'

  patchBookingState: 'idle' | 'loading' | 'fulfilled' | 'rejected'
}

export type GetBookingData = {
  id: string
  name: string
  start: number,
  doctorId: string
  date: string
  status?: 'cancel' | 'confirmed' | ''
}

const initialState: InitialState = {
  bookingData: [],
  bookingState: 'idle',
  bookingDetailData: null,
  bookingDetailState: 'idle',
  postBookingState: 'idle',
  patchBookingState: 'idle',
}

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    bookingDetailReset: (state) => {
      state.bookingDetailData = null
      state.bookingDetailState = 'idle'
    },
    postBookingReset: (state) => {
      state.postBookingState = 'idle'
    },
    patchBookingReset: (state) => {
      state.patchBookingState = 'idle'
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchBooking.pending, (state) => {
        // state.bookingData = []
        state.bookingState = 'loading'
      })
      .addCase(fetchBooking.fulfilled, (state, action) => {
        state.bookingState = 'fulfilled'
        state.bookingData = action.payload
      })
      .addCase(fetchBooking.rejected, (state) => {
        state.bookingState = 'rejected'
      })
      .addCase(fetchBookingById.pending, (state) => {
        state.bookingDetailData = null
        state.bookingDetailState = 'loading'
      })
      .addCase(fetchBookingById.fulfilled, (state, action) => {
        state.bookingDetailData = action.payload
        state.bookingDetailState = 'fulfilled'
      })
      .addCase(fetchBookingById.rejected, (state) => {
        state.bookingDetailState = 'rejected'
      })
      .addCase(postBooking.pending, (state) => {
        state.postBookingState = 'loading'
      })
      .addCase(postBooking.fulfilled, (state) => {
        state.postBookingState = 'fulfilled'
      })
      .addCase(postBooking.rejected, (state) => {
        state.postBookingState = 'rejected'
      })
      .addCase(patchBooking.pending, (state) => {
        state.patchBookingState = 'loading'
      })
      .addCase(patchBooking.fulfilled, (state) => {
        state.patchBookingState = 'fulfilled'
      })
      .addCase(patchBooking.rejected, (state) => {
        state.patchBookingState = 'rejected'
      })
  },
})

export const fetchBooking = createAsyncThunk('booking/fetchBooking', async () => {
  const response = await fetchApi({ uri: 'booking', method: 'GET' })
  if (response.status === 200) {
    return await response.json()
  }
  return isRejectedWithValue(await response.json())
})

export const fetchBookingById = createAsyncThunk('booking/fetchBookingById', async (id) => {
  const response = await fetchApi({ uri: `booking/${id}`, method: 'GET'})
  if (response.status === 200) {
    return await response.json()
  }
  return isRejectedWithValue(await response.json())
})

export const postBooking = createAsyncThunk('booking/postBooking', async (data: GetBookingData) => {
  const response = await fetchApi({ uri: 'booking', method: 'POST', data})
  if (response.status === 200 || response.status === 201) {
    return await response.json()
  }
  return isRejectedWithValue(await response.json())
})

export const patchBooking = createAsyncThunk('booking/patchBooking', async (data: { id: string, status: string }) => {
  const response = await fetchApi({ uri: `booking/${data.id}`, method: 'PATCH', data: { status: data.status }})
  if (response.status === 200 || response.status === 201) {
    return await response.json()
  }
  return isRejectedWithValue(await response.json())
})

export const { bookingDetailReset, postBookingReset, patchBookingReset } = bookingSlice.actions
export default bookingSlice
