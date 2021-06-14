import * as React from 'react';
import { IconButton, Colors, Searchbar } from 'react-native-paper';
import { StyleSheet, Text, View } from 'react-native';
import tailwind from 'tailwind-rn';


const LandingPageTabs = (props) => {
    const [searchQuery, setSearchQuery] = React.useState('');

    const onChangeSearch = query => setSearchQuery(query);
    return (<View >
        <View style={tailwind("flex my-5 items-center")}>
            <Searchbar style={tailwind("w-4/5 border-solid border-2 border-red-500")}
                placeholder="Search"
                onChangeText={onChangeSearch}
                value={searchQuery}
            />
        </View>

        <View style={tailwind("flex flex-row justify-center")}>

            <View style={tailwind("text-center")}>
                <IconButton
                    icon="food-fork-drink"
                    color={Colors.red500}
                    size={50}
                    onPress={() => console.log('Pressed')} />
                <Text style={tailwind("text-center")}>Hawker</Text>
            </View>
            <View style={tailwind("text-center")}>
                <IconButton
                    icon="store"
                    color={Colors.red500}
                    size={50}
                    onPress={() => console.log('Pressed')} />
                <Text >Shops</Text>
            </View>
            <View style={tailwind("text-center")}>
                <IconButton
                    icon="near-me"
                    color={Colors.red500}
                    size={50}
                    onPress={() => console.log('Pressed')} />
                <Text style={tailwind("text-center")}>Nearby</Text>
            </View>
            <View style={tailwind("text-center")}>
                <IconButton style={tailwind("mx-5")}
                    icon="home"
                    color={Colors.red500}
                    size={50}
                    onPress={() => console.log('Pressed')} />
                <Text style={tailwind("text-center")}>Neighbourhood</Text>
            </View>
        </View>

    </View>);
}

export default LandingPageTabs;