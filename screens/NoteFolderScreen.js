import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";
import { useContext } from "react";

import { TrashNoteContext } from "../store/context/NoteContext";
import { LabelContext } from "../store/context/LabelContext";
import { FolderContext } from "../store/context/FolderContext";

export function NoteFolderScreen({ route }) {
  const { folderId } = route.params;
  const { notes } = useContext(TrashNoteContext);

  const noteFolder = notes.filter((note) => note.folderId === folderId);

  return (
    <View>
      <Text>Note in folder {folderId}</Text>
      <Text>{noteFolder.content}</Text>
      <FlatList
        data={noteFolder}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View>
            <Text>{item.content}</Text>
          </View>
        )}
      />
    </View>
  );
}
