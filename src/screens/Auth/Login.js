import React, { useContext } from 'react'
import { Text, View, KeyboardAvoidingView, TouchableOpacity, Platform } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import Icon from '@expo/vector-icons/Feather'
import { CustomButton, CustomInput } from '../../components'
import { metrics, fonts, colors } from '../../constants';
import AuthContext from '../../contexts/auth/auth-context'
import styles from './styles'

const Login = () => {

    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const { login } = useContext(AuthContext)
    const navigation = useNavigation();

    return (
        <KeyboardAvoidingView style={styles.background} behavior={Platform.OS == "ios" ? "padding" : "height"}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon style={styles.iconHeader} name='chevron-left' />
            </TouchableOpacity>

            <View style={[{ padding: metrics.baseMargin, width: '100%' }]}>

                <Text style={styles.title}>Login</Text>
                <Text style={styles.subtitle}>Informe as suas credenciais para iniciar sessão com sua conta de cliente..</Text>

                <View style={{ width: '100%', marginTop: metrics.doubleBaseMargin }}>
                    <CustomInput label="Telefone" style={{ marginTop: 0 }} name="phone" type="phone" placeholder="+2449XXXXXX" />

                    <CustomInput label="Senha" containerStyle={{ marginTop: 20 }} name="password" type="password" placeholder="**********" />

                    <TouchableOpacity onPress={() => navigation.navigate('forgot')}>
                        <Text style={{ marginTop: 8, color: colors.grayLight, fontSize: fonts.regular, textAlign: 'right' }}>Esqueceu a sua senha?</Text>
                    </TouchableOpacity>

                    <CustomButton style={{ marginTop: 20 }} primary title="Entrar" onPress={() => login({ username, password }, "auth-dummy-token")} />
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