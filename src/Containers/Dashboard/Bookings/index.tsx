import {
  View,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
  Alert,
  RefreshControl,
} from 'react-native'
import React, { useEffect } from 'react'
import { shallowEqual, useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '@/Redux/store'
import { fetchBooking, patchBooking, patchBookingReset } from '@/Redux/bookingSlice'
import { Colors } from '@/Utils/Colors'
import { responsiveHeight, responsiveWidth } from '@/Utils/function'
import moment from 'moment'

const IndexOfBookings = () => {
  const {
    bookingData,
    doctorData,
    state,

    patchBookingState,
  } = useSelector(({ booking, doctor }: RootState) => ({
    doctorData: doctor.doctorData,
    bookingData: booking.bookingData,
    state: booking.bookingState,

    patchBookingState: booking.patchBookingState,
  }), shallowEqual)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchBooking())
  }, [])

  const doctorName = (item: any) => {
    const findDoctor = doctorData?.find((doctor) => item.doctorId === doctor.id ? item.name : '-' )
    return findDoctor?.name
  }

  const onCancelPress = (id: string) => {
    Alert.alert('Are you sure you want to cancel appointment?', '', [
      {
        text: 'Yes',
        onPress: () => {
          const data = {
            id,
            status: 'cancel',
          }
          dispatch(patchBooking(data))
        },
      },
      {
        text: 'No',
      },
    ])
  }

  useEffect(() => {
    if (patchBookingState === 'fulfilled') {
      Alert.alert('Appointment Canceled', undefined, [
        {
          text: 'OK',
          onPress: () => {
            dispatch(patchBookingReset())
            dispatch(fetchBooking())
          },
        },
      ])
    }

    if (patchBookingState === 'rejected') {
      Alert.alert('Oops, sorry', 'We cannot fulfill your request at the moment, please try again later.', [
        {
          text: 'OK',
          onPress: () => {
            dispatch(patchBookingReset())
          },
        },
      ])
    }

  }, [patchBookingState])

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: Colors.white, paddingHorizontal: responsiveWidth(5) }}
      refreshControl={(
        <RefreshControl
          refreshing={state === 'loading'}
          onRefresh={() => {
            dispatch(fetchBooking())
          }}
          colors={[Colors.raspberry]}
        />

      )}
    >
      {bookingData.map((item, index) => (
        <View
          key={`appointmentCard-${index}`}
          style={{
            borderWidth: 1,
            backgroundColor: Colors.white,
            margin: responsiveWidth(3),
            borderRadius: responsiveWidth(4),
          }}
        >
          <View style={{
            borderBottomWidth: 1,
            backgroundColor: Colors.lightRaspberry,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            borderTopLeftRadius: responsiveWidth(4),
            borderTopRightRadius: responsiveWidth(4),
          }}>
            <Text style={{ fontSize: 21, color: Colors.white}}>Appointment</Text>
            <Text style={{ color: Colors.white}}>#{item.doctorId}</Text>
          </View>

          <View style={{ padding: responsiveWidth(5)}}>
            <Text style={{ fontSize: 16}}>{`Doctor name: ${doctorName(item)}`}</Text>
            <Text style={{ fontSize: 16}}>Patient name: {item.name}</Text>
            <Text style={{ fontSize: 16}}>Start time: {moment(item.start, 'hh:mm').format('hh:mm A')}</Text>
            <Text style={{ fontSize: 16}}>Status: {item.status}</Text>
          </View>

          <TouchableWithoutFeedback onPress={() => onCancelPress(item.id)}>
            <View
              style={{
                borderWidth: 1,
                width: responsiveWidth(40),
                height: responsiveHeight(5),
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: responsiveWidth(10),
                alignSelf: 'flex-end',
                marginHorizontal: responsiveWidth(4),
                marginBottom: responsiveHeight(2),
                backgroundColor: Colors.raspberry,
              }}>
              <Text style={{ color: Colors.white }}>Cancel Appointment</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      ))}
    </ScrollView>
  )
}

export default IndexOfBookings
