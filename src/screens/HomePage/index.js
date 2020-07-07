import React, { useContext, useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'

import {
    Text,
    View,
    Alert,
    Image,
    AsyncStorage,
    StyleSheet,
    BackHandler,
    ToastAndroid,
    Dimensions,
    ScrollView,
    TouchableOpacity
} from 'react-native'

import Icon from '@expo/vector-icons'

import { colors, metrics, general, fonts, constants } from '../../constants'
import ShopContext from '../../contexts/shop/shop-context'

import ProductHorizontalList from '../../components/product/ProductHorizontalList'
import SwiperCards from '../../components/SwiperCards'
import HeaderBar from '../../components/HeaderBar';

const index = () => {

    const navigation = useNavigation()
    const context = useContext(ShopContext)
    const [cart, setCart] = useState([])

    //obter o carrinho do armazenamento
    const getDataCart = async () => {
        try {
            const datacart = await AsyncStorage.getItem(constants.CART_KEY)
            if (datacart)
                context.cart = [...JSON.parse(datacart)]
            //console.log('dados lidos context: ' + context.cart)
        }
        catch (e) {
            console.error('Ocorreu um erro ao obter produtos do carrinho!' + e)
        }
    }

    //salvar alteracoes do carrinho no armazenamento
    const saveDataCart = async () => {
        try { await AsyncStorage.setItem(constants.CART_KEY, JSON.stringify(cart)) }
        catch (e) { console.error('Ocorreu um erro ao salvar dados!' + e) }
    }
    /** 
        useEffect(() => {
            getDataCart()
            return () => { }
        }, [])
    
        useEffect(() => {
            setCart(context.cart)
            saveDataCart()
        }, [context.cart])
    */
    return (
        <SafeAreaView style={general.background}>

            <HeaderBar raised title="Carnesul" home />

            <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>

                {/** Section Banner Slides */}
                <View style={styles.bannerSection}>
                    <SwiperCards />
                </View>

                { /** Section Category */}
                <View style={styles.categorySection}>
                    <View style={styles.sectionTopContainer}>
                        <View style={styles.sectionTitleContainer}>
                            <View style={styles.sectionTitleEffect}></View>
                            <Text style={styles.sectionTitle}>Categorias</Text>
                        </View>
                        <TouchableOpacity onPress={() => navigation.navigate('category')}>
                            <Text style={styles.seeMore}>Ver Mais</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={[styles.sectionTopContainer, { marginVertical: 0 }]}>
                        <TouchableOpacity style={styles.categoryContainer}
                            onPress={() => navigation.navigate('category', { categoryId: 81 })}>
                            <Image resizeMode="cover" source={require('../../assets/icons/categoria1.png')} />
                            <Text style={styles.categoryTitle}>Bovino</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.categoryContainer}
                            onPress={() => navigation.navigate('category', { categoryId: 2 })}>
                            <Image resizeMode="cover" source={require('../../assets/icons/categoria2.png')} />
                            <Text style={styles.categoryTitle}>Suino</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.categoryContainer}
                            onPress={() => navigation.navigate('category', { categoryId: 3 })}>
                            <Image resizeMode="cover" source={require('../../assets/icons/categoria1.png')} />
                            <Text style={styles.categoryTitle}>Caprino</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.categoryContainer}
                            onPress={() => navigation.navigate('category', { categoryId: 4 })}>
                            <Image resizeMode="cover" source={require('../../assets/icons/categoria3.png')} />
                            <Text style={styles.categoryTitle}>Ovideo</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.productSection}>
                    <View style={styles.sectionTopContainer}>
                        <View style={styles.sectionTitleContainer}>
                            <View style={styles.sectionTitleEffect}></View>
                            <Text style={styles.sectionTitle}>Recomendados</Text>
                        </View>
                    </View>
                    <View style={{ justifyContent: 'center', height: 240 }}>
                        <ProductHorizontalList />
                    </View>

                </View>

                <View style={styles.productSection}>
                    <View style={styles.sectionTopContainer}>
                        <View style={styles.sectionTitleContainer}>
                            <View style={styles.sectionTitleEffect}></View>
                            <Text style={styles.sectionTitle}>Mais Recentes</Text>
                        </View>
                    </View>
                    <View style={{ justifyContent: 'center', height: 240 }}>
                        <ProductHorizontalList />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )


}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.bgColor,
    },
    headerTitle: {
        fontFamily: 'Soviet',
        color: 'white',
        fontSize: 24
    },

    bannerSection: {
        height: 200,
    },

    categorySection: {
        marginTop: metrics.baseMargin,
        marginBottom: metrics.doubleBaseMargin
    },

    productSection: {
        height: 285,
        justifyContent: 'center',
    },

    sectionTopContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: metrics.baseMargin
    },
    sectionTitleContainer: {
        marginLeft: metrics.doubleBaseMargin,
        marginVertical: metrics.smallMargin,
        borderWidth: 1,
        backgroundColor: colors.white,
        borderColor: colors.grayMedium,
        paddingVertical: metrics.smallMargin,
        paddingHorizontal: metrics.doubleBaseMargin,
    },
    sectionTitleEffect: {
        left: -15,
        position: 'absolute',
        width: 25,
        height: 7,
        top: '50%',
        bottom: '50%',
        borderTopWidth: 2,
        borderBottomWidth: 2,
        borderTopColor: colors.primaryDark,
        borderBottomColor: colors.primaryDark,
    },
    sectionTitle: {
        letterSpacing: 1.7,
        textTransform: 'uppercase',
        // fontFamily: 'Lato',
        fontWeight: 'bold',
        fontSize: fonts.small,
        color: colors.grayDark2,
        textAlign: 'center'
    },
    seeMore: {
        fontSize: fonts.regular,
        color: colors.grayDark2,
        marginRight: metrics.smallMargin
    },

    categoryContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 65,
        height: 65,
    },
    category: {
        width: 60,
        height: 60,
    },
    categoryTitle: {
        textAlign: 'center',
        marginTop: 2,
        letterSpacing: 1.2,
        fontSize: fonts.small,
        color: colors.grayDark2
    }


});

export default index