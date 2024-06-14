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
import { TrashNoteContext } from "../store/context/NoteContext";
import { LabelContext } from "../store/context/LabelContext";
import bin from "../assets/bin.png";
import { Feather } from "@expo/vector-icons";
import CustomButton from "../components/Button";

export function TrashScreen() {
  const { labels, addLabel, updateLabel, deleteLabel, searchLabels } =
    useContext(LabelContext);
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
        return label ? label.label : null;
      })
      .filter((label) => label !== null);

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
        <View style={{ ...styles.noteItem }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View
                style={{
                  backgroundColor: note.color,
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                }}
              ></View>
              <View style={{ width: 8 }} />
              <Text style={styles.noteText}>{timeAgo}</Text>
            </View>
            <View style={styles.noteText}>
              {note.isBookmarked ? (
                <Feather name="bookmark" size={24} color="red" />
              ) : (
                ""
              )}
            </View>
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
                  marginBottom: 4,
                }}
              >
                <Text style={{ color: "black" }}>{label}</Text>
              </View>
            ))}
          </View>
          <View>
            <Text style={styles.noteText}>{note.content}</Text>
          </View>
        </View>
      </Pressable>
    );
  };

  return (
    <View style={styles.screen}>
      <View style={styles.buttonContainer}>
        <View style={{ flex: 1, }}>
          <Text style={{color:'red', fontSize:14}}>{trashNotes.length} notes</Text>
        </View>
        {/* <Button title="Restore All" onPress={trashNoteCtx.restoreAll} /> */}
        <CustomButton
          title="Restore All"
          backgroundColor="#007bff"
          textColor="#fff"
          onPress={trashNoteCtx.restoreAll}
        />
        <View style={{ width: 8 }} />
        {/* <Button title="Empty Trash" onPress={trashNoteCtx.emptyTrash} /> */}
        <CustomButton
          title="Empty Trash"
          backgroundColor="#dc3545"
          textColor="#fff"
          onPress={trashNoteCtx.emptyTrash}
        />
      </View>
      <FlatList
        data={trashNotes}
        renderItem={renderTrashNoteItem}
        keyExtractor={(item) => item.id}
      />

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
              <CustomButton
                  title="Restore"
                  backgroundColor="#28a745"
                  textColor="#fff"
                  onPress={handleRestore}
                />
                <CustomButton
                  title="Delete"
                  backgroundColor="#dc3545"
                  textColor="#fff"
                  onPress={handleDelete}
                />
                <CustomButton
                  title="Cancel"
                  backgroundColor="#6c757d"
                  textColor="#fff"
                  onPress={closeModal}
                />
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
    backgroundColor: "white",
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
    backgroundColor:'white'
  },
  noteText: {
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
    marginBottom:5
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
