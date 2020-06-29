import React from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { colors, metrics, fonts } from '../constants'

const CustomButton = props => {
    const { rounded, primary, title, onPress, style } = props

    return (
        <TouchableOpacity activeOpacity={0.6} onPress={onPress} style={[styles.buttonContainer, style, {
            backgroundColor: primary ? colors.accent : colors.grayLight,
            borderRadius: rounded ? metrics.formInputRadius : metrics.baseRadius,
        }]}>
            <Text style={[styles.textStyle, { color: primary ? colors.grayLight : colors.grayDark2 }]}>
                {title}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 3,
        height: 40,
        marginVertical: metrics.baseMargin,
        borderColor: colors.primary,
    },
    textStyle: {
        textTransform: 'capitalize',
        fontSize: 16,
        letterSpacing: 1.1,
        fontFamily: 'Lato',
        textAlign: 'center'
    }
})

export default CustomButton