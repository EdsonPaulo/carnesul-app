import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, AsyncStorage } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'

import { general, metrics, constants, colors } from '../../constants';
import HeaderBar from "../../components/HeaderBar"
import CustomButton from '../../components/CustomButton';

const AddressPage = () => {

    let isMounted = true

    const address_item = {
        address_1: '',
        city: '',
        country: ''
    }

    const [editing, setEditing] = useState(false)
    const [address, setAddress] = useState([])

    const getAddress = async () => {
        try {
            const data = await AsyncStorage.getItem(constants.ADDRESS_KEY)
            if (data && isMouted)
                setAddress(JSON.parse(data))
        } catch (error) {

        }
    }

    const saveAddress = async () => {
        try {
            const data = await AsyncStorage.setItem(constants.ADDRESS_KEY, JSON.stringify(address))
            if (data && isMouted)
                setAddress(JSON.parse(data))
        } catch (error) {

        }
    }

    useEffect(() => {
        isMounted = true
        return () => isMounted = false
    }, [])


    return (
        <SafeAreaView style={general.background}>
            <HeaderBar raised title="Meus Endereços" back />

            <View style={{ padding: metrics.baseMargin }}>
                {
                    address.map(item => {
                        <View style={styles.addressContainer}>
                            <Text>{item.address_1}</Text>
                        </View>
                    })
                }
                <View style={styles.addAdressContainer}>
                    {
                        !editing ? <CustomButton title="Adicionar Endereço" onPress={() => setEditing(true)} /> :
                            <GooglePlacesAutocomplete
                                placeholder='Pesquisar Endereço'
                                minLength={2} // minimum length of text to search
                                autoFocus
                                returnKeyType={'search'}
                                debounce={200} 
                                enablePoweredByContainer={false}
                                //   listViewDisplayed='auto'    // true/false/undefined
                                fetchDetails
                                // renderDescription={row => row.description} // custom description render
                                onPress={(data, details = null) => {
                                    console.log(data, details);
                                    //if(this.props.onLocationPicked)     this.props.onLocationPicked(details)
                                }}
                                //etDefaultValue={() => ''}
                                query={{
                                    // available options: https://developers.google.com/places/web-service/autocomplete
                                    key: 'AIzaSyA0-NC6ta9wWm_0vdBWYl7Rr6Dhg64q-24',
                                    language: 'pt',
                                    components: 'country:ao',
                                   // types: '(cities)' // default: 'geocode'
                                }}
                                styles={{
                                    textInput: {backgroundColor: colors.grayLight, height: 35, borderWidth: 1, borderColor: colors.grayDark},
                                    textInputContainer: { width: '100%', borderTopWidth: 0, borderBottomWidth: 0, backgroundColor: 'transparent'},
                                    description: { fontWeight: 'bold' },
                                    predefinedPlacesDescription: { color: '#1faadb' }
                                }}
                                // currentLocation // Will add a 'Current location' button at the top of the predefined places list
                                // currentLocationLabel="Localização Actual"
                                //    nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                                // GooglePlacesSearchQuery={{
                                // rankby: 'distance',
                                // type: 'cafe'
                                //  }}
                                //   GooglePlacesDetailsQuery={{ fields: 'formatted_address', }}
                                //   filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
                                //predefinedPlaces={[homePlace, workPlace]}
                                
                            //renderLeftButton={()  => <Image source={require('path/custom/left-icon')} />}
                            //renderRightButton={() => <Text>Custom text after the input</Text>}
                            />
                    }
                </View>
            </View>


        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    addressContainer: {


    },
    addAdressContainer: {

    }
})


export default AddressPage;
