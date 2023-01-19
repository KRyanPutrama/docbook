import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { DashboardContainer, DetailContainer } from '@/Containers'

const Stack = createNativeStackNavigator()

const MainNavigator = () => {
  return (
    <>
      <Stack.Navigator screenOptions={{
        headerShown: false,
      }}>
        <Stack.Screen name="Dashboard" component={DashboardContainer} />
        <Stack.Screen name="Detail" component={DetailContainer} />
      </Stack.Navigator>
    </>
  )
}

export default MainNavigator
