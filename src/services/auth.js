import { AsyncStorage } from 'react-native';
import { constants } from '../constants'

export const onSignIn = (token) => AsyncStorage.setItem(constants.TOKEN_KEY, token);

export const onSignOut = () => AsyncStorage.removeItem(constants.TOKEN_KEY);

export const isSignedIn = async () => {
  const token = await AsyncStorage.getItem(constants.TOKEN_KEY);

  return (token !== null)
};