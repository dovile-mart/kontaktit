import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import { useState } from 'react';
import * as Contacts from 'expo-contacts';

export default function App() {

const [contact, setContact] = useState({});

const getContacts = async () => {
  const { status } = await Contacts.requestPermissionsAsync();
  if (status === 'granted') {
    const { data } = await Contacts.getContactsAsync(
      {fields: [Contacts.Fields.PhoneNumbers]}
    )
    if (data.length > 0) {
      setContact(data);
      console.log(data)
    }
  }
}
  
/*
  {"contactType": "person", 
  "firstName": "Matti", 
  "id": "3",
  "imageAvailable": false, 
  "lastName": "Meikälainen", 
  "lookupKey": "0r3-323E2A50463E2A", 
  "name": "Matti Meikälainen", 
  "phoneNumbers": [{
      "id": "6", 
      "isPrimary": 0,
      "label": "mobile",
      "number": "1 (234) 567-89", 
      "type": "2"}]} 
*/

  return (
    <View style={styles.container}>

      <FlatList
        data={contact}
        renderItem={({ item }) =>
          <Text>{item.name + ' ' + item.phoneNumbers[0].number}</Text>}
        keyExtractor={(item, index) => index.toString()}
      />
     
      <Button title='Get Contacts' onPress={getContacts} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 100,
    paddingBottom: 20
  },
});
