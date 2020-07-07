import React from  'react'
import { View, Image, Dimensions, StyleSheet } from 'react-native'
import Swiper from 'react-native-swiper'
import { colors } from '../constants'
const { width } = Dimensions.get('window')

const SwiperCards = ({  }) => {
    return (
        <View style={styles.container}>
            <Swiper style={styles.wrapper} height={190} dotColor={colors.grayLight} activeDotColor={colors.accent} autoplay>
                <Image style={styles.slide} resizeMode="stretch" source={require("../assets/banners/banner1.jpg")} />
                <Image style={styles.slide} resizeMode="stretch" source={require("../assets/banners/banner2.jpg")} />
                <Image style={styles.slide} resizeMode="stretch" source={require("../assets/banners/banner3.jpg")} />
                <Image style={styles.slide} resizeMode="stretch" source={require("../assets/banners/banner4.jpg")} />
            </Swiper>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    slide: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.grayMedium,
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold'
    },
    image: {
        width,
        flex: 1
    }
})

export default SwiperCards