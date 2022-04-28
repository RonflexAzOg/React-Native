import React, {useState} from 'react';
import { Button, FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import * as Sharing from 'expo-sharing';
import { Alert, Share } from 'react-native-web';

export default function App() {
  // GIPHY const
  const [gifsGiphy, setGifsGiphy] = useState([]);
  const [termGiphy, updateTermGiphy] = useState('');

  async function ShareExample(url) {
      try {
        await Sharing.shareAsync(url)
        //   message:
        //     'React Native | A framework for building native apps using React',
        // });
      } catch (error) {
        alert(error.message);
      }
    };

  // Giphy URL
  async function fetchGifsGiphy() {
    try {
      const API_KEY = 'KG37laQpSdt9zwR69KCdKScR7ExeAKNh';
      const BASE_URL = 'http://api.giphy.com/v1/gifs/search';
      const LIMIT = 10;
      const resJson = await fetch(`${BASE_URL}?api_key=${API_KEY}&q=${termGiphy}&limit=${LIMIT}`);
      const res = await resJson.json();
      setGifsGiphy(res.data);
    } catch (error) {
      console.warn(error);
    }
  }
  // Giphy
  function onEditGiphy(newTerm) {
    updateTermGiphy(newTerm);
    fetchGifsGiphy();
  }

  // Home Return
  return (
    <View style={styles.view}>
      <TextInput
        placeholder="Rechercher sur Giphy"
        placeholderTextColor='grey'
        style={styles.textInput}
        onChangeText={(text) => onEditGiphy(text)}
      />
      <FlatList
        style={styles.flatL}
        data={gifsGiphy}
        renderItem={({item}) => (
          <View style={styles.view}>
            <Image
              resizeMode='contain'
              style={styles.image}
              source={{uri: item.images.original.url}}
            />
            <TouchableOpacity onPress={ () => ShareExample(item.images.original.url)} style={styles.button}>
              <Text style={styles.buttonText}>Partagez le GIF</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}


// CSS
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  instructions: {
    color: '#888',
    fontSize: 18,
    padding: 1,
  },
  button: {
    backgroundColor: 'blue',
    padding: 20,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 20,
    color:'#fff',
  },
  thumbnail: {
    width: 300,
    height: 300,
    resizeMode: "contain"
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  view: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'grey',
  },
  textInput: {
    width: '60%',
    height: 50,
    color: 'black',
    margin: '20%',
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: 'white',
    borderRadius: 50,
  },
  image: {
    width: 300,
    height: 150,
    borderWidth: 0,
    marginBottom: 5
  },
});