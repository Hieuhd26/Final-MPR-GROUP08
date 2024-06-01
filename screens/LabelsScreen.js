import React, { useState, useEffect } from "react";
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
import { LABELS } from "../data/dummy-data";

export function LabelsScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [totalLabels, setTotalLabels] = useState(LABELS); // ko thêm lable mới dựa trên mảng searchreult
  const [searchResults, setSearchResults] = useState(LABELS);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState(null);
  const [labelName, setLabelName] = useState("");

  useEffect(() => {
    if (searchQuery === "") {
      setSearchResults(totalLabels);
    } else {
      const filteredResults = totalLabels.filter((label) =>
        label.label.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filteredResults);
    }
  }, [searchQuery, totalLabels]);

  const handleSearch = (text) => {
    setSearchQuery(text);
  };

  const handleCreateLabel = () => {
    if (!searchQuery.trim()) return;

    const newLabel = {
      id: Math.random().toString(),
      label: searchQuery,
    };

    const updatedLabels = [...totalLabels, newLabel];
    setTotalLabels(updatedLabels);
    setSearchQuery("");
  };

  const handleLabelPress = (label) => {
    setSelectedLabel(label);
    setLabelName(label.label);
    setModalVisible(true);
  };

  const handleSave = () => {
    const updatedLabels = totalLabels.map((label) =>
      label.id === selectedLabel.id ? { ...label, label: labelName } : label
    );
    setTotalLabels(updatedLabels);
    setModalVisible(false);
  };

  const handleDelete = () => {
    const updatedLabels = totalLabels.filter(
      (label) => label.id !== selectedLabel.id
    );
    setTotalLabels(updatedLabels);
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
            <View>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={handleSave}
              >
                <Text style={styles.buttonText}>Save</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={handleDelete}
              >
                <Text style={styles.buttonText}>Delete</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      <View style={styles.header}>
        <Text style={styles.totalLabelsText}>
          Total Labels: {totalLabels.length}
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
  header: {
    marginBottom: 10,
  },
  totalLabelsText: {
    fontSize: 18,
    fontWeight: "bold",
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
  modalText: {
    marginBottom: 20,
    fontSize: 18,
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
