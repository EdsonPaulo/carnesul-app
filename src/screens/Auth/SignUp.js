import React, { } from 'react'
import { Text, View, KeyboardAvoidingView, TouchableOpacity, Platform } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Icon from '@expo/vector-icons/Feather'

import CustomButton from '../../components/CustomButton'
import CustomInput from '../../components/CustomInput'
import { metrics } from '../../constants'
import styles from './styles'

const SignUp = () => {

    const navigation = useNavigation()

    return (
        <KeyboardAvoidingView style={styles.background} behavior={Platform.OS == "ios" ? "padding" : "height"}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon style={styles.iconHeader} name='chevron-left' />
            </TouchableOpacity>

            <View style={[, { padding: metrics.baseMargin, width: '100%' }]}>
                <Text style={styles.title}>Criar Conta</Text>
                <Text style={styles.subtitle}>Informe os seus dados para criar uma conta de cliente..</Text>

                <View style={{ width: '100%', marginTop: metrics.doubleBaseMargin }}>
                    <CustomInput name="name" type="name" placeholder="Nome de Usuário" />
                    <CustomInput style={{ marginVertical: 15 }} name="email" type="email" placeholder="Email" />
                    <CustomInput name="password" type="password" placeholder="Senha" />
                    <CustomInput style={{ marginVertical: 15 }} name="password" type="password" placeholder="Confirmar Senha" />

                    <CustomButton primary title="Criar Conta" onPress={() => { }} />
                </View>
            </View>

            <View style={{ width: '100%', marginTop: metrics.doubleBaseMargin }}>
                <Text style={styles.bottomText}>Já tens uma conta?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('login')}>
                    <Text style={[styles.bottomText, { fontWeight: 'bold' }]}>Fazer Login</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}
export default SignUp