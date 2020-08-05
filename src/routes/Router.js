import React, { useContext, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from "@react-navigation/stack"
import { StatusBar } from 'react-native';
import { colors } from '../constants'
import { AuthNavigation, MainNavigation } from './MainNavigation'
import { LoadingSpin } from '../components'

import AuthContext from '../contexts/auth/auth-context'
 
export default Router = () => {

  const { isLogged, isLoading, token, retrieveToken } = useContext(AuthContext)

  useEffect(() => {
    const bootstrapAsync = async () => {
      retrieveToken()
    };
    bootstrapAsync()
  }, []);
 
  const RootStack = createStackNavigator()
  return (
    <NavigationContainer>
      <StatusBar barStyle='light-content' backgroundColor={colors.primaryDark} />
      <>
        {
          <RootStack.Navigator screenOptions={{ headerShown: false }}>
            {
              isLoading ? (<RootStack.Screen name="Splash" component={LoadingSpin} />)
                : isLogged ? (<RootStack.Screen name="main" component={MainNavigation} />)
                  : (<RootStack.Screen name="auth" component={AuthNavigation} options={{
                    animationTypeForReplace: !isLogged ? 'pop' : 'push',
                  }} />)
            }
          </RootStack.Navigator>
        }
      </>
    </NavigationContainer>

  );
}