import { useContext } from "react";
import { View, Text } from "react-native";

import { TrashNoteContext } from "../store/context/TrashContext";

export function AddNewNote() {
  const trashNoteCtx = useContext(TrashNoteContext);
  return (
    <View>
      <Text>Add note screen</Text>
    </View>
  );
}
