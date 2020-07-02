import React, { useState, useRef } from 'react'
import { Text, View, TextInput, Alert, ScrollView, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import Icon from '@expo/vector-icons/FontAwesome5'
import { SafeAreaView } from 'react-native';
import { Modalize } from 'react-native-modalize'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'

import HeaderBar from '../../components/HeaderBar';
import CustomButton from '../../components/CustomButton'
import CustomInput from '../../components/CustomInput';

import { colors, metrics, general, constants, fonts } from '../../constants'

import api from '../../services/api';

const { height } = Dimensions.get('window')

const index = () => {
    const navigation = useNavigation()
    const route = useRoute()
    const cart = route.params.cart
    const subtotal = route.params.subtotal
    const [tax, setTax] = useState(5000)
    const [cupom, setCupom] = useState(0)

    const adresses = []

    const transformPrice = value => Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'AOA' }).format(value)

    const modalizeRef = useRef(null)
    const onOpen = () => modalizeRef.current?.open()

    const finalizar = ()=>{
        const data = {
            "payment_method": "bacs",
            "payment_method_title": "Direct Bank Transfer",
            "set_paid": true,
            "customer_id":2,
            "billing": {
                "first_name": "John",
                "last_name": "Doe",
                "address_1": "969 Market",
                "address_2": "",
                "city": "San Francisco",
                "state": "CA",
                "postcode": "94103",
                "country": "US",
                "email": "john.doe@example.com",
                "phone": "(555) 555-5555"
              },
              "shipping": {
                "first_name": "John",
                "last_name": "Doe",
                "address_1": "969 Market",
                "address_2": "",
                "city": "San Francisco",
                "state": "CA",
                "postcode": "94103",
                "country": "US"
              },
        }

        let listItem = [];
        
        cart.foreach(element => {
            listItem.push({
                product_id: element.id,
                quantity: element.quantity
            })
        });

       
        data.line_items = listItem;

        api.post('orders', data).then(response =>{
            console.log(response.data);
        }).catch(response => {
            console.log(response);
        })
    }

    return (
        <SafeAreaView style={general.background}>
            <HeaderBar raised title="Comprar" back />

            <ScrollView contentContainerStyle={{ paddingVertical: 10 }} showsVerticalScrollIndicator={false}>

                <View style={styles.sectionContainer}>
                    <View style={styles.sectionTitleContainer}>
                        <Icon name='list' size={15} color={colors.accent} />
                        <Text style={styles.sectionTitle}>Resumo do Pedido</Text>
                    </View>
                    <View style={[general.card, styles.section]}>
                        {
                            cart.map(item => (
                                <View style={styles.textContainer} key={item.id}>
                                    <Text>{item.name} (x{item.quantity})</Text>
                                    <Text>{transformPrice(item.price * item.quantity)}
                                    </Text>
                                </View>
                            ))
                        }
                        {/**Codigo de cupom */}
                        <View style={[styles.textContainer, { marginTop: 20 }]}>
                            <TextInput style={[styles.inputStyle, { marginRight: 5 }]} placeholder="Código de cupom (se tiver)" />
                            <CustomButton primary title="Aplicar" style={{ height: 35, paddingHorizontal: 5 }} onPress={() => { console.log('applicar cupom') }} />
                        </View>
                        <View style={styles.textContainer}>
                            <Text>Subtotal</Text>
                            <Text>{transformPrice(subtotal)} </Text>
                        </View>
                        <View style={styles.textContainer}>
                            <Text>Taxa de Entrega</Text>
                            <Text>{transformPrice(tax)} </Text>
                        </View>
                        <View style={styles.textContainer}>
                            <Text>Desconto (Cupom)</Text>
                            <Text>{transformPrice(cupom)} </Text>
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={styles.totalText}>Total </Text>
                            <Text style={styles.totalText}> {transformPrice(subtotal + tax - cupom)} </Text>
                        </View>
                    </View>
                </View>

                <View style={styles.sectionContainer}>
                    <View style={styles.sectionTitleContainer}>
                        <Icon name='address-book' size={15} color={colors.accent} />
                        <Text style={styles.sectionTitle}>Informações de Contacto</Text>
                    </View>
                    <View style={[general.card, styles.section]}>
                        <View style={styles.inputContainer}>
                            <Text style={styles.labelStyle}>Nome Completo</Text>
                            <TextInput returnKeyType='next' textContentType='name' style={styles.inputStyle} placeholder="Seu nome e sobrenome" />
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.labelStyle}>Telefone</Text>
                            <TextInput returnKeyType='next' keyboardType='phone-pad'
                                style={styles.inputStyle} placeholder="Seu número de telefone" />
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.labelStyle}>Telefone Alternativo (opcional)</Text>
                            <TextInput returnKeyType='next' keyboardType='phone-pad' style={styles.inputStyle} placeholder="Número de telefone alternativo" />
                        </View>
                    </View>
                </View>

                <View style={styles.sectionContainer}>
                    <View style={styles.sectionTitleContainer}>
                        <Icon name='shipping-fast' size={15} color={colors.accent} />
                        <Text style={styles.sectionTitle}>Detalhes da Entrega</Text>
                    </View>
                    <View style={[general.card, styles.section]}>
                        {adresses.length === 0 ?
                            <TouchableOpacity onPress={onOpen} activeOpacity={0.7} style={styles.btnAdress}>
                                <Icon name="plus-circle" color={colors.grayDark} size={20} />
                                <Text style={{ marginTop: 2 }}>Adicionar Endereço</Text>
                            </TouchableOpacity>
                            :
                            <Text>{adresses[0]}</Text>
                        }
                        <View style={styles.inputContainer}>
                            <Text style={styles.labelStyle}>Observação do Pedido (opcional)</Text>
                            <TextInput returnKeyType='done' multiline style={[styles.inputStyle, { height: 70 }]}
                                placeholder="Observação sobre o pedido, por exemplo, mais informações sobre a entrega.." />
                        </View>
                    </View>
                </View>

                <CustomButton primary title="Finalizar Compra" style={{ margin: 15 }} onPress={() => {
                   finalizar();
                   
                 }} />

            </ScrollView>

            <Modalize ref={modalizeRef}alwaysOpen={20}
                HeaderComponent={() => {
                    return (
                        <View style={{ height: 100, width: '100%', padding: 15 }}>
                            <Text style={{ fontSize: 16, textAlign: 'center', marginBottom: 10 }}>
                                Adicionar Endereço
                            </Text>
                            <CustomInput placeholder="Pesquisar endereço" />
                        </View>
                    )
                }}
                avoidKeyboardLikeIOS
                keyboardAvoidingBehavior='padding'
                modalHeight={height - 150}
                closeOnOverlayTap={false}>
                <View style={{ padding: 15 }}>


                </View>

                {/**
                 * <KeyboardAvoidingView style={styles.modalMask} behavior="padding" keyboardVerticalOffset= {-200}>
                    <View>
                    Your view
                    </View>
                    </KeyboardAvoidingView>
                */}

                <GooglePlacesAutocomplete
                    placeholder='Pesquisar Endereço'
                    minLength={2} // minimum length of text to search
                    autoFocus
                    
                    returnKeyType={'search'} 
                 //   listViewDisplayed='auto'    // true/false/undefined
                //    fetchDetails
                   // renderDescription={row => row.description} // custom description render
                    onPress={(data, details = null) => {
                        console.log(data, details);
                        //if(this.props.onLocationPicked)     this.props.onLocationPicked(details)
                    }}
                   // textInp
                //    getDefaultValue={() => ''}
                    query={{
                        // available options: https://developers.google.com/places/web-service/autocomplete
                        key: 'AIzaSyA0-NC6ta9wWm_0vdBWYl7Rr6Dhg64q-24',
                       // language: 'pt', 
                     //   components: 'country:ao',
                        types: '(cities)' // default: 'geocode'
                    }}
                    styles={{ 
                        textInputContainer: { width: '100%' },
                        description: { fontWeight: 'bold' },
                        predefinedPlacesDescription: { color: '#1faadb' }
                    }}
                    currentLocation // Will add a 'Current location' button at the top of the predefined places list
                    currentLocationLabel="Localização Actual"
                    nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                   // GooglePlacesSearchQuery={{
                       // rankby: 'distance',
                       // type: 'cafe'
                  //  }}
                 //   GooglePlacesDetailsQuery={{ fields: 'formatted_address', }}
                 //   filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
                    //predefinedPlaces={[homePlace, workPlace]}
                    debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
                    enablePoweredByContainer={false}
                    //renderLeftButton={()  => <Image source={require('path/custom/left-icon')} />}
                    //renderRightButton={() => <Text>Custom text after the input</Text>}
                />
            </Modalize>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

    sectionContainer: {
        margin: 15

    },
    sectionTitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        // marginLeft: metrics.smallMargin
    },
    sectionTitle: {
        color: colors.accent,
        fontWeight: 'bold',
        marginLeft: metrics.smallMargin,
        fontSize: fonts.regular,
    },
    section: {
        padding: 15,
        marginTop: 10
    },
    textContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 2
    },
    totalText: {
        fontSize: fonts.input,
        fontWeight: 'bold'
    },
    inputContainer: {
        marginVertical: 7
    },
    labelStyle: {
        color: colors.grayDark2,
        marginBottom: 2,
    },
    inputStyle: {
        flex: 1,
        borderColor: colors.grayMedium,
        borderWidth: 1,
        paddingHorizontal: metrics.baseMargin,
        backgroundColor: colors.bgColor,
        height: 35,
        borderRadius: metrics.baseRadius
    },
    btnAdress: {
        backgroundColor: colors.grayLight,
        borderWidth: 1,
        borderColor: colors.grayMedium,
        borderRadius: 5,
        paddingVertical: 5,
        marginBottom: 15,
        alignItems: 'center',
    }

})

export default index