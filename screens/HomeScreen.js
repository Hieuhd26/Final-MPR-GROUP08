import { View,Text,StyleSheet,FlatList ,Pressable} from "react-native";
import { useContext } from "react";

import { TrashNoteContext } from "../store/context/TrashContext";
import { LabelContext } from  "../store/context/LabelContext";

import { Feather } from "@expo/vector-icons";

export function HomeScreen() { 
  const { labels, addLabel, updateLabel, deleteLabel, searchLabels } = useContext(LabelContext);
  const trashNoteCtx = useContext(TrashNoteContext);
  const trashNotes = trashNoteCtx.notes;

  const renderTrashNoteItem = (itemData) => {
    const note = itemData.item;
    const noteLabels = note.labelIds
      .map((labelId) => {
        const label = labels.find((label) => label.id === labelId);
        return label ? label.label : "Unknown 🤔";
      })
      .join(", ");

    //date
    // date
    const now = new Date();
    const createAt = new Date(note.updateAt);
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
      <Pressable>
        <View
          style={{ ...styles.noteItem, backgroundColor: note.color || "#fff" }}
        >
          <Text style={styles.noteText}>Content: {note.content}</Text>
          <Text style={styles.noteText}>Labels: {noteLabels}</Text>
          <Text style={styles.noteText}>{timeAgo}</Text>
          <Text style={styles.noteText}>
            {note.isBookmarked ? (
              <Feather name="bookmark" size={24} color="red" />
            ) : (
              ""
            )}
          </Text>
        </View>
      </Pressable>
    );
  };

  return (
    <View style={styles.screen}>
      <FlatList
        data={trashNotes}
        renderItem={renderTrashNoteItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  screen: {
    flex: 1,
    padding: 20,
  },
  noteItem: {
    padding: 10,
    marginVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  noteText: {
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    width: 300,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20,
  },
});
