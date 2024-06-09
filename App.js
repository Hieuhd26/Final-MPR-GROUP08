import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { HomeScreen } from "./screens/HomeScreen";
import { TrashScreen } from "./screens/TrashScreen";
import { FolderScreen } from "./screens/FoldersScreen";
import { LabelsScreen } from "./screens/LabelsScreen";
import { EditNoteScreen } from "./screens/EditNoteScreen";
import {AddNewNote} from "./screens/AddNewNote"
import { TrashNoteProvider } from "./store/context/TrashContext";
import { LabelProvider } from "./store/context/LabelContext";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();


 function Root()  {
  return (
            <Drawer.Navigator initialRouteName="Home">
              <Drawer.Screen name="Home" component={HomeScreen} />
              <Drawer.Screen name="Trash" component={TrashScreen} />
              <Drawer.Screen name="Folders" component={FolderScreen} />
              <Drawer.Screen name="Labels" component={LabelsScreen} />
            </Drawer.Navigator>
  )
 }


export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <LabelProvider>
        <TrashNoteProvider>
            <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen name="Root" component={Root} options={{headerShown: false}}/>
              <Stack.Screen name="Edit Note" component={EditNoteScreen} />
              <Stack.Screen name="Add Note" component={AddNewNote} />
            </Stack.Navigator>
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
