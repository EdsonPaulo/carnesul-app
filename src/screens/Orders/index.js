import React, { useState, useEffect } from 'react'
import { Text, View, SafeAreaView, ScrollView, FlatList } from 'react-native'
import api from '../../services/api';
//import { SafeAreaView  } from 'react-native-safe-area-context'

import { colors, metrics, general } from '../../constants'
import HeaderBar from '../../components/HeaderBar'

export default index = () => {

  const [orders, setOrders] = useState([])

  const use_id = 2;

  useEffect(()=>{
    api.get(`orders?customer=${use_id}`)
    .then(response => {
      setOrders(response.data);
    })
    .catch(response => {
      console.log(response);
    });
  },[]);
 

function Item({ title }) {
  return (
    <View style={{flexDirection:'row', justifyContent:'space-around'}}>
      <Text>{title.number}</Text>
      <Text>{title.total} {title.currency}</Text>
      <Text>{title.status}</Text>
    </View>
  );
}
  const renderEmptyOrders = () => (
    <View style={{ marginHorizontal: 20, flex: 1, justifyContent: 'center' }}>
      <Text style={{ textAlign: 'center', fontSize: 22, color: colors.grayDark }}>Nenhuma compra efectuada!</Text>
    </View>
  )

  
  
  return (
    <SafeAreaView style={general.background}>
      <HeaderBar raised title="Histórico de Compras" back />
      <ScrollView showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flex: 1, padding: 15 }}>
       
       <FlatList
        data={orders}
        renderItem={({ item }) => <Item title={item} />}
        keyExtractor={item => item.id}
      />

      </ScrollView>

    </SafeAreaView>
  )
}