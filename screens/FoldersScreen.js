import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
} from "react-native";
import { FolderContext } from "../store/context/FolderContext";
import CustomButton from "../components/Button";

export function FolderScreen({ navigation }) {
  const { folders, addFolder, deleteFolder } = useContext(FolderContext);
  const [newFolderName, setNewFolderName] = useState("");


  const addFolderHandler = () => {
    if (newFolderName.trim().length > 0) {
      addFolder(newFolderName);
      setNewFolderName("");
    }
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Manage Folders</Text>
      <TextInput
        style={styles.input}
        placeholder="New Folder Name"
        value={newFolderName}
        onChangeText={setNewFolderName}
      />
      <CustomButton
        title="Add Folder"
        backgroundColor="#007bff"
        textColor="#fff"
        onPress={addFolderHandler}
      />
      <FlatList
        data={folders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.folderItem}>
              <>
                <Text style={styles.folderName}>{item.name}</Text>
            
                <CustomButton
                  title="Delete"
                  backgroundColor="#dc3545"
                  textColor="#fff"
                  onPress={() => deleteFolder(item.id)}
                />
                <CustomButton
                  title="View"
                  backgroundColor="#007bff"
                  textColor="#fff"
                  onPress={() => {
                    navigation.navigate("Note Folder", { folderId: item.id });
                  }}
                />
              </>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  folderItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    marginTop:10
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    marginBottom: 10,
  },
  folderName: {
    flex: 1,
    fontSize: 16,
  },
});
