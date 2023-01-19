import { View, Text, TouchableWithoutFeedback, ScrollView, TextInput, Alert } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import moment from 'moment'
import { shallowEqual, useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '@/Redux/store'
import { arrayFrom, responsiveHeight, responsiveWidth } from '@/Utils/function'
import { Colors } from '@/Utils/Colors'
import { TitleComponent } from '@/Components'
import Animated, { LayoutAnimationsValues, withTiming } from 'react-native-reanimated'
import { SafeAreaView } from 'react-native-safe-area-context'
import { GetBookingData, postBooking, postBookingReset } from '@/Redux/bookingSlice'
import { navigateAndReset, navigateBack } from '@/Navigators/navigationRoot'



const IndexOfDetail = () => {
  const {
    doctorDetail,
    state,
    postBookingState,
  } = useSelector(({ doctor, booking }: RootState) => ({
    doctorDetail: doctor.detailDoctorData,
    state: doctor.detailState,

    postBookingState: booking.postBookingState,
  }), shallowEqual)

  const [selectedTimeslot, setSelectedTimeslot] = useState({
    key: moment().format('ddd').toUpperCase() as string,
    date: moment().format('YYYY-MM-DD'),
    start: 0,
  })
  const [isCollapsed, setIsCollapsed] = useState(true)
  const [patientName, setPatientName] = useState('')

  const dispatch = useAppDispatch()

  const bookingTimeslot = useMemo(() => {
    const timeslot: Record<string, any> = {}
    let days: Record<string,any> = {}

    // assuming weekday start from sun (0) end to sat (6)
    const daysRefIndex : any = {
      'SUN': 0,
      'MON': 1,
      'TUE': 2,
      'WED': 3,
      'THU': 4,
      'FRI': 5,
      'SAT': 6,
    }

    doctorDetail?.opening_hours.forEach((item) => {
      let {day, end, start} = item
      const itemDayIndex  = moment().format('ddd').toUpperCase()
      days[day] = moment().weekday(daysRefIndex[day] < daysRefIndex[itemDayIndex] ? daysRefIndex[day] + 7 : daysRefIndex[day]).format('ddd, DD-MM-YYYY')
      timeslot[day] = moment().format('ddd').toLowerCase() === day.toLowerCase() ? arrayFrom(moment().hour() + 1, parseInt(end, 10)) : arrayFrom(parseInt(start,10), parseInt(end, 10))
    })

    return {
      timeslot,
      days,
    }
  }, [doctorDetail])

  const layoutAnimateContainer = (values: LayoutAnimationsValues) => {
    'worklet'
    return {
      animations: {
        height: withTiming(values.targetHeight),
      },
      initialValues: {
        height: values.currentHeight,
      },
    }
  }

  const handleOnPress = () => {
    const data : GetBookingData = {
      date: selectedTimeslot?.date,
      id: '',
      doctorId: String(doctorDetail?.id),
      name: patientName,
      start: selectedTimeslot.start,
      status: '',
    }
    dispatch(postBooking(data))
  }

  useEffect(() => {
    if (postBookingState === 'fulfilled') {
      Alert.alert('Success', 'Booking is confirmed!', [
        {
          text: 'OK',
          onPress: () => {
            dispatch(postBookingReset())
            navigateAndReset([{ name: 'Dashboard', params: { screen: 'Booking'}}])
          },
        },
      ])
    }

    if (postBookingState === 'rejected') {
      Alert.alert('Oops Sorry', 'We cannot make booking at the moment, please try again later.', [
        {
          text: 'OK',
          onPress: () => {
            dispatch(postBookingReset())
          },
        },
      ])

    }
  }, [postBookingState])


  return (
    <SafeAreaView edges={['bottom', 'left', 'right']} style={{ flex: 1}}>
      <ScrollView style={{ flex: 1, backgroundColor: Colors.white, paddingHorizontal: responsiveWidth(4) }} >
        <View style={{ flex: 1, paddingBottom: responsiveHeight(10), marginTop: responsiveHeight(3)}}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableWithoutFeedback onPress={() => navigateBack()}>
              <View style={{ width: responsiveWidth(10), height: responsiveHeight(6), borderWidth: 1, borderRadius: responsiveWidth(20), marginRight: responsiveWidth(4)}}>
                <Text style={{ fontSize: 30, textAlign: 'center' }}>{'<'}</Text>
              </View>
            </TouchableWithoutFeedback>
            <Text style={{ fontSize: 24 }}>Detail Page</Text>
          </View>
          {state === 'fulfilled' ? (
            <View style={{ flex: 1}}>
              <View style={{ flexDirection: 'row',justifyContent: 'space-between', borderWidth: 1, marginVertical: responsiveHeight(2), padding: responsiveWidth(2)}}>
                <View>
                  <Text style={{ fontSize: 18}}>ID: {doctorDetail?.id}</Text>
                  <Text style={{ fontSize: 18}}>Name: {doctorDetail?.name}</Text>
                  <Text style={{ fontSize: 18}}>Description: {doctorDetail?.description || '-'}</Text>
                  <Text style={{ fontSize: 18}}>Address: {`\n\t${doctorDetail?.address.district}\n\t${doctorDetail?.address.line_1}\n\t${doctorDetail?.address.line_2}`}</Text>
                </View>
                <View style={{
                  borderWidth: 1,
                  borderRadius: responsiveWidth(20),
                  width: responsiveWidth(10),
                  height: responsiveHeight(6),
                  justifyContent:'center',
                  alignItems:'center',
                }}>
                  <Text style={{ fontSize: 20 }}>{doctorDetail?.name.substring(0, 1).toUpperCase()}</Text>
                </View>
              </View>

              <Animated.View
                layout={layoutAnimateContainer}
                style={{
                  borderWidth: 1,
                  height: !isCollapsed ? responsiveHeight(100) : responsiveHeight(10),
                  overflow: 'hidden',
                }}>
                <TouchableWithoutFeedback onPress={() => setIsCollapsed((prev) => !prev)}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems:'center', padding: responsiveWidth(3)}}>
                    <View style={{ justifyContent: 'center'}}>
                      <Text style={{ fontSize: 24}}>Make Booking</Text>
                    </View>
                    <View style={{ width: responsiveWidth(9), height: responsiveHeight(5), alignItems: 'center', justifyContent: 'center'}}>
                      <Text style={{ fontSize: 24}}>
                        {isCollapsed ? '+' : '-'}
                      </Text>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
                <View style={{ marginTop: responsiveHeight(2), paddingHorizontal: responsiveWidth(2)}}>
                  <View style={{ marginBottom: responsiveHeight(2)}}>
                    <Text style={{ fontSize: 18}}>Enter Patient Name <Text style={{ fontSize: 14, color: 'red' }}>*Required</Text></Text>
                    <TextInput value={patientName} placeholder="John Doe" onChangeText={(e) => setPatientName(e)} style={{ borderWidth: 1}}/>
                  </View>
                  <TitleComponent text="Select Day" />
                  <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center'}}>
                    {bookingTimeslot && Object.entries(bookingTimeslot?.days).map(([key, value]) => (
                      <TouchableWithoutFeedback onPress={() => setSelectedTimeslot((prev) => ({
                        ...prev,
                        key,
                        date: moment(value, 'ddd, DD-MM-YYYY').format('YYYY-MM-DD'),
                        start: 0,
                      }))}>
                        <View style={{
                          padding: responsiveWidth(2),
                          margin: responsiveWidth(2) ,
                          borderWidth: 1,
                          backgroundColor: selectedTimeslot?.key === key ? Colors.raspberry : Colors.white,
                        }}>
                          <Text style={{ color: selectedTimeslot?.key === key ? Colors.white : 'black' }}>{value}</Text>
                        </View>
                      </TouchableWithoutFeedback>
                    ))}

                  </View>
                  <TitleComponent text="Select Timeslot" />
                  <View style={{ alignItems: 'center', marginTop: responsiveHeight(1)}}>
                    <View style={{ height: responsiveHeight(20) ,flexWrap: 'wrap', alignItems: 'center'}}>
                      {bookingTimeslot?.timeslot?.[selectedTimeslot?.key].length === 0 ? (
                        <View>
                          <Text>No timeslot available</Text>
                        </View>
                      ) : (
                        <>
                          {bookingTimeslot?.timeslot?.[selectedTimeslot?.key].map((number: number) => (
                            <TouchableWithoutFeedback onPress={() => setSelectedTimeslot((prev) => ({
                              ...prev,
                              start: number,
                            }))}>
                              <View style={{
                                borderWidth: 1,
                                paddingVertical: responsiveHeight(1),
                                paddingHorizontal: responsiveWidth(4),
                                margin: responsiveWidth(1),
                                backgroundColor: selectedTimeslot?.start === number ? Colors.raspberry : Colors.white,
                              }}>
                                <Text style={{ color: selectedTimeslot?.start === number ? Colors.white : 'black'}}>{moment(number, 'HH').format('HH:mm') }</Text>
                              </View>
                            </TouchableWithoutFeedback>
                          ))}
                        </>
                      )}
                    </View>
                  </View>
                  <TouchableWithoutFeedback disabled={selectedTimeslot.start === 0 || patientName === ''} onPress={handleOnPress}>
                    <View style={{
                      backgroundColor: selectedTimeslot.start === 0 || patientName === '' ? 'gray' : Colors.raspberry,
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: responsiveWidth(2),
                      marginVertical: responsiveHeight(4),
                      borderRadius: responsiveWidth(2),
                    }}>
                      <Text style={{ fontSize: 20, fontWeight: 'bold', color: Colors.white}}>Make Appointment</Text>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              </Animated.View>
            </View>
          ) : (
            <View>
              <Text>LOADING</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default IndexOfDetail
