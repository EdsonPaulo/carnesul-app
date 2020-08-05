import React, { useEffect, useState } from 'react'
import { Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import { useRoute, useNavigation } from '@react-navigation/native'

import { colors, metrics, fonts } from '../../constants'
import api from '../../services/api';


const CategoryList = props => {
    let isMounted = true
    const route = useRoute()
    const [categories, setCategories] = useState([{ id: null, name: 'Tudo', count: 0 }])
    const [categoryId, setCategoryId] = useState(81)
    const navigation = useNavigation()

    const loadProductCategories = () => {
        api.get('/products/categories')
            .then(response => {
                if (isMounted)
                    setCategories(response.data.filter(category => category.count > 0))
            })
            .catch(err => {
                console.log(err + ' ===> erro')
            })
    }

    const CategoryItem = (category) => (
        <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate("category", {categories: categories, categoryId: category.id })}
            style={[styles.categoryItem, {}]}>
            <Text style={styles.categoryItemText}>{category.name}</Text>
        </TouchableOpacity>
    )

    useEffect(() => {
        loadProductCategories()
        return () => isMounted = false
    }, [])

    return (
        <FlatList horizontal bounces
            showsHorizontalScrollIndicator={false}
            data={categories}
            contentContainerStyle={{ padding: 10 }}
            renderItem={({ item }) => <CategoryItem {...item} />}
            keyExtractor={(item, index) => index.toString()}
        />
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    categoryItem: {
        minWidth: 80,
        paddingHorizontal: 25,
        paddingVertical: 10,
        borderRadius: 35,
        backgroundColor: colors.primaryDark,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 7,
    },
    categoryItemText: {
        fontSize: fonts.input,
        textTransform: 'capitalize',
        color: 'white',
        fontFamily: 'Lato'
    },

})

export default CategoryList