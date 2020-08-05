import React, { useContext } from 'react';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import {
    View,
    Image,
    Text,
    ScrollView,
    ToastAndroid,
    Alert,
    Platform,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

import { onRate, onShare } from '../services/utils'

import AuthContext from '../contexts/auth/auth-context'

import { colors, fonts, metrics } from '../constants';

/*
 Condomínio Balumuka, Apto 301 - Talatona 
 +244 944 280 811 | +244 921 191 285
 comercial.carnesul@deltacorp.co.ao
*/


export default SideBar = () => {

    const navigation = useNavigation()
    const {logout} = useContext(AuthContext)

    const Logout = () => {
        Alert.alert(
            'Terminar Sessão', 'Deseja terminar sessão da sua conta?', [
            { text: 'Não', style: 'cancel' },
            { text: 'SIm', onPress: () => logout() },
        ], { cancelable: true })
    }

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <View style={styles.userContainer}>
                {/* <Avatar size="large" showAccessory rounded activeOpacity={0.7}
                overlayContainerStyle={{ backgroundColor: colors.primaryDark }}
                icon={{ name: 'user', type: 'font-awesome' }}
                onPress={() => { navigation.navigate('profile') }} />
            */}
                <Text style={[styles.userInfo, { fontWeight: 'bold', fontSize: 18, marginBottom: 10 }]}> Gonçalo Guedes </Text>
                <Text style={styles.userInfo}> Largo da Maianga, Maianga - Luanda, Angola </Text>
            </View>

            <View style={styles.optionsContainer}>
                <TouchableOpacity style={styles.btn} onPress={() => { navigation.navigate('profile') }}>
                    <Ionicons name='ios-person' style={styles.icons} />
                    <Text style={styles.textStyle}>Meu Perfil</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btn} onPress={() => { navigation.navigate('address') }}>
                    <MaterialCommunityIcons name='map-marker-radius' style={styles.icons} />
                    <Text style={styles.textStyle}> Meus Endereços </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btn} onPress={() => { navigation.navigate('cart') }}>
                    <Ionicons name='ios-cart' style={styles.icons} />
                    <Text style={styles.textStyle}>Carrinho de Compras</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btn} onPress={() => { navigation.navigate('wishlist') }}>
                    <Ionicons name='ios-heart' style={styles.icons} />
                    <Text style={styles.textStyle}> Lista de Favoritos </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btn} onPress={() => { navigation.navigate('orders') }}>
                    <MaterialCommunityIcons name='clipboard-check-outline' style={styles.icons} />
                    <Text style={styles.textStyle}> Meus Pedidos </Text>
                </TouchableOpacity>

                <View style={styles.divider} />

                <TouchableOpacity style={styles.btn} onPress={() => { onShare() }}>
                    <MaterialCommunityIcons name='share-variant' style={styles.icons} />
                    <Text style={styles.textStyle}>Partilhar </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btn} onPress={() => onRate()}>
                    <Ionicons name='ios-star' style={styles.icons} />
                    <Text style={styles.textStyle}>Avalie-nos </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btn}>
                    <MaterialCommunityIcons name='account-supervisor' style={styles.icons} />
                    <Text style={styles.textStyle}>Suporte </Text>
                </TouchableOpacity>

                <View style={styles.divider} />

                <TouchableOpacity style={styles.btn} onPress={() => Logout()}>
                    <MaterialCommunityIcons name='logout' style={styles.icons} />
                    <Text style={styles.textStyle}> Terminar Sessão </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        height: '100%',
    },
    userContainer: {
        padding: metrics.baseMargin,
        width: '100%',
        height: 140,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.primaryDark,
    },
    userInfo: {
        color: 'white',
        textAlign: 'center',
        fontFamily: 'Lato'
    },
    textStyle: {
        color: colors.grayDark2,
        fontSize: fonts.regular,
        fontFamily: 'Lato'
    },
    optionsContainer: {
        padding: metrics.baseMargin,
    },
    icons: {
        color: colors.grayDark2,
        fontSize: 26,
        marginRight: metrics.baseMargin,
    },
    btn: {
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%',
        marginVertical: metrics.baseMargin,
        paddingHorizontal: metrics.baseMargin,
    },
    divider: {
        marginVertical: metrics.smallMargin,
        height: 1,
        opacity: 0.5,
        backgroundColor: colors.grayLight
    }
});
