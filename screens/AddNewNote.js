import { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import check from "../assets/check.png";

import { TrashNoteContext } from "../store/context/NoteContext";
import { TextInput } from "react-native-gesture-handler";

export function AddNewNote() {
  const trashNoteCtx = useContext(TrashNoteContext);
  return (
    <View>
      <TextInput
        style={style.input}
        multiline
        placeholder="Enter note content"
      />
      <TouchableOpacity>
        <Image source={check} style={style.plusIcon} />
      </TouchableOpacity>
    </View>
  );
}
const style = StyleSheet.create({
  input: {
    height: 450,
    marginLeft: 20,
    marginTop: 30,
    marginRight: 20,
  },
  plusIcon: {
    alignSelf: "flex-end",
    position: "absolute",
    top: 200,
    right: 20,
    height: 50,
    width: 50,
  },
});
