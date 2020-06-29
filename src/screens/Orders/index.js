import React, { useState } from 'react'
import { Text, View, SafeAreaView, ScrollView } from 'react-native'
//import { SafeAreaView  } from 'react-native-safe-area-context'

import { colors, metrics, general } from '../../constants'
import HeaderBar from '../../components/HeaderBar'

export default index = () => {

  const [orders, setOrders] = useState([])

  const renderEmptyOrders = () => (
    <View style={{ marginHorizontal: 20, flex: 1, justifyContent: 'center' }}>
      <Text style={{ textAlign: 'center', fontSize: 22, color: colors.grayDark }}>Nenhuma compra efectuada!</Text>
    </View>
  )

  const renderOrders = () => (
    <View />
  )

  return (
    <SafeAreaView style={general.background}>
      <HeaderBar raised title="Histórico de Compras" back />
      <ScrollView showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flex: 1, padding: 15 }}>
        {
          orders.length === 0 ? renderEmptyOrders() : renderOrders()
        }
      </ScrollView>

    </SafeAreaView>
  )
}