import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';

import { colors } from '../constants'

const LoadingSpin = ({text}) => {

    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <ActivityIndicator size="large" color={colors.primaryDark} />
            <Text style={{ fontSize: 16 }}> {text || "Carregando.."}</Text>
        </View>
    )
}


export default LoadingSpin