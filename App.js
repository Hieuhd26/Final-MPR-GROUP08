import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { HomeScreen } from "./screens/HomeScreen";
import { TrashScreen } from "./screens/TrashScreen";
import { FolderScreen } from "./screens/FoldersScreen";
import { LabelsScreen } from "./screens/LabelsScreen";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Trash" component={TrashScreen} />
        <Drawer.Screen name="Folders" component={FolderScreen} />
        <Drawer.Screen name="Labels" component={LabelsScreen} />
      </Drawer.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
