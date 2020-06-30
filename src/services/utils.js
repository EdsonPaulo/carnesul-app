import { Alert, ToastAndroid } from 'react-native'
import Rate, { AndroidMarket } from 'react-native-rate'
//import Share from 'react-native-share'

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
        'Avaliar o Carnesul', 'Avalie-nos, comente o que achou e em que podemos melhorar!', [
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

const onShare = () => {
    /** 
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
    //const icon = 'data:<data_type>/<file_extension>;base64,<base64_data>';
    const options = Platform.select({
        ios: {
            activityItemSources: [
                { // For sharing url with custom title.
                    placeholderItem: { type: 'url', content: url },
                    item: {
                        default: {
                            type: 'text',
                            content: `${message} ${url}`
                        }
                    },
                    subject: { default: title },
                    linkMetadata: { originalUrl: url, url, title },
                }
            ],
        },
        default: {
            title,
            subject: title,
            message: `${message} ${url}`,
        },
    });

    Share.open(options)
    */
}

export { onRate, onShare }