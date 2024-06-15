import { TrashNoteContext } from "../store/context/NoteContext";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
  TextInput,
  Pressable,
} from "react-native";


import { COLORS } from "../data/dummy-data";
import { LabelContext } from "../store/context/LabelContext";
import { useState, useContext, useEffect } from "react";
import { FontAwesome } from "@expo/vector-icons";
import plus from "../assets/plus.png";


export function HomeScreen({ navigation }) {
  const { notes, searchNote } = useContext(TrashNoteContext);
  const { labels } = useContext(LabelContext);
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
      navigation.navigate("Note", {
        time: timeAgo,
        noteId: item.id,
        catList: noteLabels,
        content: item.content,
        bookmark: item.isBookmarked,
        color: item.color,
      });
    }


    return (
      <Pressable
        android_ripple={{ color: "#ccc" }}
        style={({ pressed }) => [
          styles.button,
          pressed ? styles.buttonPressed : null,
        ]}
        onPress={pressHandler}
      >
        <View style={styles.note}>
          <View style={styles.noteHeader}>
            <View
              style={{
                backgroundColor: item.color,
                width: 6,
                height: 6,
                borderRadius: 3,
                marginRight: 10,
                alignSelf: "center",
              }}
            />
            <Text style={styles.noteTime}>{timeAgo}</Text>
            {item.isBookmarked && (
              <FontAwesome
                name="bookmark"
                size={20}
                color="gray"
                style={styles.bookmarkIcon}
              />
            )}
          </View>
          <View style={styles.noteLabelsContainer}>
            {noteLabels.map((label, index) => (
              <View key={index} style={styles.noteLabel}>
                <Text style={styles.noteLabelText}>{label}</Text>
              </View>
            ))}
          </View>
          <Text>{item.content}</Text>
        </View>
      </Pressable>
    );
  };


  return (
    <View style={styles.screen}>
      <View style={styles.search}>
        <FontAwesome name="search" size={20} color="#d3d3d3" />
        <TextInput
          style={styles.searchText}
          value={searchQuery}
          placeholder="Search note..."
          onChangeText={handleSearch}
        />
      </View>
      <View style={styles.container}>
        <Text style={styles.length}>{notes.length} notes</Text>
        {notes.length !== 0 ? (
          <FlatList
            keyExtractor={(item) => item.id}
            data={searchResults}
            renderItem={renderNotes}
            contentContainerStyle={styles.notesList}
          />
        ) : (
          <Text>Please add a new note</Text>
        )}
      </View>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("Add Note")}
      >
        <Image source={plus} style={styles.plusIcon} />
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    flex: 1,
    marginHorizontal: 20,
    marginTop: 20,
  },
  length: {
    fontWeight: "700",
    marginBottom: 10,
    fontSize: 20,
    color: COLORS[2],
  },
  note: {
    backgroundColor: "white",
    padding: 15,
    marginBottom: 15,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { height: 2, width: 0 },
    elevation: 3,
  },
  noteHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  noteTime: {
    color: "#d3d3d3",
    fontSize: 14,
  },
  bookmarkIcon: {
    marginLeft: "auto",
  },
  noteLabelsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 10,
  },
  noteLabel: {
    backgroundColor: "#F9F4F1",
    padding: 4,
    borderRadius: 4,
    marginRight: 4,
    marginBottom: 7,
  },
  noteLabelText: {
    color: "#343434",
  },
  search: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginBottom: 20,
    marginTop:10,
    borderColor: "#d3d3d3",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  searchText: {
    marginLeft: 10,
    flex: 1,
  },
  addButton: {
    position: "absolute",
    bottom: 30,
    right: 30,
  },
  plusIcon: {
    height: 50,
    width: 50,
  },
  button: {
    flex: 1,
  },
  buttonPressed: {
    opacity: 0.5,
  },
  notesList: {
    paddingBottom: 100,
  },
});
