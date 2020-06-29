import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, FlatList, Alert, Dimensions, ActivityIndicator } from 'react-native'
import api from '../../services/api'
import Icon from '@expo/vector-icons/MaterialCommunityIcons'
import ProductItem from "./ProductItem"

import { general, colors } from "../../constants";

const { width } = Dimensions.get('window')

const numColumns = 2
const formatData = (products, numColumns) => {
  const numberOfFullRows = Math.floor(products.length / numColumns)

  let numberOfElementsLastRow = products.length - (numberOfFullRows * numColumns)
  while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
    products.push({ key: `blank-${numberOfElementsLastRow}`, empty: true })
    numberOfElementsLastRow++
  }
  return products
}

const ProductVerticalList = listParams => {

  let isMounted = false
  const [products, setProducts] = useState([])

  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)


  async function loadProducts() {

    if (loading) { return }

    if (total > 0 && products.length === total) { return }

    if (isMounted) {
      setLoading(true)
      let response = await api.get('/products', { params: { page, category: listParams.category } }).catch(
        e => {
          console.log(e + ' ===> erro')
          setLoading(false)
          setError(true)
        }
      )

      if (response && isMounted) {
        setError(false)
        setProducts([...products, ...response.data])
        setTotal(responde.headers['x-total-count'])
        setPage(page + 1)
        setLoading(false)
      }
    }
  }

  useEffect(() => {
    //  setProducts([])
    //  setPage(1)
    //  setError(false)
    //  loadProducts()
    loadFakeProducts()

    return () => { }
  }, [listParams.category])

  const loadFakeProducts = () => {
    setLoading(true)
    setTimeout(() => {
      let data = require('../../services/mock-data.json')
      if (listParams.category !== 0)
        data = data.filter(product => product.category === listParams.category)
      setProducts(data)
      setLoading(false)

    }, 1000)
  }

  useEffect(() => {
    isMounted = true
    //loadProducts()
    loadFakeProducts()
    return () => isMounted = false
  }, [])


  const renderItem = ({ item }) => {
    if (item.empty)
      return <View style={styles.itemInvisible} />
    else
      return <ProductItem width={(width / 2 - 20)} {...item} />
  }

  if (loading) {
    return (
      <View style={styles.centerContent}>
        <ActivityIndicator color={colors.primary} size="large" />
        <Text>Carregando..</Text>
      </View>
    )
  }

  if (products.length === 0) {
    return (
      <View style={styles.centerContent}>
        <Text style={{ textAlign: 'center', fontSize: 22, color: colors.grayDark }}>Nenhum produto na categoria selecionada!</Text>
      </View>
    )
  }

  if (error) {
    return (
      <View style={styles.centerContent}>
        <Icon name="network-off-outline" color={colors.grayMedium} size={70} />
        <Text style={{ fontSize: 18 }}>Ocorreu algum erro na ligação</Text>
        <Text style={{ fontSize: 15 }}>Verifique a sua internet ou tente mais tarde!</Text>
      </View>
    )
  }

  return (
    <FlatList bounces
      data={formatData(products, numColumns)}
      contentContainerStyle={{ paddingVertical: 15 }}
      renderItem={renderItem}
      onEndReached={loadProducts}
      onEndReachedThreshold={0.3}
      numColumns={numColumns}
      //showsVerticalScrollIndicator={false}
      keyExtractor={(item, index) => index.toString()}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemInvisible: {
    flex: 1,
    backgroundColor: 'transparent',
    height: 200,
    margin: 5,
  },
  centerContent: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default ProductVerticalList