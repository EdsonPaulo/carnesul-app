import React, { useState, useEffect } from "react";
import {
  Text, View, StyleSheet, ScrollView,
  SafeAreaView, ActivityIndicator,
  TouchableOpacity, TextInput, Alert
} from "react-native";
import { useNavigation } from "@react-navigation/native";
//import { SafeAreaView } from "react-native-safe-area-context"

import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { colors, metrics, general } from "../../constants";
import HeaderBar from '../../components/HeaderBar';
import CustomInput from '../../components/CustomInput'
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
    let response = await api.get('/products', { params: { search: debouncedSearchTerm } }).catch(
      e => {
        // Alert.alert('ERRO', ''+e.message)
        // console.log(e + ' ===> erro') 
        setIsSearching(false)
      }
    )

    if (response?.data) {
      setSearchResult(response.data)
      setIsSearching(false)
      if (searchResult.length === 0 && searchTerm)
        setNoResults(true)
    }
  }

  useEffect(() => {
    if (debouncedSearchTerm)
      searchProducts()
    else {
      setIsSearching(false)
      setSearchResult([])
      if (searchTerm)
        setNoResults(true)
    }
  }, [debouncedSearchTerm])


  useEffect(() => {
    isMounted = true
    return () => isMounted = false
  }, [])

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
            <View style={{ alignItems: 'center' }}>
              <ActivityIndicator size="large" color={colors.primary} />
              <Text style={{ fontSize: 16 }}>Pesquisando..</Text>
            </View>
            :
            searchTerm && noResults ?
              <View style={{ alignItems: 'center' }}>
                <MaterialCommunityIcons name='file-search-outline' size={80} color={colors.grayDark} />
                <Text>Nenhum resultado encontrado para "{searchTerm}"</Text>
              </View>
              :
              <View style={{ alignItems: 'center' }}>
                <MaterialCommunityIcons name='search-web' size={80} color={colors.primary} />
                <Text style={{ fontSize: 16 }}>Digite um termo para pesquisar..</Text>
              </View>
        }
      </View>
    </SafeAreaView>
  )
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