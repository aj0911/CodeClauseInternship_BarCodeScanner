import { View, Text } from 'react-native'
import React, { useState } from 'react'
import Home from './Screens/HomeScreen/Home'
import SafeAreaViewAndroid from './Components/SafeAreaViewAndroid'
import IndexStyleSheet from './Index.Style'
import Toast from 'react-native-toast-message'
import Screen from './assets/Screen'
import QR from './Screens/QRGeneratorScreen/QR'

const Index = () => {
  const [screen,setScreen] = useState(Screen.HOME_SCREEN)
  return (
    <View style={IndexStyleSheet.index}>
      <SafeAreaViewAndroid Component={(screen===Screen.HOME_SCREEN)?Home:QR} setScreen={setScreen}/>
      <Toast/>
    </View>
  )
}

export default Index