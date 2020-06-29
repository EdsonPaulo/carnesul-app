import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { MaterialCommunityIcons, Ionicons, MaterialIcons } from '@expo/vector-icons'

import { colors, fonts, metrics } from '../constants'

const HeaderBar = props => {

  const { back, title, home, rightComponent } = props

  const navigation = useNavigation()

  const renderMenuButtom = () => (
    <TouchableOpacity style={styles.headerButton} onPress={() => navigation.toggleDrawer()}>
      <MaterialCommunityIcons name="text" color="white" size={25} />
    </TouchableOpacity>
  )

  const renderSearchButtom = () => (
    <TouchableOpacity style={styles.headerButton} onPress={() => navigation.navigate('search')}>
      <MaterialIcons name="search" color="white" size={25} />
    </TouchableOpacity>
  )

  return (
    <View style={[styles.headerContainerStyle, {elevation: props.raised ? 8 : 0 }]}>
      {
        home ?
          <View style={styles.btnContainer}>
            {renderMenuButtom()}
            <Text style={[styles.title, { fontSize: 28, fontFamily: 'Soviet' }]}> {title} </Text>
            {renderSearchButtom()}
          </View>
          :
          <View style={styles.btnContainer}>
            <View style={styles.btnContainer2}>
              {back ?
                <TouchableOpacity style={styles.headerButton} onPress={() => navigation.goBack()}>
                  <Ionicons name="ios-arrow-back" color="white" size={25} />
                </TouchableOpacity>

                : renderMenuButtom()
              }
              <Text style={styles.title}> {title} </Text>
            </View>
            {
              back ? <View />
                : 
                rightComponent ? rightComponent : renderSearchButtom()
            }
          </View>
      }
    </View>
  )
}

const styles = StyleSheet.create({

  headerContainerStyle: {
    //paddingTop: Platform.OS !== 'ios' ? 55 : 0,
    height: 55,
    width: '100%',
    backgroundColor: colors.primaryDark,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },

  btnContainer: {
    flexDirection: 'row',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  btnContainer2: {
    flexDirection: 'row',
    width: 'auto',
    height: '100%',
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: '900',
    textTransform: 'capitalize',
    letterSpacing: 0.4,
    fontFamily: 'Lato'
  }

})

export default HeaderBar