
import React, { useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

import { colors, metrics, fonts } from '../constants';
import ShopContext from '../contexts/shop/shop-context'

const HomeTabBar = ({ state, descriptors, navigation }) => (

  <View style={{
    flexDirection: 'row',
    height: metrics.tabBarHeight,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: metrics.doubleBaseMargin,
    borderTopWidth: 1,
    borderTopColor: colors.grayLight
  }}>
    {
      state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel
        const isFocused = state.index === index;
        const context = (route.name === 'cart') ? useContext(ShopContext) : null

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          })

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        }

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          })
        }

        const getCartSize = () => {
          let size = 0
          context.cart.map(item => size += item.quantity)
          return size
        }

        let iconName;

        if (route.name === 'home')
          iconName = 'shopping-bag';
        else if (route.name === 'cart')
          iconName = 'shopping-cart';
        else if (route.name === 'profile')
          iconName = 'user';
        else if (route.name === 'wishlist')
          iconName = 'heart';
        else if (route.name === 'category')
          iconName = 'grid';

        return (
          <TouchableOpacity key={route.key}
            activeOpacity={0.5}
            accessibilityRole="button"
            accessibilityStates={isFocused ? ['selected'] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
          >
            <View style={{
              width: 55,
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {
                (route.name === 'cart') ?

                  <View style={{
                    backgroundColor: colors.primaryDark,
                    position: 'absolute',
                    borderRadius: 15,
                    height: 15,
                    width: 15,
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 1,
                    right: 4,
                    top: 4
                  }}>
                    <Text style={{ color: colors.white, fontSize: 10 }}>{getCartSize()}</Text>
                  </View>
                  : null

              }
              <Feather name={iconName} style={{ color: isFocused ? colors.accent : colors.grayDark }} size={25} />
              <Text style={{ fontSize: fonts.small, color: isFocused ? colors.accent : colors.grayDark }}>{label}</Text>
            </View>
          </TouchableOpacity>
        );
      })}
  </View>
);

export default HomeTabBar