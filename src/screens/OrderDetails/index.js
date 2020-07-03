import React, { useState, useContext } from "react";
import { Text, View, StyleSheet, Image, ScrollView, ActivityIndicator, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from 'react-native';

import Icon from '@expo/vector-icons/Ionicons'

import { colors, metrics, general, fonts } from "../../constants"
import CustomButton from '../../components/CustomButton'
import HeaderBar from "../../components/HeaderBar"
import PlaceholderImage from '../../components/PlaceholderImage'
import ShopContext from '../../contexts/shop/shop-context';


export default index = () => {

    const context = useContext(ShopContext)
    const navigation = useNavigation()
    const route = useRoute()
    const order = route.params.order
    const [quantity, setQuantity] = useState(1)

    return (
        <SafeAreaView style={[general.background, { backgroundColor: 'white' }]}>
            <HeaderBar raised title={"Pedido #" + order.number} back />

        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: metrics.doubleBaseMargin,
    },
    orderImageContainer: {
        width: 180,
        height: 180,
    },

    orderBody: {
        // backgroundColor: 'white',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: metrics.baseMargin,

        borderRadius: metrics.doubleBaseRadius,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        // elevation: 4,
    },

    orderDetails: {
        // backgroundColor: 'grey',
    },

    orderTitle: {
        fontSize: fonts.input,
        margin: metrics.smallMargin,
        textAlign: 'center',
        fontWeight: 'bold',
        textTransform: 'capitalize',
        fontFamily: 'Lato'
    },
    orderActionsA: {
        marginVertical: 20,
        //  backgroundColor: 'gold',
        justifyContent: 'center',

    },
    orderActionsB: {
        justifyContent: 'center',
        //  backgroundColor: 'green',
        width: 250,
        paddingHorizontal: metrics.doubleBaseMargin,
    },

    orderPrice: {
        fontSize: fonts.big,
        textAlign: 'center',
        fontWeight: 'bold',
        color: colors.accent,
    },
    orderQuantity: {
        marginHorizontal: metrics.doubleBaseMargin,
        fontWeight: 'bold',
        fontSize: 30
    },
    orderQuantityContainer: {
        width: '100%',
        marginTop: metrics.smallMargin,
        alignItems: 'center',
        flexDirection: 'row',
    }
});
