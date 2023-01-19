/**
 * @see https://reactnavigation.org/docs/navigating-without-navigation-prop/
 * for more information
 */

import { CommonActions, NavigationContainerRef } from '@react-navigation/native'
import * as React from 'react'

export const navigationRef = React.createRef<NavigationContainerRef<any>>()

export const navigate = (name: string, params?: Record<string, any> | null) => {
  navigationRef?.current?.navigate(name, params)
}

export const navigateBack = (cannotGoBackCallback?: () => void) => {
  if (navigationRef?.current?.canGoBack()) {
    navigationRef.current.goBack()
  } else {
    cannotGoBackCallback?.()
  }
}

export const navigateAndReset = (routes: { name: string, params?: Record<string, any>}[], index = 0) => {
  navigationRef?.current?.dispatch(
    CommonActions.reset({ index, routes })
  )
}

