import React, {useState} from 'react';
import { Button, FlatList, Image, Modal, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import * as Sharing from 'expo-sharing';
import { Alert, Share } from 'react-native-web';

export default function App() {
  // GIPHY const
  const [gifsGiphy, setGifsGiphy] = useState([]);
  const [termGiphy, updateTermGiphy] = useState('');

  //Modal
  const [modalVisible, setModalVisible ] = useState(false);

  async function ShareExample(url) {
      try {
        await Sharing.shareAsync(url)
        // Unable to send a URL, you have to create a temp file to be able to download it and then send it
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

      {/* Input */}
      <TextInput
        placeholder="Rechercher sur Giphy"
        placeholderTextColor='grey'
        style={styles.textInput}
        onChangeText={(text) => onEditGiphy(text)}
      />

      {/* List */}
      <FlatList
        style={styles.flatL}
        data={gifsGiphy}
        renderItem={({item}) => (
          <View style={styles.viewImage}>

            {/* GIF */}
            <Image
              resizeMode='contain'
              style={styles.image}
              source={{uri: item.images.original.url}}
            />

            <View style={styles.centeredView}>

              {/* Modal */}
              <Modal 
                animationType='slide'
                transparent={false}
                visible={modalVisible}
                onRequestClose={() => {
                  Alert.alert('Modal has been closed.');
                  setModalVisible(!modalVisible);
                }}
              >

                <View style={styles.centeredView}>

                  {/* Modal */}
                  <View style={styles.modalView}>

                    {/* GIF -> is not the correct one when clicked */}
                    <Image
                      resizeMode='contain'
                      style={styles.imageModal}
                      source={{url: item.images.original.url}}
                    />

                    {/* Button close modal */}
                    <Pressable
                      style={styles.button}
                      onPress={() => setModalVisible(!modalVisible)}
                    >
                      <Text style={styles.textStyle}>Revenir au gif</Text>
                    </Pressable>

                  </View>
                </View>
              </Modal>

              {/* Button fullscreen */}
              <Pressable
                style={styles.button}
                onPress={() => setModalVisible(true)}
              >
                <Text style={styles.textStyle}>Voir en plein écran</Text>
              </Pressable>

              {/* Button share */}
              <TouchableOpacity 
                onPress={ () => ShareExample(item.images.original.url)}
                style={styles.button}
              >
                <Text style={styles.textStyle}>Partager le GIF</Text>
              </TouchableOpacity>

            </View>
          </View>
        )}
      />
    </View>
  );
}


// CSS
const styles = StyleSheet.create({
  // All
  view: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'grey',
  },

  // View per gif
  viewImage: {
    flex: 1,
    justifyContent : 'center',
    alignItems: 'center',
  },

  // For modal & button
  centeredView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 22,
  },

  // Modal
  modalView: {
    backgroundColor: "grey",
    borderRadius: 20,
    padding: 350,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },

  // Text
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },

  // Button
  button: {
    backgroundColor: '#000',
    padding: 20,
    borderRadius: 5,
    margin: 10,
  },

  // Input
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

  // Image
  image: {
    width: 300,
    height: 150,
    borderWidth: 0,
  },

  // Image in modal
  imageModal: {
    width: 300,
    height: 350,
    borderWidth: 0,
    marginBottom: 5
  },
});