import { StatusBar } from "expo-status-bar";
import {StyleSheet, Text,ScrollView, SafeAreaView, View, TextInput, Button, Pressable, Linking} from "react-native";
import { useEffect, useState } from "react";

export default function Spotify() {
  const CLIENT_ID = "ac1a2fde19ae43cc97034d5aa2d7f83b";
  const CLIENT_SECRET = "52fb91c8ce7d45a1ace3cc9d827fe687";

  const [searchInput, setSearchInput] = useState("");
  const [accesToken, setAccesToken] = useState("");
  const [artistAlbums, setArtistAlbums] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    var authParameters = {
      method: "POST",
      headers: {"Content-Type": "application/x-www-form-urlencoded",},
      body: "grant_type=client_credentials&client_id=" + CLIENT_ID + "&client_secret=" +  CLIENT_SECRET,};

    fetch("https://accounts.spotify.com/api/token", authParameters)
      .then((response) => response.json())
      .then((data) => setAccesToken(data.access_token));
  }, []);

  async function search() {
    console.log("Searching " + searchInput);
    
    var searchParameters = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accesToken,
      },
    };
    var songID = await fetch(
      "https://api.spotify.com/v1/search?q=" + searchInput + "&type=track",
      searchParameters
    )
      .then((response) => response.json())
      .then((data) => {
        setData(data.tracks.items);
      });
    console.log(songID);

    var albums = await fetch(
      "https://api.spotify.com/v1/artists/" +
        artistID +
        "/albums?include_groups=album&market=US&limit=50",
      searchParameters
    )
      .then((response) => response.json())
      .then((data) => setArtistAlbums(data.items));
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <TextInput
          placeholder="Escribe una cancion o artista"
          defaultValue={searchInput}
          onChangeText={(artist) => setSearchInput(artist)}
        />
        <Button title="Buscar" onPress={() => search()} />
        {data.map((item, i) => {
          return (
            <View key={i} style={{ flexDirection: "row" }}>
              <Text>Nombre </Text>
              <Text>{item.name}</Text>
              <View style={styles.ViewList}>
                <Pressable onPress={() => Linking.openURL(item.uri)}>
                  <Text style={{ color: "white" }}>Abrir</Text>
                </Pressable>
              </View>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    marginTop: "2%",
    marginHorizontal: 15,

    height: "20%"
  },
  ViewList: {
    marginHorizontal: 15,
    borderRadius: 15,
    backgroundColor: "green",
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
  }
});