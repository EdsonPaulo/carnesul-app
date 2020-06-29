import React, { } from 'react'
import { Text, View, KeyboardAvoidingView, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import Icon from '@expo/vector-icons/Feather'

import CustomButton from '../../components/CustomButton'
import CustomInput from '../../components/CustomInput';
import { metrics, fonts, colors } from '../../constants';
import styles from './styles'

const Login = () => {

    const navigation = useNavigation();

    return (
        <KeyboardAvoidingView style={styles.background}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon style={styles.iconHeader} name='chevron-left' />
            </TouchableOpacity>

            <View style={[{ padding: metrics.baseMargin, width: '100%' }]}>

                <Text style={styles.title}>Login</Text>
                <Text style={styles.subtitle}>Informe as suas credenciais para iniciar sessão com sua conta de cliente..</Text>

                <View style={{ width: '100%', marginTop: metrics.doubleBaseMargin }}>
                    <CustomInput label="Telefone" style={{ marginTop: 0 }} name="phone" type="phone" placeholder="+2449XXXXXX" />

                    <CustomInput  label="Senha" containerStyle={{marginTop: 20}} name="password" type="password" placeholder="**********" />

                    <TouchableOpacity onPress={() => navigation.navigate('forgot')}>
                        <Text style={{ marginTop: 8, color: colors.grayLight, fontSize: fonts.regular, textAlign: 'right' }}>Esqueceu a sua senha?</Text>
                    </TouchableOpacity>

                    <CustomButton style={{ marginTop: 20 }} primary title="Entrar" onPress={() => { }} />
                </View>
            </View>

            <View style={{ width: '100%', marginTop: metrics.doubleBaseMargin }}>
                <Text style={[styles.bottomText]}>Não possui uma conta?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('signup')}>
                    <Text style={[styles.bottomText, { fontWeight: 'bold' }]}>Criar Conta</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}
export default Login