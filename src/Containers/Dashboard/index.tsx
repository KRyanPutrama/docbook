import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeContainer from './Home'
import BookingContainer from './Bookings'

const BottomTab = createBottomTabNavigator()

const IndexOfDashboard = () => {
  return (
    <BottomTab.Navigator screenOptions={{
      headerShown: false,
    }}>
      <BottomTab.Screen name={'Home'} component={HomeContainer} options={{
        tabBarLabel: 'Home',
      }}/>
      <BottomTab.Screen name={'Booking'} component={BookingContainer} options={{
        tabBarLabel: 'Booking',
      }}/>
    </BottomTab.Navigator>
  )
}

export default IndexOfDashboard
