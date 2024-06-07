import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  FlatList,
  Modal,
  Pressable,
} from "react-native";
import { TrashNoteContext } from "../store/context/TrashContext";
import { LabelContext } from  "../store/context/LabelContext";
import bin from "../assets/bin.png";
import { Feather } from "@expo/vector-icons";

export function TrashScreen() {
  const { labels, addLabel, updateLabel, deleteLabel, searchLabels } = useContext(LabelContext);
  const trashNoteCtx = useContext(TrashNoteContext);
  const trashNotes = trashNoteCtx.trashNotes;

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);

  const openModal = (note) => {
    setSelectedNote(note);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedNote(null);
    setModalVisible(false);
  };

  const handleRestore = () => {
    trashNoteCtx.restoreNote(selectedNote.id);
    closeModal();
  };

  const handleDelete = () => {
  trashNoteCtx.deleteNotePer(selectedNote.id);
    closeModal();
  };

  if (trashNotes.length === 0) {
    return (
      <View style={styles.container}>
        <Image source={bin} style={styles.image} />
        <Text style={styles.text}>The trash is empty ⛔</Text>
      </View>
    );
  }

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
      <Pressable onPress={() => openModal(note)}>
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
      <View style={styles.buttonContainer}>
        <Button title="Restore All" onPress={trashNoteCtx.restoreAll} />
        <Button title="Empty Trash" onPress={trashNoteCtx.emptyTrash} />
      </View>

      {selectedNote && (
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={closeModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>
                Content: {selectedNote.content}
              </Text>
              <View style={styles.modalButtonContainer}>
                <Button title="Restore" onPress={handleRestore} />
                <Button title="Delete" onPress={handleDelete} />
                <Button title="Cancel" onPress={closeModal} />
              </View>
            </View>
          </View>
        </Modal>
      )}
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
