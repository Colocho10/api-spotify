import { StyleSheet, Text, View, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import Icon from 'react-native-vector-icons/FontAwesome';


export default function Home() {
  const nav = useNavigation();
  return (
    <View style={{ ...styles.container }}>
      <Button  icon={{
    name: "arrow-right",
    size: 15,
    color: "white"
  }} title="Spotify" type="outline" onPress={() => nav.navigate("TabNavigation")} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "lightblue"
  },
});