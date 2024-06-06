import { View,Text, TouchableOpacity, StyleSheet } from "react-native";
import { NOTES } from "../data/dummy-data";
import { COLORS } from "../data/dummy-data";
import { useState } from "react";
import { FlatList, ScrollView } from "react-native-gesture-handler";


export function HomeScreen() { // <-- Make sure to use a named export here
  const [notes, setNotes] = useState(NOTES);
  const renderNotes = ({item}) => {
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
    return(
      <View style={style.note}>
        <Text>
          <Text style={{backgroundColor:item.color,
            color: item.color, padding: 20, borderRadius: 100,overflow:'hidden'
          }}>.</Text>
          <Text style={style.noteTime}> {timeAgo}</Text>
        </Text>
        
        <Text>{item.content}</Text>
      </View>
    );
  };   
    return (
      <View style={style.container}>
        <Text style={style.length}>{notes.length} notes</Text>
        <ScrollView>
          <FlatList data={notes} renderItem={renderNotes} />
        </ScrollView> 
      </View>
    );
  }

  const style = StyleSheet.create({
    container : {
      marginLeft: 20,
      marginTop: 30,
      marginBottom: 200,
      marginRight:20,
    },
    length : {
      fontWeight: "700",
      marginBottom:20,
      fontSize: 20, 
      color: COLORS[2]
    },
    note :{
      backgroundColor: "white",
      padding: 20,
      marginTop: 20,
      shadowColor: "#000000",
      shadowOpacity: 0.2,
      shadowRadius: 1,
      shadowOffset: {
        height: 1,
        width: 1
      }
    },
    noteTime : {
      color:"#d3d3d3",
      marginBottom: 5
    },
    timeView : {
      flexDirection: 'row'
    }
  })