import React, { useState, useContext } from "react";
import { Text, View, StyleSheet, Image, ScrollView, ActivityIndicator, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from 'react-native';

import Icon from '@expo/vector-icons/Ionicons'

import { colors, metrics, general, fonts } from "../../constants"
import CustomButton from '../../components/CustomButton'
import HeaderBar from "../../components/HeaderBar"
import PlaceholderImage from '../../components/PlaceholderImage'
import ShopContext from '../../contexts/shop/shop-context';


export default index = () => {

  const context = useContext(ShopContext)
  const navigation = useNavigation()
  const route = useRoute()
  const product = route.params.product
  const [quantity, setQuantity] = useState(1)

  const cart = [{ ...product, quantity: quantity }]

  const onChangeQuantity = (increment) => {
    if (increment) {
      if (quantity >= 1)
        setQuantity(quantity + 1)
    }
    else
      if (quantity > 1)
        setQuantity(quantity - 1)
  }

  return (
    <SafeAreaView style={[general.background, { backgroundColor: 'white' }]}>
      <HeaderBar raised title="Detalhes do Produto" back />

      <View style={styles.container}>
        <View style={styles.productImageContainer}>
          <PlaceholderImage style={{}} resizeMode="contain"
            source={(product.images?.length > 0) ? { uri: product.images[0].src } : require('../../assets/noimage.png')} />
        </View>

        <View style={styles.productBody}>
          <View style={styles.productDetails}>
            <Text style={styles.productTitle}>{product.name}</Text>
            <Text style={styles.productPrice}>
              {Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'AOA' }).format(product.price)}
            </Text>
            <View style={styles.productReviews}>

              {/** 
                <TouchableOpacity>
                  <Icon color={colors.primaryDark} style={{ margin: 5 }} type='ionicon' name={true ? 'ios-heart' : 'ios-heart-empty'} />
                </TouchableOpacity>
                <Rating
                  ratingColor={colors.primaryDark}
                  fractions={0}
                  type='star'
                  imageSize={25}
                  style={{ marginTop: 30 }}
                  onFinishRating={(value) => { //console.log(value) }}
                  count={0}
                  reviews={['Horrível', 'Mau', 'Aceitável', 'Bom', 'Muito Bom']}
                  defaultRating={0} />
              **/}

            </View>
          </View>

          <View style={styles.productActionsA}>
            <Text style={{ textAlign: 'center' }}>Quantidade</Text>
            <View style={styles.productQuantityContainer}>
              <TouchableOpacity style={{ width: 30 }} onPress={() => onChangeQuantity(false)}>
                <Icon name="ios-remove-circle" size={30} color={colors.grayDark2} />
              </TouchableOpacity>
              <Text style={styles.productQuantity}>{quantity}</Text>
              <TouchableOpacity style={{ width: 30 }} onPress={() => onChangeQuantity(true)}>
                <Icon name="ios-add-circle" size={30} color={colors.grayDark2} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.productActionsB}>
            <CustomButton title="Comprar Agora" onPress={() => { navigation.navigate('checkout', { cart: cart, subtotal: (product.price * quantity) }) }} />
            <CustomButton primary title="Adicionar ao Carrinho" onPress={() => {
              context.addProductToCart({ ...product, quantity: quantity })
              setTimeout(() => { navigation.goBack() }, 300)
            }} />
          </View>
        </View>
      </View>

    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: metrics.doubleBaseMargin,
  },
  productImageContainer: {
    width: 180,
    height: 180,
  },


  productBody: {
    // backgroundColor: 'white',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: metrics.baseMargin,

    borderRadius: metrics.doubleBaseRadius,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    // elevation: 4,
  },

  productDetails: {
    // backgroundColor: 'grey',
  },

  productTitle: {
    fontSize: fonts.input,
    margin: metrics.smallMargin,
    textAlign: 'center',
    fontWeight: 'bold',
    textTransform: 'capitalize',
    fontFamily: 'Lato'
  },
  productActionsA: {
    marginVertical: 20,
    //  backgroundColor: 'gold',
    justifyContent: 'center',

  },
  productActionsB: {
    justifyContent: 'center',
    //  backgroundColor: 'green',
    width: 250,
    paddingHorizontal: metrics.doubleBaseMargin,
  },

  productPrice: {
    fontSize: fonts.big,
    textAlign: 'center',
    fontWeight: 'bold',
    color: colors.accent,
  },
  productQuantity: {
    marginHorizontal: metrics.doubleBaseMargin,
    fontWeight: 'bold',
    fontSize: 30
  },
  productQuantityContainer: {
    width: '100%',
    marginTop: metrics.smallMargin,
    alignItems: 'center',
    flexDirection: 'row',
  }
});
