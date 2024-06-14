import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  Pressable,
  Modal,
  Alert,
} from "react-native";
import { LabelContext } from  "../store/context/LabelContext";
import CustomButton from "../components/Button";

export function LabelsScreen() {
  const { labels, addLabel, updateLabel, deleteLabel, searchLabels } = useContext(LabelContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState(labels);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState(null);
  const [labelName, setLabelName] = useState("");

  useEffect(() => {
    if (searchQuery === "") {
      setSearchResults(labels);
    } else {
      setSearchResults(searchLabels(searchQuery));
    }
  }, [searchQuery, labels]);

  const handleSearch = (text) => {
    setSearchQuery(text);
  };

  const handleCreateLabel = () => {
    if (!searchQuery.trim()) return;
    const labelExists = labels.some(label => label.label.toLowerCase() === searchQuery.toLowerCase());
    if (labelExists) {
      Alert.alert("Label already exists", "Please enter a different label name.");
      return;
    }
    addLabel(searchQuery);
    setSearchQuery("");
  };

  const handleLabelPress = (label) => {
    setSelectedLabel(label);
    setLabelName(label.label);
    setModalVisible(true);
  };

  const handleSave = () => {
    if (selectedLabel) {
      updateLabel(selectedLabel.id, labelName);
    }
    setModalVisible(false);
  };

  const handleDelete = () => {
    if (selectedLabel) {
      deleteLabel(selectedLabel.id);
    }
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.input}
              value={labelName}
              onChangeText={setLabelName}
            />
             <View style={styles.modalButtonContainer}>
              <CustomButton
                title="Save"
                backgroundColor="#28a745"
                textColor="#fff"
                onPress={handleSave}
              />
              <CustomButton
                title="Delete"
                backgroundColor="#dc3545"
                textColor="#fff"
                onPress={handleDelete}
              />
            </View>
          </View>
        </View>
      </Modal>

      <View style={styles.header}>
        <Text style={styles.totalLabelsText}>
          Total Labels: {labels.length}
        </Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Search or create labels..."
        value={searchQuery}
        onChangeText={handleSearch}
      />
      <Pressable
        style={styles.createLabelButton}
        onPress={handleCreateLabel}
      >
        <Text style={styles.createLabelText}>Create label `{searchQuery}`</Text>
      </Pressable>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={searchResults}
        renderItem={({ item }) => (
          <Pressable onPress={() => handleLabelPress(item)}>
            <View style={styles.labelItem}>
              <Text style={styles.labelText}>{item.label}</Text>
            </View>
          </Pressable>
        )}
        keyExtractor={(item) => item.id}
        style={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  createLabelButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  createLabelText: {
    color: "#fff",
    fontWeight: "bold",
  },
  labelItem: {
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#eee",
  },
  labelText: {
    fontSize: 16,
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    //width: "100%",
    marginTop: 20,
  },
  header: {
    marginBottom: 10,
  },
  totalLabelsText: {
    fontSize: 18,
    fontWeight: "bold",
    color:'red'
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 8,
    alignItems: "center",
  },
  button: {
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    alignItems: "center",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  list: {
    flex: 1,
  },
});
