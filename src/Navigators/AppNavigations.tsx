import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import MainNavigator from './Main'
import { navigationRef } from './navigationRoot'

const Stack = createNativeStackNavigator()

const AppNavigations = () => {
  return (
    <NavigationContainer
      ref={navigationRef}
    >
      <Stack.Navigator screenOptions={{
        headerShown: false,
      }}>
        <Stack.Screen name="Main" component={MainNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigations

