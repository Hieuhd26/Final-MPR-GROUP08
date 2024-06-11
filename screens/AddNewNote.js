import { useState,useContext } from "react";
import { View, Text,  StyleSheet,TouchableOpacity, Image, TextInput } from "react-native";
import check from "../assets/check.png"
import { TrashNoteContext } from "../store/context/NoteContext";

export function AddNewNote() {
  const {notes, addNote} = useContext(TrashNoteContext);
  const [content, setContent] = useState("");

  const handleContent = (text) =>{
    setContent(text);
  }

  const handleNote = () => {
    if (!content.trim()) return;
    addNote(content);
    setContent("");
  }
  return (
    <View>
      <TextInput style = {style.input} multiline placeholder="Enter note content" value={content} onChangeText={handleContent}/>
      <TouchableOpacity onPress={handleNote}>
        <Image source={check} style={style.plusIcon}/>
      </TouchableOpacity>
    </View> 
  );
}
const style = StyleSheet.create({
    input: {
        height: 250,
        marginLeft: 20,
        marginTop: 30,
        marginRight: 20,
    },
    plusIcon : {
      alignSelf: 'flex-end',
      position: 'absolute',
      top: 80,
      right:20,
      height: 50,
      width: 50
      
    },
    
    
  });
