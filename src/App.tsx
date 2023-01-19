import React from 'react'
import {
  StatusBar,
  useColorScheme,
} from 'react-native'
import { Provider } from 'react-redux'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { ApplicationNavigators } from './Navigators'
import store from '@/Redux/store'



const App = () => {
  const isDarkMode = useColorScheme() === 'dark'


  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <ApplicationNavigators />
      </Provider>
    </SafeAreaProvider>
  )
}



export default App
