import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from "@react-navigation/stack"
import { createDrawerNavigator } from "@react-navigation/drawer"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { StatusBar } from 'react-native'
import { colors } from '../constants'
import HomeTabBar from '../components/HomeTabBar'
import SideBar from '../components/SideBar'

import {
  Landing,
  Login,
  SignUp,
  Forgot,
  HomePage,
  Category,
  CartPage,
  Wishlist,
  ProfilePage,
  SearchPage,
  Orders,
  Checkout,
  ProductDetails
} from '../screens'


const HomeTabs = () => {
  const Tabs = createBottomTabNavigator()
  return (
    <Tabs.Navigator initialRouteName='home' animationEnabled={true}
      tabBar={props => <HomeTabBar {...props} />}
      screenOptions={({ route }) => { { } }}>
      <Tabs.Screen name="home" component={HomePage} options={{ tabBarLabel: 'Início' }} />
      <Tabs.Screen name="category" component={Category} options={{ tabBarLabel: 'Categorias' }} />
      <Tabs.Screen name="cart" component={CartPage} options={{ tabBarLabel: 'Carrinho' }} />
      <Tabs.Screen name="wishlist" component={Wishlist} options={{ tabBarLabel: 'Favoritos' }} />
    </Tabs.Navigator>
  )
}


/**
const HomeNavigation = () => {
  const HomeStackNavigator = createStackNavigator()
  return (
    <HomeStackNavigator.Navigator screenOptions={{ headerShown: false, animationEnabled: true }}
      initialRouteName="homeTabs">
      <HomeStackNavigator.Screen name="homeTabs" component={HomeTabs} />
      <HomeStackNavigator.Screen name="checkout" component={Checkout} />
      <HomeStackNavigator.Screen name="search" component={SearchPage} />
      <HomeStackNavigator.Screen name="orders" component={Orders} />
      <HomeStackNavigator.Screen name="profile" component={ProfilePage} />
      <HomeStackNavigator.Screen name="receipt" component={CartPage} />
    </HomeStackNavigator.Navigator>
  )
}
 */

const DrawerNavigation = () => {
  const Drawer = createDrawerNavigator()
  return (
    <Drawer.Navigator drawerType="slide" drawerContent={props => <SideBar {...props} />}>
      <Drawer.Screen name="homeTabs" component={HomeTabs} />
    </Drawer.Navigator>
  )
}

const MainNavigation = () => {
  const MainStack = createStackNavigator()
  return (
    <MainStack.Navigator screenOptions={{ headerShown: false, animationEnabled: true }} initialRouteName="drawer" >
      <MainStack.Screen name="drawer" component={DrawerNavigation} />
      <MainStack.Screen name="checkout" component={Checkout} />
      <MainStack.Screen name="product" component={ProductDetails} />
      <MainStack.Screen name="orders" component={Orders} />
      <MainStack.Screen name="profile" component={ProfilePage} />
      <MainStack.Screen name="search" component={SearchPage} />
      <MainStack.Screen name="receipt" component={CartPage} />
    </MainStack.Navigator>
  )
}

const AuthNavigation = () => {
  const AuthStack = createStackNavigator()
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false, animationEnabled: true, mode: "modal", }}>
      <AuthStack.Screen name="landing" component={Landing} />
      <AuthStack.Screen name="login" component={Login} />
      <AuthStack.Screen name="signup" component={SignUp} />
      <AuthStack.Screen name="forgot" component={Forgot} />
    </AuthStack.Navigator>
  )
}


export default Router = () => {
  //ler token do asyncStorage
  const token = 'null'
  return (
    <NavigationContainer>
      <StatusBar barStyle='light-content' backgroundColor={colors.primaryDark} />
      {
        !token ?
          <AuthNavigation />
          :
          <MainNavigation />
      }

    </NavigationContainer>
  )
}