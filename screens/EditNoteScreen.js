import { useContext } from "react";
import { View, Text } from "react-native";

import { TrashNoteContext } from "../store/context/NoteContext";

export function EditNoteScreen() {
  const trashNoteCtx = useContext(TrashNoteContext);
  return (
    <View>
      <Text>edit note screen</Text>
    </View>
  );
}
