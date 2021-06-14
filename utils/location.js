import * as Location from 'expo-location';



export const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();

    let location = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.Highest});

    const geoLocation = {
        longitude: location.coords.longitude,
        latitude: location.coords.latitude
    }

    let geocode = await Location.reverseGeocodeAsync(geoLocation);
    return geocode[0].postalCode;
}