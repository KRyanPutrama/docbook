import { apiHost } from './constant'
import { Dimensions } from 'react-native'

export const fetchApi = ({ uri, data, method} : {uri: string, data?: any, method: string}) => {
  const config : RequestInit = {
    headers: {
      'x-api-key': 'c1638a23-f723-447a-ac55-13b85ffdaf45',
      'Content-Type': 'application/json',
      'Accept':'application/json',
    },
    method,
  }

  if (data) {
    config.body = JSON.stringify(data)
  }

  return fetch(apiHost + uri, config)
}


export const responsiveWidth = (number: number) =>  Dimensions.get('window').width * (number / 100)
export const responsiveHeight = (number: number) =>  Dimensions.get('window').height * (number / 100)
export const responsiveFontSize = (number: number) => Dimensions.get('window').fontScale * (number / 100)

export const arrayFrom = (start: number, end: number) => {
  if (start > end) return []

  let result = []
  for (let i = start; i <= end; i++) {
    result.push(i)
  }
  return result
}
