import React, { useState, useEffect } from 'react'
import { Text, View, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'

import { colors, metrics, general } from '../../constants'
import { LoadingSpin } from '../../components'
import { HeaderBar } from '../../components'
import api from '../../services/api';

export default index = () => {

  let isMounted = true
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const navigation = useNavigation()

  const user_id = 2;

  const getOrders = () => {
    api.get(`orders?customer=${user_id}`)
      .then(response => {
        if (isMounted) {
          setOrders(response.data)
          setLoading(false)
        }
      })
      .catch(error => {
        console.error(error)
        if (isMounted)
          setLoading(false)
      })
  }

  useEffect(() => {
    isMounted = true
    getOrders()
    return () => isMounted = false
  }, [])

  const convertDate = date => Intl.DateTimeFormat('pt-AO').format(new Date(date))

  const Order = ({ order }) => (
    <TouchableOpacity style={styles.orderContainer} onPress={() => navigation.navigate('order', { order: order })}>
      <View style={styles.rowContainer}>
        <Text style={{}}>#{order.number}</Text>
        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
          {Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'AOA' }).format(order.total)}
        </Text>
      </View>

      <View style={styles.rowContainer}>
        <Text style={[styles.statusText, {
          backgroundColor: order.status === 'processing' ? 'lightgreen'
            : order.status === 'canceled' ? colors.alert : colors.grayLight
        }]}>
          {order.status}
        </Text>

        <Text>{convertDate(order.date_created)}</Text>
      </View>
    </TouchableOpacity>
  )

  const renderOrdersList = () => (
    <FlatList contentContainerStyle={{ padding: metrics.baseMargin }}
      data={orders}
      renderItem={({ item }) => <Order order={item} />}
      keyExtractor={(item, index) => index.toString()}
    />
  )

  const renderEmptyOrders = () => (
    <View style={styles.container}>
      <Text style={{ textAlign: 'center', fontSize: 22, color: colors.grayDark }}>Sem pedidos registados!</Text>
    </View>
  )


  return (
    <SafeAreaView style={general.background}>
      <HeaderBar raised title="Meus Pedidos" back />
      <View style={{ flex: 1 }}>
        {
          loading ? <LoadingSpin /> :
            orders.length > 0 ? renderOrdersList() : renderEmptyOrders()
        }
      </View>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: metrics.doubleBaseMargin,
    justifyContent: 'center',
    alignItems: 'center'
  },
  orderContainer: {
    flex: 1,
    height: 75,
    paddingVertical: metrics.baseMargin,
    paddingHorizontal: metrics.doubleBaseMargin,
    backgroundColor: 'white',
    borderWidth: 1,
    elevation: 1,
    borderRadius: metrics.baseRadius,
    borderColor: colors.grayLight,
    marginVertical: metrics.smallMargin
  },
  rowContainer: {
    flex: 1 / 2,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  statusText: {
    fontWeight: 'bold',
    paddingHorizontal: 8,
    paddingVertical: 1,
    borderRadius: 6,
    textTransform: 'capitalize',
  }
})