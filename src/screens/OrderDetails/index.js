import React, { useState, useContext } from "react";
import { Text, View, StyleSheet, Image, ScrollView, ActivityIndicator, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from 'react-native-safe-area-context'

import { HeaderBar } from '../../components'
import { colors, metrics, general, fonts } from "../../constants"
import ShopContext from '../../contexts/shop/shop-context';


export default index = () => {

    const context = useContext(ShopContext)
    const navigation = useNavigation()
    const route = useRoute()
    const order = route.params.order
    const [quantity, setQuantity] = useState(1)

    const transformPrice = value => Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'AOA' }).format(value)
    const convertDate = date => Intl.DateTimeFormat('pt-AO').format(new Date(date))

    return (
        <SafeAreaView style={[general.background, { backgroundColor: 'white' }]}>
            <HeaderBar raised title={"Pedido #" + order.number} back />

            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.textContainer}>
                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{convertDate(order.date_created)}</Text>
                    <Text style={[styles.statusText, {
                        backgroundColor: order.status === 'processing' ? 'lightgreen'
                            : order.status === 'canceled' ? colors.alert : colors.grayLight
                    }]}>
                        {order.status}
                    </Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Produtos</Text>
                    <View>
                        {
                            order.line_items.map(product => (
                                <View key={product.id}>
                                    <Text style={{ textTransform: 'capitalize' }}>{product.name}</Text>
                                    <View style={styles.textContainer}>
                                        <Text> {product.quantity} x {product.price}</Text>
                                        <Text>{transformPrice(product.subtotal)} </Text>
                                    </View>
                                </View>
                            ))
                        }
                    </View>
                </View>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Pagamento</Text>
                    <View style={styles.textContainer}>
                        <Text>Subtotal</Text>
                        <Text>{transformPrice(order.line_items.subtotal)} </Text>
                    </View>
                    <View style={styles.textContainer}>
                        <Text>Taxa de Entrega</Text>
                        <Text>{transformPrice(order.total_tax)} </Text>
                    </View>
                    <View style={styles.textContainer}>
                        <Text>Desconto</Text>
                        <Text>{transformPrice(order.discount_total)} </Text>
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.totalText}>Total </Text>
                        <Text style={styles.totalText}> {transformPrice(order.total)} </Text>
                    </View>
                </View>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Entrega</Text>
                    <Text>{order.shipping.first_name}</Text>
                    <Text>{order.shipping.address_1}</Text>
                    <Text>Angola - {order.shipping.city}</Text>
                    <Text>+244 {order.billing.phone}</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: metrics.baseMargin
    },
    sectionTitle: {
        color: colors.grayDark,
        fontWeight: 'bold',
        fontSize: 15,
        fontFamily: 'Lato',
        marginBottom: metrics.baseMargin
    },
    section: {
        padding: metrics.baseMargin,
        marginVertical: metrics.smallMargin,
        borderWidth: 1,
        borderColor: colors.grayLight,
        borderRadius: metrics.baseRadius
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
    statusText: {
        fontWeight: 'bold',
        paddingHorizontal: 7,
        borderRadius: 6,
        textTransform: 'capitalize',
    }
})
