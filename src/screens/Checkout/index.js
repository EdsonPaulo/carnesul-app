import React, { useState, useRef, useEffect } from 'react'
import { Text, View, TextInput, Alert, AsyncStorage, ScrollView, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import Icon from '@expo/vector-icons/FontAwesome5'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Picker } from '@react-native-community/picker';

import { colors, metrics, general, constants, fonts } from '../../constants'
import { HeaderBar, CustomButton }  from '../../components'
import api from '../../services/api'

const { height } = Dimensions.get('window')

const index = () => {
    let isMounted = true
    const navigation = useNavigation()
    const route = useRoute()
    const cart = route.params.cart
    const subtotal = route.params.subtotal
    const [tax, setTax] = useState(5000)
    const [cupom, setCupom] = useState(0)
    const [address, setAddress] = useState(['Rua E - Bairro Palanca - Luanda', 'Rua 14 - Bairro Prenda - Luanda'])
    const [deliveryAddress, setDeliveryAddress] = useState(address[0] || '')
    const [submiting, setSubmiting] = useState(false)

    const [orderDetails, setOrderDetails] = useState({
        billing: {
            first_name: '',
            last_name: '',
            address_1: deliveryAddress,
            country: "AO",
            email: '',
            phone: ''
        },
        shipping: {
            first_name: '',
            last_name: '',
            address_1: deliveryAddress,
            country: "AO"
        },
        shipping_tax: '5000',
        customer_id: 2,
        line_items: []
    })


    const transformPrice = value => Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'AOA' }).format(value)

    //carregar enderecos do armazenamento
    const getAddress = async () => {
        try {
            const data = await AsyncStorage.getItem(constants.ADDRESS_KEY)
            if (data && isMouted)
                setAddress(JSON.parse(data))
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getAddress()
        return () => isMounted = false
    }, [])

    //finalizar compra/pedido
    const makeOrder = () => {
        let listItem = []
        let order = orderDetails

        cart.map(element => {
            listItem.push({
                product_id: element.id,
                quantity: element.quantity
            })
        })

        order.line_items = listItem

        setSubmiting(true)
        console.log(order)

        api.post('orders', order).then(response => {
            console.log(response.data)
        }).catch(response => {
            console.log(response)
        }).finally(() => setSubmiting(false))
    }

    return (
        <SafeAreaView style={general.background}>
            <HeaderBar raised title="Fazer Pedido" back />

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
                                    <Text style={{ textTransform: 'capitalize' }}>{item.name} (x{item.quantity})</Text>
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
                            <TextInput returnKeyType='next'
                                onChangeText={value => {
                                    setOrderDetails(
                                        orderDetails => {
                                            orderDetails.billing.first_name = value
                                            orderDetails.shipping.first_name = value
                                            return ({ ...orderDetails })
                                        }
                                    )
                                }}
                                textContentType='name' style={styles.inputStyle} placeholder="Seu nome e sobrenome" />
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.labelStyle}>Telefone</Text>
                            <TextInput returnKeyType='next' onChangeText={value => {
                                setOrderDetails(
                                    orderDetails => {
                                        orderDetails.billing.phone = value
                                        return ({ ...orderDetails })
                                    }
                                )
                            }}
                                keyboardType='phone-pad' style={styles.inputStyle} placeholder="Seu número de telefone" />
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.labelStyle}>Email (opcional)</Text>
                            <TextInput returnKeyType='next'
                                onChangeText={value => {
                                    setOrderDetails(
                                        orderDetails => {
                                            orderDetails.billing.email = value
                                            return ({ ...orderDetails })
                                        }
                                    )
                                }}
                                keyboardType='email-address' style={styles.inputStyle} placeholder="Seu email de contacto" />
                        </View>
                    </View>
                </View>

                <View style={styles.sectionContainer}>
                    <View style={styles.sectionTitleContainer}>
                        <Icon name='shipping-fast' size={15} color={colors.accent} />
                        <Text style={styles.sectionTitle}>Detalhes da Entrega</Text>
                    </View>
                    <View style={[general.card, styles.section]}>
                        {
                            address.length === 0 ?
                                <TouchableOpacity onPress={navigation.navigate('address')} activeOpacity={0.7} style={styles.btnAdress}>
                                    <Icon name="plus-circle" color={colors.grayDark} size={20} />
                                    <Text style={{ marginTop: 2 }}>Adicionar Endereço</Text>
                                </TouchableOpacity>
                                :
                                <View style={styles.inputContainer}>
                                    <Text style={styles.labelStyle}>Selecione um endereço</Text>
                                    <Picker selectedValue={deliveryAddress}
                                        itemStyle={{ borderWidth: 1 }}
                                        style={{ height: 35, borderWidth: 5, borderRadius: 5, borderColor: colors.magenta, backgroundColor: colors.grayLight }}
                                        onValueChange={(itemValue, itemIndex) => setDeliveryAddress(itemValue)}>

                                        {address.map(item => <Picker.Item label={item} value={item} />)}

                                    </Picker>
                                </View>
                        }
                        <View style={styles.inputContainer}>
                            <Text style={styles.labelStyle}>Observação do pedido (opcional)</Text>
                            <TextInput returnKeyType='done' multiline style={[styles.inputStyle, { height: 70 }]}
                                placeholder="Observação sobre o pedido, por exemplo, mais informações sobre a entrega.." />
                        </View>
                    </View>
                </View>

                <CustomButton loading={submiting} primary title="Finalizar Pedido" style={{ margin: 15 }} onPress={() => makeOrder()} />

            </ScrollView>
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