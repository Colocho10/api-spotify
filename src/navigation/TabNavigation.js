import { View, Text } from "react-native";
import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import List from "../screens/List";
import Spotify from "../screens/Spotify";


const Tab = createMaterialTopTabNavigator();

export default function TabNavigation() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="list" component={List} />
      <Tab.Screen name="spotify" component={Spotify} />
    </Tab.Navigator>
  );
}