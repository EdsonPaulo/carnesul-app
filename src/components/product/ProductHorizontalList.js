import React, { useState, useEffect } from "react";
import { View, Text, FlatList, ActivityIndicator, Alert } from "react-native";

import api from '../../services/api';
import ProductItem from "./ProductItem";
import Shimmer from '../Shimmer'
import { general, colors, metrics } from "../../constants";

const ProductHorizontalList = () => {

  let isMounted = false
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)


  async function loadProducts() {
    if (isMounted) {
      setLoading(true)
      let response = await api.get('/products').catch(
        e => {
          //Alert.alert('ERRO', '' + e.message)
          console.log(e + ' ===> erro')
          setLoading(false)
        }
      )

      if (response && isMounted) {
        setProducts(response.data)
        setLoading(false)
      }
    }
  }

  useEffect(() => {
    isMounted = true
    loadProducts()
    return () => {
      isMounted = false
    }
  }, [])

  if (loading) {
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator color={colors.primary} size="large" />
      </View>
    )
  }
  
  /**
  if (loading) {
    const aux = [0, 0, 0, 0]
    return (
      <View style={{ flex: 1, height: '100%', flexDirection: 'row' }}>
        {
          aux.map(item => (
            <View style={{ flex: 1, height: '100%'}}>
              <Shimmer autoRun={true} style={{
                width: 120,
                height: 150,
                borderRadius: metrics.doubleBaseRadius,
                marginVertical: metrics.smallMargin,
                marginHorizontal: metrics.baseMargin,
              }} visible={false}>
                <View style={{
                  width: '100%',
                  height: '100%'
                }}>
                </View>
              </Shimmer>
              <Shimmer autoRun={true} visible={false}>
                <Text>{'text'}</Text>
              </Shimmer>
              <Shimmer autoRun={true} visible={false}>
                <Text>{'text'}</Text>
              </Shimmer>
            </View>
          ))
        }
      </View>
    )
  }
  */



  return (
    <FlatList
      horizontal
      bounces
      contentContainerStyle={{ paddingHorizontal: 10 }}
      showsHorizontalScrollIndicator={false}
      data={products}
      renderItem={({ item }) => <ProductItem {...item} />}
      keyExtractor={(item, index) => index.toString()}
    />
  )
}

export default ProductHorizontalList;
