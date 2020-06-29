import React, { useState, useEffect } from "react";
import { View, Text, FlatList, ActivityIndicator, Alert } from "react-native";



import api from '../../services/api';
import ProductItem from "./ProductItem";
import { general, colors } from "../../constants";


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

  const loadFakeProducts = () => {
    if (isMounted) {
      setLoading(true)
      setTimeout(() => {
        let data = require('../../services/mock-data.json')
        if (data && isMounted) {
          setProducts(data)
          setLoading(false)
        }
      }, 2000)
    }
  }



  useEffect(() => {
    isMounted = true
    //loadProducts()
    loadFakeProducts()

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
