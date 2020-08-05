import 'react-native-gesture-handler'
import React from 'react'
import { enableScreens } from 'react-native-screens'
enableScreens()
import 'intl'
import 'intl/locale-data/jsonp/pt-AO'
import { useFonts } from '@use-expo/font'
import { AppLoading } from 'expo'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AuthProvider from './src/contexts/auth/auth-provider'


import Router from './src/routes/Router'

export default function App() {

  let [fontsLoaded] = useFonts({
    'Soviet': require('./src/assets/fonts/Soviet.ttf'),
    'Lato': require('./src/assets/fonts/Lato.ttf')
  })

  if (!fontsLoaded)
    return <AppLoading />

  return (
    <AuthProvider>
      <SafeAreaProvider>
        <Router />
      </SafeAreaProvider>
    </AuthProvider>
  )
}