import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet } from 'react-native';
 import { LABELS } from "../data/dummy-data";
export function LabelsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);


  const handleSearch = (text) => {
    setSearchQuery(text);

    const filteredResults = LABELS.filter(label => label.label.includes(text));
    setSearchResults(filteredResults);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search Labels"
        value={searchQuery}
        onChangeText={handleSearch}
      />
      <FlatList
        data={searchResults}
        renderItem={({ item }) => (
          <View style={styles.labelItem}>
            <Text>{item.label}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  labelItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});
