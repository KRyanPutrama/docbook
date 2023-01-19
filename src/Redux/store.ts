import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import doctorSlice from './doctorSlice'
import bookingSlice from './bookingSlice'


const store = configureStore({
  reducer: {
    doctor: doctorSlice.reducer,
    booking: bookingSlice.reducer,
  },
})

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch

export type RootState = ReturnType<typeof store.getState>

export default store
