import React, { } from 'react'
import { Text, View, Image, StatusBar, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Onboarding from 'react-native-onboarding-swiper'

import CustomButton from '../../components/CustomButton'
import { metrics, fonts, colors } from '../../constants'
import styles from './styles'


const Welcome = () => {

    const navigation = useNavigation()

    {/** 
        <View style={[styles.background, { padding: 0 }]}>
            <View style={{ flex: 2 / 3, justifyContent: 'flex-end', alignItems: "center", elevation: 15, }}>
                <View style={{ width: '100%', height: '100%' }}>
                    <Image source={require('../../assets/landing1.jpg')} resizeMode="cover"
                        style={{ width: '100%', height: '100%' }} />
                </View>

                <View style={{ position: 'absolute', top: 0, width: '100%', height: '100%', zIndex: 1, borderBottomRightRadius: 80, backgroundColor: '#00000062', justifyContent: 'center' }}>
                    <Text style={[styles.title, { textAlign: 'center', marginLeft: 0, fontSize: 30, letterSpacing: 3 }]}> CARNESUL </Text>
                    <Text style={[styles.subtitle, { textAlign: 'center', marginLeft: 15 }]}>Oferecendo as carnes da melhor qualidade</Text>

                </View>
            </View>

            <View style={{ width: '100%', flex: 1 / 3, padding: metrics.doubleBaseMargin }}>
                <CustomButton primary title="Iniciar Sessão" onPress={() => navigation.navigate('login')} />
                <CustomButton title="Criar Conta" onPress={() => navigation.navigate('signup')} />
                <TouchableOpacity onPress={() => navigation.navigate('main')}>
                    <Text style={[styles.bottomText, { marginTop: metrics.baseMargin }]}>Entrar como visitante</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.copyrightText}>c 2020 - DeltaCorp</Text>
        </View>
        */
    }

    return (
        <Onboarding
            nextLabel="Seguinte"
            skipLabel="Saltar"
            onDone={() => {
                console.log('terminado')
                navigation.navigate("landing")
            }}
            pages={[
                {
                    backgroundColor: colors.primaryDark,
                    image: <Image source={require('../../assets/icon.png')} />,
                    title: 'Onboarding 1',
                    subtitle: 'Done with React Native Onboarding Swiper',
                },
                {
                    backgroundColor: colors.accent,
                    image: <Image source={require('../../assets/icon.png')} />,
                    title: 'Onboarding 2',
                    subtitle: 'Done with React Native Onboarding Swiper',
                },
                {
                    backgroundColor: colors.bgColor,
                    image: <Image source={require('../../assets/icon.png')} />,
                    title: 'Onboarding 3',
                    subtitle: 'Done with React Native Onboarding Swiper',
                }
            ]}
        />

    )
}
export default Welcome