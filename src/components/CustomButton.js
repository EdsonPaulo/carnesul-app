import React from 'react'
import { View, TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native'
import { colors, metrics, fonts } from '../constants'

const CustomButton = props => {
    const { rounded, primary, title, onPress, style, loading } = props

    return (
        <TouchableOpacity activeOpacity={0.6} disabled={loading || false} onPress={onPress} style={[styles.buttonContainer, style, {
            backgroundColor: primary ? colors.accent : colors.grayLight,
            borderRadius: rounded ? metrics.formInputRadius : metrics.baseRadius,
        }]}>
            <View />
            <Text style={[styles.textStyle, { color: primary ? colors.grayLight : colors.grayDark2 }]}>
                {title}
            </Text>
            {
                loading ? <ActivityIndicator color={colors.grayLight} size='small' /> : <View />
            }
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
      //  flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        elevation: 3,
        height: 40,
        paddingHorizontal: metrics.doubleBaseMargin,
        marginVertical: metrics.baseMargin,
        borderColor: colors.primary,
    },
    textStyle: {
        textTransform: 'capitalize',
        letterSpacing: 1.1,
        fontFamily: 'Lato',
        textAlign: 'center'
    }
})

export default CustomButton