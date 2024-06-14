
import { TrashNoteContext } from "../store/context/NoteContext";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
  ScrollView,
  TextInput,
  Pressable
} from "react-native";

import { COLORS } from "../data/dummy-data";
import { LabelContext } from  "../store/context/LabelContext";
import { useState,useContext, useEffect } from "react";
import { FontAwesome } from "@expo/vector-icons"
import { FolderContext } from "../store/context/FolderContext";
import plus from "../assets/plus.png";

export function HomeScreen({navigation}) {
  const {notes, searchNote} = useContext(TrashNoteContext);
  const { labels} = useContext(LabelContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState(notes);

  useEffect(() => {
    if (searchQuery === "") {
      setSearchResults(notes);
    } else {
      setSearchResults(searchNote(searchQuery));
    }
  }, [searchQuery, notes]);
  const handleSearch = (text) => {
    setSearchQuery(text);
  };

  const renderNotes = ({ item }) => {
    const noteLabels = item.labelIds
      .map((labelId) => {
        const label = labels.find((label) => label.id === labelId);
        return label ? label.label : null;
        
      })
      .filter((label) => label !== null);
      
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

    
    function pressHandler() {
      navigation.navigate('Note', {
        time: timeAgo,
        noteId: item.id,
        catList : noteLabels,
        content : item.content,
        bookmark: item.isBookmarked,
        color: item.color
      });
    }
    
    return (
      <Pressable 
        android_ripple={{ color: '#ccc' }}
        style={({ pressed }) => [
          style.button,
          pressed ? style.buttonPressed : null,
        ]}    
        onPress={pressHandler}>
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
            />  
            <Text style={style.noteTime}> {timeAgo}</Text>
            {item.isBookmarked ? (
                  <FontAwesome name="bookmark" size={20} color="gray" marginLeft="auto" />
                ) : (
                  ""
            )}
          </View> 
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              {noteLabels.map((label, index) => (
                <View
                  key={index}
                  style={{
                    backgroundColor: "#F9F4F1",
                    padding: 4,
                    borderRadius: 4,
                    marginRight: 4,
                    marginBottom: 7,
                  }}
                >
                  <Text style={{ color: "#343434" }}>{label}</Text>
                </View>
              ))}
          </View>
          <Text>{item.content}</Text>
          </View>
      </Pressable>
      
    );
  };

  return (
    <View>
      <View style ={style.search}>
        <FontAwesome name="search" size={20} color="#d3d3d3" />
        <TextInput
          style ={style.searchText}
          value={searchQuery}
          placeholder="Search or create labels..."
          onChangeText={handleSearch}
        />
      </View>
      <View style={style.container}>
        <Text style={style.length}>{notes.length} notes</Text>

        {(notes.length !== 0) ? 
          <FlatList keyExtractor={(item) => item.id} data={searchResults} renderItem={renderNotes}/>
        : <Text>Please add a new note</Text>}
      </View>
      <TouchableOpacity onPress={() => navigation.navigate("Add Note")}>
        <Image source={plus} style={style.plusIcon} />
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
    height: 600
  },
  length: {
    fontWeight: "700",
    marginBottom: 20,
    fontSize: 20,
    color: COLORS[2],
  },
  note: {
    backgroundColor: "white",
    padding: 10,
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
    //marginBottom: 5,
    fontSize: 14,
  },
  noteLabels: {
    marginBottom: 10,
    backgroundColor: "#F9F4F1",
    alignSelf: "flex-start",
  },
  plusIcon: {
    alignSelf: "flex-end",
    position: "absolute",
    bottom: 130,
    right: 20,
    height: 50,
    width: 50,
  },

  search : {
    marginTop: 10,
    flexDirection: "row",
    marginLeft: 20,
    marginRight: 20,
    borderStyle: "solid",
    borderColor: "#d3d3d3",
    borderWidth: 1,
    padding: 10,
  },
  searchText : {
    marginLeft: 10
  },
  button: {
    flex: 1,
  },
  buttonPressed: {
    opacity: 0.5,
  },
  
});



