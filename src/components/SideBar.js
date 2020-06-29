import React from 'react';
import { MaterialCommunityIcons, Ionicons} from '@expo/vector-icons';
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

/**
import Rate, { AndroidMarket } from 'react-native-rate'
import Share from 'react-native-share';
*/

import { colors, fonts, metrics } from '../constants';

/** 
const onShare = () => {
try {
    const result = await Share.share({
        title: 'CarneSul',
        message: 'Carnesul | Carnes Frescas de Boa Qualidade',
        url: 'https://deltacorp.co.ao',
    }, { dialogTitle: 'CarneSul' })

    if (result.action === Share.sharedAction) {
        if (result.activityType) {
            // shared with activity type of result.activityType
        } else {
            // shared
        }
    } else if (result.action === Share.dismissedAction) {
        // dismissed
    }
}
catch (error) { alert(error.message) }
 
const url = 'http://deltacorp.co.ao';
const title = 'CarneSul';
const message = 'Compartilhe o carnesul com amigos. Compartilhar é Carinhoso :)';
const icon = 'data:<data_type>/<file_extension>;base64,<base64_data>';
const options = Platform.select({
 ios: {
   activityItemSources: [
     { // For sharing url with custom title.
       placeholderItem: { type: 'url', content: url },
       item: { default: { type: 'url', content: url } },
       subject: { default: title },
       linkMetadata: { originalUrl: url, url, title },
     },
   /** 
     { // For sharing text.
       placeholderItem: { type: 'text', content: message },
       item: {
         default: { type: 'text', content: message },
         message: null, // Specify no text to share via Messages app.
       },
       linkMetadata: { // For showing app icon on share preview.
          title: message
       },
     },
     { // For using custom icon instead of default text icon at share preview when sharing with message.
       placeholderItem: {
         type: 'url',
         content: icon
       },
       item: {
         default: {
           type: 'text',
           content: `${message} ${url}`
         },
       },
       linkMetadata: {
          title: message,
          icon: icon
       }
     },
   ],
 },
 default: {
   title,
   subject: title,
   message: `${message} ${url}`,
 },
});
 
Share.open(options);
}

const onRate = async () => {
const options = {
    AppleAppID: "2193813192",
    GooglePackageName: "com.carnesul.deltacorp",
  //  AmazonPackageName: "com.carnesul.deltacorp",
   // OtherAndroidURL: "http://www.randomappstore.com/app/47172391",
    preferredAndroidMarket: AndroidMarket.Google,
    preferInApp: false,
    openAppStoreIfInAppFails: true,
    fallbackPlatformURL: "http://deltacorp.co.ao/",
}
Alert.alert(
    'Avaliar o Carnesul', 'Avalie o aplicativo, comente o que achou e em que podemos melhorar!', [
    { text: 'Não, Obrigado', style: 'cancel' },
    {
        text: 'OK', onPress: () => {
            Rate.rate(options, success => {
                if (success) ToastAndroid.show('Obrigado por Avaliar-nos!')
            })
        }
    },
], { cancelable: true })
}
*/

export default SideBar = () => {

    const navigation = useNavigation();

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

                <TouchableOpacity style={styles.btn} onPress={() => { navigation.navigate('cart') }}>
                    <Ionicons name='ios-cart' style={styles.icons} />
                    <Text style={styles.textStyle}> Meu Carrinho </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btn} onPress={() => { navigation.navigate('wishlist') }}>
                    <Ionicons name='ios-heart' style={styles.icons} />
                    <Text style={styles.textStyle}> Lista de Favoritos </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btn} onPress={() => { navigation.navigate('orders') }}>
                    <MaterialCommunityIcons name='clipboard-check-outline' style={styles.icons} />
                    <Text style={styles.textStyle}> Histórico de Compras </Text>
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

                <TouchableOpacity style={styles.btn}>
                    <Ionicons name='ios-settings' style={styles.icons} />
                    <Text style={styles.textStyle}> Configurações </Text>
                </TouchableOpacity>

                <View style={styles.divider} />

                <TouchableOpacity style={styles.btn}>
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
