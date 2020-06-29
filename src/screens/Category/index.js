import React, { useEffect, useState, useCallback } from 'react'
import { Text, View, FlatList, Alert, StyleSheet, Dimensions, InteractionManager, ActivityIndicator, TouchableOpacity, ScrollView } from 'react-native'
import Icon from '@expo/vector-icons/MaterialCommunityIcons'
import { useNavigation, useFocusEffect, useRoute } from '@react-navigation/native'
import { SafeAreaView } from 'react-native';

import HeaderBar from '../../components/HeaderBar';
import ProductVerticalList from '../../components/product/ProductVerticalList'
import { colors, metrics, fonts, general } from '../../constants'

import api from '../../services/api';

export default index = () => {

    const navigation = useNavigation()
    const route = useRoute()
    const [interactionsComplete, setInteractionsComplete] = useState(false)
    const [categories, setCategories] = useState([
        { id: 0, name: 'tudo' },
        { id: 1, name: 'bovino' },
        { id: 2, name: 'suino partido' },
        { id: 3, name: 'caprino' },
        { id: 4, name: 'ovideo' },
        { id: 5, name: 'bovino com osso' },
        { id: 6, name: 'suino' },
        { id: 7, name: 'caprino' },
        { id: 8, name: 'ovideo' },
    ])
    const [categoryId, setCategoryId] = useState(0)

    let isMounted = false

    async function loadProductCategories() {
        const response = await api.get('/products/categories').catch(
            e => {
                Alert.alert('ERRO', '' + e.message)
                console.log(e + ' ===> erro')
            }
        )
        if (isMounted && response)
            setCategories(response.data);
    }

    useEffect(() => {
        InteractionManager.runAfterInteractions(() => {
            setInteractionsComplete(true)
        })
        return () => { }
    }, [])

    /**
    useFocusEffect(
        useCallback(() => {
            // console.log(categoryId)
            //  console.log(route.params)
            //LER E RENDERIZAR DADOS DA CATEGORIA INFORMADA

        }, [categoryId])
    )
     */

    useEffect(() => {
        setCategoryId(route.params?.categoryId || 0)
        return () => { }
    }, [route.params?.categoryId])


    useEffect(() => {
        if (interactionsComplete) {
            isMounted = true
            //loadProductCategories()
        }
        return () => { isMounted = false }
    }, [])


    const renderCategoryList = () => {
        const CategoryItem = (category) => (
            <TouchableOpacity activeOpacity={0.8} onPress={() => setCategoryId(category.id)}
                style={[styles.categoryItem, {
                    borderColor: (categoryId === category.id) ? colors.white : 'transparent',
                }]}>
                <Text style={styles.categoryItemText}>{category.name}</Text>
            </TouchableOpacity>
        )
        return (
            <FlatList horizontal bounces
                showsHorizontalScrollIndicator={false}
                data={categories}
                contentContainerStyle={{}}
                renderItem={({ item }) => <CategoryItem {...item} />}
                keyExtractor={(item, index) => index.toString()}
            />
        )
    }


    if (!interactionsComplete) {
        return (
            <View style={[general.background, { justifyContent: 'center', alignItems: 'center' }]}>
                <ActivityIndicator size="large" color={colors.primaryDark} />
            </View>
        )
    }


    return (
        <SafeAreaView style={general.background}>
            <HeaderBar title="Categorias" />

            <View style={styles.categoryListContainer}>
                {renderCategoryList()}
            </View>

            <View style={{flex: 1}}>
                {/**
                  */}
                <ProductVerticalList category={categoryId} />

            </View>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scene: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    categoryListContainer: {
        width: '100%',
        height: 55,
        justifyContent: 'flex-end',
        backgroundColor: colors.primaryDark,
    },
    categoryItem: {
        minWidth: 80,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 4,
        paddingHorizontal: metrics.baseMargin,
    },
    categoryItemText: {
        fontSize: fonts.input,
        textTransform: 'capitalize',
        color: 'white',
        fontFamily: 'Lato'
    },

})