import { View, Text, TouchableOpacity, StyleSheet, Image,FlatList, ScrollView } from "react-native";
import { TrashNoteContext } from "../store/context/NoteContext";
import { COLORS } from "../data/dummy-data";
import { LabelContext } from  "../store/context/LabelContext";
import { useState,useContext } from "react";

import plus from "../assets/plus.png";

export function HomeScreen({navigation}) {
  const {notes} = useContext(TrashNoteContext);
  const { labels} = useContext(LabelContext);


  
  const renderNotes = ({ item }) => {
    const noteLabels = item.labelIds;
    if (noteLabels === null){
        return ""
    } else {
      noteLabels.map((labelId) => {
        const label = labels.find((label) => label.id === labelId);
        return label ? label.label : "";
        
      })
      .join(" | ");
    }
      
    const now = new Date();
    const createAt = new Date(item.updateAt);
    const elapsedTime = now - createAt;

    const seconds = Math.floor(elapsedTime / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    let timeAgo;
    if (days > 0) {
      timeAgo = `${days} day${days > 1 ? "s" : ""} ago`;
    } else if (hours > 0) {
      timeAgo = `${hours} hour${hours > 1 ? "s" : ""} ago`;
    } else if (minutes > 0) {
      timeAgo = `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    } else {
      timeAgo = `${seconds} second${seconds > 1 ? "s" : ""} ago`;
    }
    
    
    return (
      <View style={style.note}>
        <View style={{flexDirection:"row"}}>
          <View
            style={{
              backgroundColor: item.color,
              color: item.color,
              width:3,
              height:3,
              padding: 5,
              borderRadius: 20,
              overflow: "hidden",
              marginRight: 10
            }}
          >  
          </View>
          <Text style={style.noteTime}> {timeAgo}</Text>
        </View>
        <Text style={style.noteLabels}>{noteLabels}</Text>
        <Text>{item.content}</Text>
      </View>
    );
  };

  return (
    <View>
      <View style={style.container}>
        <Text style={style.length}>{notes.length} notes</Text>
        {(notes.length !== 0) ? <FlatList keyExtractor={(item) => item.id} data={notes} renderItem={renderNotes}/>
        : <Text>Please add a new note</Text>}
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('Add Note')}>
        <Image source={plus} style={style.plusIcon}/>
      </TouchableOpacity>
    
    </View>
    
  );
}

const style = StyleSheet.create({
  container: {
    marginLeft: 20,
    marginTop: 30,
    marginBottom: 200,
    marginRight: 20,
  },
  length: {
    fontWeight: "700",
    marginBottom: 20,
    fontSize: 20,
    color: COLORS[2],
  },
  note: {
    backgroundColor: "white",
    padding: 20,
    marginTop: 20,
    shadowColor: "#000000",
    shadowOpacity: 0.2,
    shadowRadius: 1,
    shadowOffset: {
      height: 1,
      width: 1,
    },
  },
  noteTime: {
    color: "#d3d3d3",
    marginBottom: 5,
    fontSize: 14
  },
  noteLabels:{
    marginBottom:10,
    backgroundColor: "#F9F4F1",
    alignSelf:"flex-start",
  },
  plusIcon : {
    alignSelf: 'flex-end',
    position: 'absolute',
    bottom: 130,
    right:20,
    height: 50,
    width: 50
    
  },
  
  
});