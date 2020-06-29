import * as React from 'react';
import { enableScreens } from 'react-native-screens'
import 'intl';
import 'intl/locale-data/jsonp/pt-AO';
import { useFonts } from '@use-expo/font'
import { AppLoading } from 'expo'
//import { SafeAreaProvider } from 'react-native-safe-area-context';


import Router from './src/routes/RootNavigation'
import GlobalState from './src/context/GlobalState';
import { View, Text } from 'react-native';

export default function App() {

  enableScreens()

  let [fontsLoaded] = useFonts({
    'Soviet': require('./src/assets/fonts/Soviet.ttf'),
    'Lato': require('./src/assets/fonts/Lato.ttf')
  })

  if (!fontsLoaded)
    return <AppLoading />

  return (
    <GlobalState>
      {/** <SafeAreaProvider>*/}

      <Router />

      {/** </SafeAreaProvider>*/}
    </GlobalState>
  )
}