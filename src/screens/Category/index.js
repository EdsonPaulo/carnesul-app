import React, { useEffect, useState } from 'react'
import { Text, View, FlatList, Alert, StyleSheet, InteractionManager, ActivityIndicator, TouchableOpacity, ScrollView } from 'react-native'
import { useRoute } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { HeaderBar, ProductVerticalList, LoadingSpin } from '../../components'
import { colors, metrics, fonts, general } from '../../constants'
import api from '../../services/api'

export default index = () => {
    let isMounted = true
    const route = useRoute()
    const [interactionsComplete, setInteractionsComplete] = useState(false)
    const [categories, setCategories] = useState([{ id: null, name: 'Tudo' }])
    const [categoryId, setCategoryId] = useState(81)


    const loadProductCategories = () => {
        api.get('/products/categories')
            .then(response => {
                if (isMounted) {
                    setCategories(response.data.filter(category => category.count > 0))
                    setCategoryId(route.params?.categoryId || categoryId)
                }
            })
            .catch(err => {
                console.log(err + ' ===> erro')
            })
    }

    useEffect(() => {
        InteractionManager.runAfterInteractions(() => {
            setInteractionsComplete(true)
        }).then(() => {
            isMounted = true
            if (categories.length <= 0)
                loadProductCategories()
        })
        return () => isMounted = false
    }, [])


    useEffect(() => {
        if (categories.length <= 0) {
            if (isMounted)
                setCategories(route.params?.categories)
        }
        else
            setCategoryId(route.params?.categoryId || categoryId)
        return () => { }
    }, [route.params?.categoryId])


    const renderCategoryList = () => {
        const CategoryItem = (category) => (
            <TouchableOpacity activeOpacity={0.8} onPress={() => setCategoryId(category.id)}
                style={[styles.categoryItem, {
                    borderColor: (categoryId === category.id) ? colors.white : 'transparent',
                }]}>
                <Text style={styles.categoryItemText}>{category.name} ({category.count || 0})</Text>
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

    if (!interactionsComplete) { return <LoadingSpin /> }

    return (
        <SafeAreaView style={general.background}>
            <HeaderBar title="Categorias" />
            <View style={styles.categoryListContainer}>
                {renderCategoryList()}
            </View>
            <View style={{ flex: 1 }}>
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