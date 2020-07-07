import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, FlatList, Alert, Dimensions, ActivityIndicator } from 'react-native'
import Icon from '@expo/vector-icons/MaterialCommunityIcons'

import ProductItem from "./ProductItem"
import api from '../../services/api'
import { general, colors, metrics } from "../../constants";

const { width } = Dimensions.get('window')

const ProductVerticalList = listParams => {

  let isMounted = true
  const [products, setProducts] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(2)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  //lista os produtos na primeira montagem da tela
  useEffect(() => {
    isMounted = true
    loadProducts()
    return () => isMounted = false
  }, [])

  //lista os produtos ao mudar a categoria
  useEffect(() => {
    loadProducts()
    return () => { }
  }, [listParams.category])


  const loadProducts = () => {

    if (isMounted) {
      setLoading(true)
      setProducts([])
      setPage(2)
      setTotal(0)
    }

    api.get(`/products?category=${listParams.category || ''}`)
      .then(response => {
        //if (isMounted){ }
        setError(false)
        setProducts(response.data)
        setTotal(response.headers['x-wp-total'])
      })
      .catch(err => {
        console.log(e + ' ===> erro')
        setError(true)
      })
      .finally(() => {
        setLoading(false)
      })
  }


  //carregar mais produtos ao chegar no meio da lista
  const loadMoreProducts = () => {

    if (loading) return

    if (total > 0 && products.length >= total) return
    

    if (products.length < total) {
      setLoading(true)
      const paramPage = '&page=' + page
      const paramCategory = 'category=' + listParams.category || ''
      //console.log('filtrar por ' + paramCategory + paramPage)

      api.get('/products?' + paramCategory + paramPage)
        .then(response => {
          //if (isMounted){ }
          setError(false)
          setProducts([...products, ...response.data])
          setPage(page + 1)
        })
        .catch(err => {
          console.log(e + ' ===> erro')
          setError(true)
        })
        .finally(() => {
          setLoading(false)
        })
    }

  }

  //rederiza o product card ou um espaco com largura equivalente se não tiver produto
  const renderItem = ({ item }) => {
    if (item.empty)
      return <View style={styles.itemInvisible} />
    else
      return <ProductItem width={(width / 2 - 20)} {...item} />
  }

  if (products.length !== 0) {
    return (
      <FlatList bounces numColumns={numColumns}
        //showsVerticalScrollIndicator={false}
        data={formatData(products, numColumns)}
        contentContainerStyle={{ paddingVertical: 15 }}
        renderItem={renderItem}
        onEndReached={loadMoreProducts}
        onEndReachedThreshold={0.4}
        keyExtractor={(item, index) => index.toString()}
        ListFooterComponent={
          products.length !== total && loading ?
            <View style={{ margin: metrics.baseMargin }}>
              <ActivityIndicator color={colors.primary} size="small" />
            </View> : null
        }
      />
    )
  }

  if (products.length === 0) {
    if (loading)
      return (
        <View style={styles.centerContent}>
          <ActivityIndicator color={colors.primary} size="large" />
          <Text>Carregando..</Text>
        </View>
      )
    else
      if (error)
        return (
          <View style={styles.centerContent}>
            <Icon name="network-off-outline" color={colors.grayMedium} size={70} />
            <Text style={{ fontSize: 18 }}>Ocorreu algum erro na ligação</Text>
            <Text style={{ fontSize: 15 }}>Verifique a sua internet ou tente mais tarde!</Text>
          </View>
        )
      else
        return (
          <View style={styles.centerContent}>
            <Text style={{ textAlign: 'center', fontSize: 22, color: colors.grayDark }}>Nenhum produto na categoria selecionada!</Text>
          </View>
        )
  }
}


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