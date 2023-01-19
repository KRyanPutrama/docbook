import { View, Text } from 'react-native'
import React from 'react'
import { responsiveWidth } from '@/Utils/function'

type Props = {
  text: string
}

const Title = ({ text }: Props) => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center'}}>
      <Text style={{ fontSize: 18, fontWeight: 'bold', paddingRight: responsiveWidth(4)}}>{text}</Text>
      <View style={{flex: 1, borderWidth: 1, height: 0}}/>
    </View>
  )
}

export default Title
