import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';


import { Feather, MaterialIcons } from '@expo/vector-icons'

import { colors, fonts, metrics } from '../constants';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default CustomInput = props => {

  const { hasError, rounded, bordered, raised, type, icon, ...rest } = props
  const [secureText, setSecureText] = useState(false)

  const containerStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: metrics.baseMargin,
    elevation: raised ? 5 : 0,
    width: '100%',
    height: 45,
    backgroundColor: colors.grayLight,
    borderWidth: bordered ? 2 : 0,
    borderColor: hasError ? 'red' : colors.grayMedium,
    borderRadius: rounded ? metrics.formInputRadius : metrics.baseRadius,
  }
  const inputStyle = {
    fontSize: fonts.input,
    height: '100%',
    flex: 1,
  }
  const labelStyle = {
    fontSize: 14,
    letterSpacing: 1.2,
    color: colors.white,
    marginVertical: 2
  }
  useEffect(() => {
    if (props.type === 'password')
      setSecureText(true)
  }, [])

  let inputType, iconName;
  switch (type) {
    case 'phone': { inputType = 'phone-pad', iconName = 'smartphone' }; break;
    case 'password': { inputType = 'default', iconName = 'lock' }; break;
    case 'name': { inputType = 'default', iconName = 'user' }; break;
    case 'email': { inputType = 'email-address', iconName = 'mail' }; break;
    case 'number': { inputType = 'numeric', iconName = 'smartphone' }; break;
    case 'search': { inputType = 'web-search', iconName = 'search' }; break;

    default: inputType = iconName = 'default';
  }

  const label = props.label ? <Text style={[labelStyle, props.labelStyle]}>{props.label}</Text> : null;
  const help = props.help ? <Text style={styles.helpText}>{props.help}</Text> : null;
  const error = props.hasError && props.error ? <Text style={styles.errorText}>{props.error}</Text> : null;

  return (
    <View style={props.containerStyle}>
      {label}
      <View style={[containerStyle, props.style]}>
        {
          iconName === 'default' ? null :
            iconName === 'search' ?
              <MaterialIcons style={styles.inputIcon} size={20} name={iconName} />
              :
              <Feather style={styles.inputIcon} name={iconName} />
        }
        <TextInput  {...rest}
          style={inputStyle}
          placeholderTextColor={colors.grayDark}
          keyboardType={inputType}
          autoCorrect={false}
          secureTextEntry={secureText}
          //onChangeText={value => props.onChange(value)}
          onChange={props.onChangeNative}
          AuthibilityLabel={props.label}
          ref={props.ref}
        />
        {
          props.type === 'password' ?
            <TouchableOpacity onPress={() => setSecureText(!secureText)}>
              {
                secureText ?
                  <Feather size={16} name='eye' />
                  :
                  <Feather size={16} name='eye-off' />
              }
            </TouchableOpacity>
            : null
        }
      </View>
      {error}
      {help}
    </View>
  )
}




const styles = StyleSheet.create({

  helpText: {
    alignSelf: 'center',
    fontSize: fonts.regular,
    color: colors.grayMedium,
  },
  errorText: {
    fontSize: fonts.regular,
    color: 'darkred',
    textAlign: 'right',
    marginRight: metrics.doubleBaseMargin
  },
  inputIcon: {
    fontSize: 20,
    marginRight: metrics.baseMargin
  }
})

