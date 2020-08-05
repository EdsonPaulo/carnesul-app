import React, { useState, useEffect } from "react";
import {
  Text, View, StyleSheet,
  ActivityIndicator, FlatList,
  TouchableOpacity, Dimensions
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context"

import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { colors, metrics, general } from "../../constants"

import { ProductItem, CustomInput, LoadingSpin } from '../../components'
import useDebounce from '../../hooks/useDebounce'
import api from '../../services/api'

export default index = () => {

  let isMounted = false
  const navigation = useNavigation()
  const [searchResult, setSearchResult] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [noResults, setNoResults] = useState(false)
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  async function searchProducts() {
    setIsSearching(true)
    let response = await api.get('/products?search=' + debouncedSearchTerm).catch(
      e => {
        // console.log(e + ' ===> erro') 
        setIsSearching(false)
      }
    )
    console.log(response.data)
    if (response?.data) {
      setSearchResult(response.data)
      setIsSearching(false)
      //  if (searchResult.length === 0 && searchTerm)  setNoResults(true)
    }
  }

  useEffect(() => {
    if (debouncedSearchTerm)
      searchProducts()
    else {
      setIsSearching(false)
      setSearchResult([])
      if (searchTerm) setNoResults(true)
    }
  }, [debouncedSearchTerm])


  useEffect(() => {
    isMounted = true
    return () => isMounted = false
  }, [])

  //rederiza o product card ou um espaco com largura equivalente se não tiver produto
  const renderItem = ({ item }) => {
    if (item.empty)
      return <View style={styles.itemInvisible} />
    else
      return <ProductItem width={(width / 2 - 20)} {...item} />
  }

  return (
    <SafeAreaView style={general.background}>
      <View style={styles.seachBarContainer}>
        <TouchableOpacity style={general.headerButton} onPress={() => navigation.goBack()}>
          <Ionicons name="ios-arrow-back" color="white" size={25} />
        </TouchableOpacity>

        <CustomInput rounded type="search"
          onChangeText={value => setSearchTerm(value)}
          placeholder="Pesquisar produto..."
          containerStyle={{ flex: 1 }}
          style={{ height: 40, backgroundColor: colors.bgColor }} />
      </View>

      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {
          isSearching ?
            <LoadingSpin text="Pesquisando.." />
            :
            searchTerm.length > 2 && searchResult.length !== 0 ?
              <FlatList bounces numColumns={numColumns}
                data={formatData(searchResult, numColumns)}
                contentContainerStyle={{ paddingVertical: 15 }}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
              />
              :
              debouncedSearchTerm.length > 2 && searchResult.length === 0 ?
                <View style={{ alignItems: 'center' }}>
                  <MaterialCommunityIcons name='file-search-outline' size={80} color={colors.grayDark} />
                  <Text>Nenhum resultado encontrado para "{searchTerm}"</Text>
                </View>
                :
                <View style={{ alignItems: 'center' }}>
                  <MaterialCommunityIcons name='search-web' size={80} color={colors.grayDark} />
                  <Text style={{ fontSize: 16 }}>Digite um termo para pesquisar..</Text>
                </View>
        }
      </View>
    </SafeAreaView>
  )
}


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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "whitesmoke",
  },
  seachBarContainer: {
    width: '100%',
    height: 55,
    alignItems: 'center',
    backgroundColor: colors.primaryDark,
    flexDirection: 'row',
    paddingRight: metrics.baseMargin
  },
});