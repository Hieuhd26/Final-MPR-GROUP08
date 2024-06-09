import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

import { HomeScreen } from "./screens/HomeScreen";
import { TrashScreen } from "./screens/TrashScreen";
import { FolderScreen } from "./screens/FoldersScreen";
import { LabelsScreen } from "./screens/LabelsScreen";
import { EditNoteScreen } from "./screens/EditNoteScreen";

import { TrashNoteProvider } from "./store/context/TrashContext";
import { LabelProvider } from "./store/context/LabelContext";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function HomeStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="EditNote" component={EditNoteScreen} />
      {/*thêm vào đang bí  */}
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <LabelProvider>
        <TrashNoteProvider>
          <NavigationContainer>
            <Drawer.Navigator initialRouteName="Home">
              <Drawer.Screen name="Home" component={HomeScreen} />
              <Drawer.Screen name="Trash" component={TrashScreen} />
              <Drawer.Screen name="Folders" component={FolderScreen} />
              <Drawer.Screen name="Labels" component={LabelsScreen} />
            </Drawer.Navigator>
          </NavigationContainer>
        </TrashNoteProvider>
      </LabelProvider>
      
    </>
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
