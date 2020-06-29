import React, { useEffect, useState } from 'react'
import { Text, View, SafeAreaView, ScrollView, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
//import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons, Feather } from '@expo/vector-icons'

import HeaderBar from '../../components/HeaderBar'
import CustomInput from '../../components/CustomInput'


import { colors, metrics, general } from '../../constants'

export default index = () => {

    const navigation = useNavigation()

    const [userInfo, setUserInfo] = useState({
        id: 12313,
        name: 'Gonçalo Guedes',
        phone: '+244942682194',
        email: 'edsonpaulo24@gmail.com',
        address1: 'Casa 12, Rua B, Largo da Maianga, Luanda - Angola',
        address2: '',
    })

    useEffect(() => {
        return () => {
            //salvar dados dos inputs
        }
    }, [])

    return (
        <SafeAreaView style={general.background}>
            <HeaderBar raised title="Meu Perfil" back />

            <ScrollView contentContainerStyle={styles.container}>

                <View style={styles.topContainer}>
                    <View style={styles.avatar}>
                        <Ionicons name="ios-person" size={60} />
                    </View>
                    <View style={styles.userInfo}>
                        <Text style={styles.userName}>{userInfo.name}</Text>
                        <Text style={styles.userDetails}>{userInfo.address1}</Text>
                        <Text style={{ fontWeight: 'bold' }}>ID: {userInfo.id}</Text>
                    </View>
                </View>

                <View style={styles.inputContainer}>
                    <CustomInput type="name" value={userInfo.name} placeholder="Nome e Sobrenome" onChangeText={name => setUserInfo({ ...userInfo, name: name })}
                        containerStyle={styles.inputStyle} />
                </View>

                <View style={styles.inputContainer}>
                    <CustomInput type="phone" placeholder="Telefone" value={userInfo.phone} onChangeText={phone => setUserInfo({ ...userInfo, phone: phone })}
                        containerStyle={styles.inputStyle} />
                </View>

                <View style={styles.inputContainer}>
                    <CustomInput type="email" placeholder="Email de Contacto" value={userInfo.email} onChangeText={email => setUserInfo({ ...userInfo, email: email })}
                        containerStyle={styles.inputStyle} />
                </View>

                <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'space-between' }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
                        <Feather size={16} name="map-pin" /> Endereço</Text>
                    <TouchableOpacity onPress={() => { }}>
                        <Text style={{ fontSize: 15, fontWeight: "bold" }}>+ Alterar</Text>
                    </TouchableOpacity>
                </View>

                <View style={[styles.inputContainer]}>
                    <Text style={styles.labelStyle}>Endereço 1 (principal)</Text>
                    <CustomInput type="address" value={userInfo.address1} editable={false} multiline
                        placeholder="Clique em '+ Alterar' para selecionar um endereço" style={{ height: 60 }}
                        containerStyle={[styles.inputStyle]} />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.labelStyle}>Endereço 2 (alternativo)</Text>
                    <CustomInput type="address" value={userInfo.address2} editable={false} multiline style={{ height: 60 }}
                        containerStyle={[styles.inputStyle]} />
                </View>

            </ScrollView>


        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 15
    },
    topContainer: {
        height: 100,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    avatar: {
        borderWidth: 2,
        padding: 15,
        width: 80,
        height: 80,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: colors.grayDark2
    },
    sectionTitle: {
        fontFamily: 'Lato',
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: metrics.smallMargin
    },
    formContainer: {
        paddingBottom: 20,
    },
    userInfo: {
        flex: 1,
        marginLeft: 15,
        justifyContent: 'center',
    },
    userName: {
        fontFamily: 'Lato',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: metrics.smallMargin,
    },
    userDetails: {
        fontFamily: 'Lato',
        textAlign: 'justify'
    },
    inputContainer: {
        marginVertical: metrics.smallMargin
    },
    labelStyle: {
        marginBottom: 2,
        color: colors.grayDark,
    },
})
