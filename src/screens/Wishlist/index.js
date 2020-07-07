import React, { useState } from 'react'
import { Text, View, ScrollView } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context"

import { colors, metrics, general } from '../../constants'
import HeaderBar from '../../components/HeaderBar'

export default index = () => {

    const [wishlist, setWishlist] = useState([])

    const renderEmptyWishlist = () => (
        <View style={{ marginHorizontal: 20, flex: 1, justifyContent: 'center' }}>
            <Text style={{ textAlign: 'center', fontSize: 22, color: colors.grayDark}}>Lista de favoritos vazia!</Text>
        </View>
    )

    const renderWishlist = () => (
        <View />
    )

    return (
        <SafeAreaView style={general.background}>
            <HeaderBar raised title="Lista de Favoritos" />
            <ScrollView showsVerticalScrollIndicator={false}
                contentContainerStyle={{ flex: 1, padding: 15, }}>
                {
                    wishlist.length === 0 ? renderEmptyWishlist() : renderWishlist()
                }
            </ScrollView>
        </SafeAreaView>
    )
}
