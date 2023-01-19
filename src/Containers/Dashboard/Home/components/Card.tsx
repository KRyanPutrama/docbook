import { responsiveWidth, responsiveHeight } from '@/Utils/function'
import React, { useState, useMemo } from 'react'
import { View, TouchableWithoutFeedback, Text } from 'react-native'
import Animated, { LayoutAnimationsValues, withTiming  } from 'react-native-reanimated'
import { Colors } from '@/Utils/Colors'
import { fetchDoctorsDetail, GetDoctorData } from '@/Redux/doctorSlice'
import { navigate } from '@/Navigators/navigationRoot'
import { useAppDispatch } from '@/Redux/store'

type Props = {
  data: GetDoctorData
}

const DoctorCard = ({ data } : Props) => {
  const { id, address, description, name, opening_hours } = data
  const [cardState, setCardState] = useState(false)

  const dispatch = useAppDispatch()

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

  const layoutAnimateButton = (values: LayoutAnimationsValues) => {
    'worklet'
    return {
      animations: {
        originY: withTiming(values.targetOriginY),
      },
      initialValues: {
        originY: values.currentOriginY,
      },
    }
  }

  const openingHoursFormat = useMemo(() => {
    const filterClosed = opening_hours?.filter((item) => !item.isClosed)

    const obj: { startHours?: string[], days?: string[], endHours?: string[] } = {
      startHours: [...new Set(filterClosed?.map((item) => item.start))],
      endHours: [...new Set(filterClosed?.map((item) => item.end))],

    }
    // sort the days based on daysRef
    const daysRef = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']
    obj.days = filterClosed?.map((item) => item.day).sort((a ,b) => daysRef.indexOf(a) - daysRef.indexOf(b))

    return obj
  }, [opening_hours])

  return (

    <Animated.View
      key={`card-${id}`}
      layout={layoutAnimateContainer}
      style={{
        width: responsiveWidth(80),
        borderWidth: 1,
        height: cardState ? responsiveHeight(44) : responsiveHeight(25),
        overflow: 'hidden',
        shadowColor: 'black',
        shadowOpacity: 1,
        shadowRadius: 2,
        elevation: 2,
        backgroundColor: Colors.white,
        borderRadius: responsiveWidth(5),
        marginBottom: responsiveHeight(5),
      }}>
      <View style={{ flexDirection: 'row', backgroundColor: Colors.lightRaspberry }}>
        <View style={{ width: responsiveWidth(10), height: responsiveHeight(6) ,borderWidth: 1, borderRadius: responsiveWidth(50), justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{fontSize: 24, fontWeight: 'bold'}}>{name?.substring(0, 1).toUpperCase()}</Text>
        </View>
        <View style={{ paddingLeft: responsiveWidth(2), justifyContent: 'center'}}>
          {/* <Text>{id}</Text> */}
          <Text style={{ fontSize: 24}}>{name}</Text>
        </View>
      </View>
      <View style={{ paddingLeft: responsiveWidth(12)}}>
        <Text>Description: {description || '-'}</Text>
        <Text>Address: </Text>
        <Text>{address?.district}</Text>
        <Text>{address?.line_1}</Text>
        <Text>{address?.line_2}</Text>
      </View>

      <View style={{ borderTopWidth: 1, paddingLeft: responsiveWidth(12), marginTop: responsiveHeight(1), paddingTop: responsiveHeight(1) }}>
        <Text>Schedule: </Text>
        <Text>
          {`days: ${openingHoursFormat.days?.map((day) => day + ' ')}`}
        </Text>
        <Text>
          Timeslot:
        </Text>
        {openingHoursFormat.startHours?.map((item, index) => (
          <Text key={`timeslot-${index}`}>{`${item} - ${openingHoursFormat.endHours?.[index]}`}</Text>
        ))}
        <TouchableWithoutFeedback onPress={() => {
          dispatch(fetchDoctorsDetail(id))
          navigate('Detail', { id })
        }}>
          <View style={{
            width: responsiveWidth(20),
            height: responsiveHeight(5),
            backgroundColor: Colors.raspberry,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: responsiveWidth(15),
            alignSelf: 'flex-end',
            marginRight: responsiveWidth(5),
          }}>
            <Text style={{ fontSize: 16, color: Colors.white }}>{'Details >>'}</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
      <TouchableWithoutFeedback onPress={() => setCardState((prev) => !prev)}>
        <Animated.View
          layout={layoutAnimateButton}
          style={{
            flex: 1,
            width: responsiveWidth(80),
            height: responsiveHeight(4),
            position: 'absolute',
            bottom: 0,
            backgroundColor: 'white',
            paddingHorizontal: responsiveWidth(5),
            flexDirection : 'row',
            justifyContent: 'flex-end',
            borderWidth: 1,
          }}
        >
          <Text>{cardState ? 'Collapse' : 'Expand'}</Text>
        </Animated.View>
      </TouchableWithoutFeedback>
    </Animated.View>
  )
}


export default DoctorCard
