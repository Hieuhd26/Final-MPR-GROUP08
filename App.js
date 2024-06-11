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
import { AddNewNote } from "./screens/AddNewNote";
import { NoteFolderScreen } from "./screens/NoteFolderScreen";

import { TrashNoteProvider } from "./store/context/NoteContext";
import { LabelProvider } from "./store/context/LabelContext";
import { FolderProvider } from "./store/context/FolderContext";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function Root() {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Entypo name="home" size={24} color="black" />
          ),
        }}
      />
      <Drawer.Screen
        name="Trash"
        component={TrashScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Entypo name="trash" size={24} color="black" />
          ),
        }}
      />
      <Drawer.Screen
        name="Folders"
        component={FolderScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Entypo name="folder" size={24} color="black" />
          ),
        }}
      />
      <Drawer.Screen
        name="Labels"
        component={LabelsScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="label" size={24} color="black" />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <FolderProvider>
        <LabelProvider>
          <TrashNoteProvider>
            <NavigationContainer>
              <Stack.Navigator>
                <Stack.Screen
                  name="Root"
                  component={Root}
                  options={{ headerShown: false }}
                />
                <Stack.Screen name="Edit Note" component={EditNoteScreen} />
                <Stack.Screen name="Add Note" component={AddNewNote} />
                <Stack.Screen name="Note Folder" component={NoteFolderScreen} />
              </Stack.Navigator>
            </NavigationContainer>
          </TrashNoteProvider>
        </LabelProvider>
      </FolderProvider>
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
