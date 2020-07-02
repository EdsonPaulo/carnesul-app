import React, { useState, useEffect, useContext } from 'react'
import { Text, View, ScrollView, StyleSheet, Alert, TouchableOpacity, ActivityIndicator } from 'react-native'
import { useNavigation, TabActions } from '@react-navigation/native'
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native';

import { colors, metrics, general, fonts, constants } from '../../constants'
import ShopContext from '../../context/shop-context'
import CustomButton from '../../components/CustomButton'
import HeaderBar from '../../components/HeaderBar'

export default index = () => {

    const navigation = useNavigation()
    const context = useContext(ShopContext)
    const [subtotal, setSubtotal] = useState(0)
    const [tax, setTax] = useState(5000)

    useEffect(() => {
        calculateTotal()
    }, [context.cart])

    //calcular o valor total
    const calculateTotal = () => {
        let acumulator = 0
        context.cart.forEach(element => {
            acumulator += (element.price * element.quantity)
        })
        setSubtotal(acumulator)
    }

    const transformPrice = value => Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'AOA' }).format(value)

    const renderEmptyCart = () => (
        <View style={{ marginHorizontal: 20 }}>
            <MaterialCommunityIcons style={{ textAlign: 'center' }} name="cart-off" size={60} color={colors.grayMedium} />
            <Text style={{ textAlign: 'center', fontSize: 18, fontWeight: 'bold' }}>Carrinho Vazio!</Text>
            <Text style={{ textAlign: 'center' }}>Não tem nenhum produto no seu carrinho, adicione alguns da loja!</Text>
            <CustomButton primary title="Ir à Loja" onPress={() => navigation.dispatch(TabActions.jumpTo('category', { categoryId: 0 }))} />
        </View>
    )

    const renderCart = () => (
        <View style={{ flex: 1, width: '100%' }}>
            <View style={{ flex: 1, width: '100%' }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {
                        context.cart.map((item, i) => {

                            let quantity = item.quantity
                            
                            return(
                            <View style={styles.productContainer} key={i}>
                                <View style={styles.productImage}>
                                    <PlaceholderImage style={styles.productImage}
                                        source={(item.images?.length > 0) ? { uri: item.images[0].src } : require('../../assets/noimage.png')} />
                                </View>
                                <View style={styles.productInfoContainer}>
                                    <View style={styles.productTextContainer}>
                                        <Text style={styles.productTitle}>{item.name}</Text>
                                        <Text style={styles.productPrice}>
                                            { transformPrice(item.price) }
                                        </Text>
                                    </View>
                                    <View style={styles.productActionContainer}>
                                        <TouchableOpacity style={{ width: 35 }} onPress={() => context.removeProductFromCart(item.id)}>
                                            <Ionicons name="ios-close-circle-outline" size={25} color={colors.grayDark2} />
                                        </TouchableOpacity>
                                        <View style={styles.productQuantityContainer}>
                                            <TouchableOpacity style={{ width: 35 }} onPress={() => context.decrementProductQuantity(item.id)}>
                                                <Ionicons name="ios-remove-circle" size={25} color={colors.grayDark2} />
                                            </TouchableOpacity>
                                            <Text style={styles.productQuantity}>{item.quantity}</Text>
                                            <TouchableOpacity style={{ width: 35 }} onPress={() => context.incrementProductQuantity(item.id)}>
                                                <Ionicons name="ios-add-circle" size={25} color={colors.grayDark2} />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        

                        )})
                    }
                </ScrollView>
            </View>
            <View style={styles.checkoutContainer}>
                <View style={styles.checkoutRow}>
                    <Text style={styles.checkoutDetailsText}>Subtotal </Text>
                    <Text style={styles.checkoutDetailsText}>
                        { transformPrice(subtotal) }
                    </Text>
                </View>
                <View style={styles.checkoutRow}>
                    <Text style={styles.checkoutDetailsText}>Taxa de Entrega </Text>
                    <Text style={styles.checkoutDetailsText}>
                        { transformPrice(tax) }
                    </Text>
                </View>
                <View style={styles.checkoutRow}>
                    <Text style={styles.totalText}>Total </Text>
                    <Text style={styles.totalText}>
                        { transformPrice(subtotal + tax) }
                    </Text>
                </View>
                <CustomButton primary title="Realizar Compra" onPress={() => navigation.navigate('checkout', { cart: context.cart, subtotal: subtotal })} />
            </View>
        </View>
    )


    return (
        <SafeAreaView style={general.background}>

            <HeaderBar raised title="Meu Carrinho" />

            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                {context.cart.length == 0 ? renderEmptyCart() : renderCart()}
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "whitesmoke",
    },
    checkoutContainer: {
        borderTopWidth: 3,
        borderTopColor: '#F2F2F2',
        paddingVertical: metrics.smallMargin,
        paddingHorizontal: metrics.baseMargin,
        justifyContent: 'center',
        width: '100%'
    },
    checkoutRow: {
        marginVertical: 2,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row'
    },
    checkoutDetailsText: {
        fontSize: fonts.small,
    },
    totalText: {
        fontSize: fonts.input,
        fontWeight: 'bold'
    },



    // Products
    productContainer: {
        height: 90,
        flexDirection: 'row',
        padding: metrics.baseMargin,
        borderRadius: metrics.baseRadius,
        backgroundColor: colors.white,
        elevation: 5,
        marginHorizontal: metrics.baseMargin,
        marginBottom: metrics.smallMargin,
        marginTop: metrics.baseMargin,
    },
    productImage: {
        width: 100,
        //  backgroundColor: 'green',
        height: '100%'
    },
    productInfoContainer: {
        justifyContent: 'space-between',
        //   backgroundColor: 'red',
        flexDirection: 'row',
        flex: 1
    },
    productTextContainer: {
        justifyContent: 'space-between',
        //    backgroundColor: 'gold',
        paddingLeft: metrics.smallMargin,
        flex: 2.7 / 4
    },
    productActionContainer: {
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        // backgroundColor: 'gray',
        flex: 1.3 / 4
    },
    productTitle: {
        fontSize: fonts.input,
        textTransform: 'capitalize',
        fontFamily: 'Lato'

    },
    productPrice: {
        fontSize: fonts.medium,
        fontWeight: 'bold',
        color: colors.accent
    },
    productQuantity: {
        marginHorizontal: 5,
        fontWeight: 'bold',
        fontSize: 18
    },
    productQuantityContainer: {
        width: '100%',
        justifyContent: 'flex-end',
        flexDirection: 'row',
        alignItems: 'center'
    }
});
