import React from 'react';
import { Picker } from "@react-native-picker/picker";
import { ScrollView } from 'react-native';
import { Text, View, StyleSheet, Image, FlatList, SafeAreaView, StatusBar } from 'react-native';
import { List, Card, Title, Paragraph, Button, IconButton, Modal, Portal, Provider, TextInput, DefaultTheme } from "react-native-paper";
import tailwind from 'tailwind-rn';

export default function StoreInfo({ route, navigation }) {
  // Accordion
  const [expanded, setExpanded] = React.useState(true);
  const handlePress = () => setExpanded(!expanded);

  // Modal
  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = { backgroundColor: "white", padding: 20 };
  const [text, setText] = React.useState("");
  const [selectedLanguage, setSelectedLanguage] = React.useState("");

  const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
      ...DefaultTheme.colors,
      primary: 'red'
    },
  };

    return (
      <Provider theme={theme}>
        <SafeAreaView style={styles.container}>
            <ScrollView>
              
                <Image source={{ uri: route.params.img }} style={{
                    width: '100%',
                    height: 200
                }} />
                <View style={tailwind("flex-row items-center")}>
                    <Title style={tailwind("pl-5")}>{route.params.name}</Title>
                    <IconButton
                        icon="star"
                        color="red"
                        size={25}
                        onPress={() => console.log('Pressed')}
                    />
                </View>
                
                <Text style={tailwind("p-5")}>{route.params.location}</Text>
                <Text style={tailwind("px-5")}>Opening Hours??</Text>
                <List.Section>
                    <List.Accordion style={tailwind("pl-5 border-b-2 border-red-500")} raised theme={{ colors: { primary: 'red' } }}
                        title="Description"
                        onPress={handlePress}
                    >
                        <Text style={tailwind("p-5")}>{route.params.description}</Text>
                    </List.Accordion>
                    <List.Accordion style={tailwind("pl-5 border-b-2 border-red-500")}
                        raised theme={{ colors: { primary: 'red' } }}
                        title="Menu"
                    >
                        <FlatList
                            data={route.params.products}
                            numColumns={2}
                            keyExtractor={(item, index) => item.id}
                            renderItem={({ item }) => {
                                return (
                                    <Card style={styles.item}>
                                        <Card.Cover source={{ uri: item.url }} />
                                        <Card.Content>
                                            <Title>{item.name}</Title>
                                            <Paragraph>${item.price}</Paragraph>
                                        </Card.Content>
                                    </Card>
                                )
                            }}
                        />

                    </List.Accordion>

                    <List.Accordion style={tailwind("pl-5 border-b-2 border-red-500")}
                        raised theme={{ colors: { primary: 'red' } }}
                        title="Orders"
                    >
                        <FlatList
                            data={route.params.listings}
                            keyExtractor={(item, index) => item.id}
                            renderItem={({ item }) => {
                                return (
                                    <List.Item
                                        title={item.order}
                                        description={item.price}
                                        onPress right={() => <IconButton
                                            icon="chat"
                                            color={"red"}
                                            size={20}
                                            onPress={() => navigation.navigate("Room", { ...item })}
                                        />}
                                    />
                                )
                            }}
                        />
                        
                          <Portal>
                            <Modal
                              visible={visible}
                              onDismiss={hideModal}
                              contentContainerStyle={containerStyle}
                            >
                              <Title style={{textAlign: "center", color: "black"}}>Add Order</Title>
                              <Picker
                                  style={{height: 50, margin: "2%"}}
                                  mode="dropdown"
                                  selectedValue={selectedLanguage}
                                  onValueChange={(itemValue, itemIndex) =>
                                    setSelectedLanguage(itemValue)
                                  }
                              >
                                {route.params.products.map((item, index) => {
                                    return (<Picker.Item label={item.name} value={item.name}/>) 
                                })}
                              </Picker>
                              <TextInput
                                raised
                                theme={{ colors: { primary: "red", text: "black", label: "black", accent: "black" } }}
                                style={{height: 50, margin: "2%", backgroundColor: "white", border: "1px solid black"}}
                                placeholderTextColor="black"
                                
                                label="Price"
                                placeholder="State the price you are willing to pay"
                                value={text}
                                onChangeText={(text) => setText(text)}
                              />
                              <Button
                                style={{height: 30, margin: "2%"}}
                                mode="contained"
                                raised
                                theme={{ colors: { primary: "red" } }}
                                onPress={() => console.log("Order Submission")}
                              >
                                Submit Order
                              </Button>
                            </Modal>
                          </Portal>
                          <Button
                            mode="text"
                            raised
                            theme={{ colors: { primary: "red" } }}
                            onPress={showModal}
                          >
                            Add Order
                          </Button>
                        
                    </List.Accordion>
                </List.Section>
              
            </ScrollView>

        </SafeAreaView>
        </Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    item: {
        width: '45%',
        margin: '2%',
    }
});
