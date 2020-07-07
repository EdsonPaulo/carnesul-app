import React, { useContext } from 'react';
import {
    View, StyleSheet,
    TouchableOpacity, Text,
    TouchableHighlight,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'

import Shimmer from '../Shimmer'
import { colors, metrics, fonts, general } from '../../constants';
import ShopContext from '../../contexts/shop/shop-context';
import PlaceholderImage from '../PlaceholderImage';

const ProductItem = props => {

    const context = useContext(ShopContext)
    const navigation = useNavigation()
    const { width, ...item } = props

    const containerWidth = width || 160

    return (
        <TouchableOpacity activeScale={0.7} style={[general.card, styles.container, { width: containerWidth, maxWidth: 200}]}
            onPress={() => navigation.navigate('product', { product: item })}>
            <View style={styles.topContainer}>
                <Text style={styles.iconQuantity}>{item.weight || 0} KG</Text>
                <TouchableOpacity activeScale={1.2}>
                    <Ionicons color={colors.primaryDark} size={20}
                        name={item.isFavorite ? 'ios-heart' : 'ios-heart-empty'} />
                </TouchableOpacity>
            </View>

            <View style={styles.productImageContainer}>
                <PlaceholderImage style={styles.productImage}
                    source={(item.images?.length > 0) ? { uri: item.images[0].src } : require('../../assets/noimage.png')} />
            </View>

            <View style={styles.titleContainer}>
                <Text style={styles.title}>{item.name}</Text>
            </View>

            <Text style={styles.price}>
                {Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'AOA' }).format(item.price)}
            </Text>

            <TouchableHighlight underlayColor={colors.grayLight} style={styles.addCart}
                onPress={() => context.addProductToCart(item)}>
                <MaterialCommunityIcons size={20} color={colors.grayDark} name="cart-plus" />
            </TouchableHighlight>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    container: {
        width: 160,
        height: 200,
        borderRadius: metrics.doubleBaseRadius,
        marginVertical: metrics.smallMargin,
        marginHorizontal: metrics.baseMargin,
        justifyContent: 'space-between',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 5,
    },
    topContainer: {
        width: '100%',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        height: 20,
        marginBottom: 2,
    },
    iconQuantity: {
        fontSize: fonts.small,
        color: colors.grayDark2,
        backgroundColor: colors.grayMedium,
        padding: 2,
        paddingHorizontal: 4,
        borderRadius: 4,
        fontWeight: 'bold',
    },
    productImageContainer: {
        width: '100%',
        height: 80,
    },
    productImage: {
        width: '100%',
        height: '100%',
    },

    titleContainer: {
        height: 55,
        justifyContent: 'center'
    },
    title: {
        fontSize: 15,
        textTransform: 'capitalize',
        textAlign: 'center',
        fontFamily: 'Lato',
    },
    priceContainer: {
        width: 125,
        height: 30,
        justifyContent: 'flex-end'
    },
    price: {
        fontSize: 16,
        color: colors.accent,
        fontWeight: 'bold',
        marginTop: 2,
    },
    addCart: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        padding: 8,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: '#0000001a',
        borderTopLeftRadius: 20,
        borderBottomRightRadius: metrics.doubleBaseRadius,
    }
})


export default ProductItem;