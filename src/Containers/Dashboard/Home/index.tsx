import { useAppDispatch } from '@/Redux/store'
import React, { useEffect } from 'react'
import {
  Text,
  View,
  FlatList,
  RefreshControl,
} from 'react-native'
import { shallowEqual, useSelector } from 'react-redux'
import type { RootState } from '@/Redux/store'
import { fetchDoctors } from '@/Redux/doctorSlice'
import DoctorCard from './components/Card'
import { Colors } from '@/Utils/Colors'
import { responsiveHeight, responsiveWidth } from '@/Utils/function'
import moment from 'moment'



const IndexOfHome = () => {
  const {
    doctorData,
    state,
  } = useSelector(({ doctor }: RootState) => ({
    doctorData: doctor.doctorData,
    state: doctor.state,
  }), shallowEqual)


  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchDoctors())
  }, [])

  const greetBasedOnTime = () => {
    const currentHour = moment().hour()
    if (currentHour === 0 || currentHour < 12) return 'Good Morning'
    if (currentHour <= 17) return 'Good Afternoon'
    return 'Good Evening'
  }
  return (
    <View style={{
      backgroundColor: Colors.white,
    }}>
      <View style={{
        height: responsiveHeight(8),
        borderBottomLeftRadius: responsiveWidth(10),
        borderBottomRightRadius: responsiveWidth(10),
        backgroundColor: Colors.raspberry,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <Text style={{ color: Colors.white, fontSize: 24, fontWeight: 'bold'}}>{`${greetBasedOnTime()}`}</Text>
      </View>
      <FlatList
        data={doctorData}
        renderItem={({ item }) => (
          <DoctorCard data={item}/>
        )}
        refreshing={state === 'loading'}
        onRefresh={() => (
          <RefreshControl
            refreshing={state === 'loading'}
            onRefresh={() => {
              dispatch(fetchDoctors())
            }}
            colors={[Colors.raspberry]}
          />
        )}
        contentContainerStyle={{ alignItems: 'center', paddingVertical: responsiveHeight(5)}}
        ListEmptyComponent={() => (<Text>NO DATA</Text>)}
      />
    </View>
  )
}

export default IndexOfHome
