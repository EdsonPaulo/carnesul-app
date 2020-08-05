import React, { useState } from 'react';

import { View, Image, Animated, ActivityIndicator } from 'react-native';
import { colors } from '../constants';

export default PlaceholderImage = props => {

  const [opacity] = useState(new Animated.Value(0))
  const { style } = props

  const onLoad = event => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true
    }).start();
  }

  return (
    <View style={{
      backgroundColor: '#EEE',
      width: style?.width || '100%',
      height: style?.height || '100%',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <ActivityIndicator color={colors.primary} size="small" />
      <Animated.Image {...props} resizeMode="cover"
        style={[style, { position: 'absolute', opacity: opacity }]}
        onLoad={onLoad} />
    </View>
  )
}