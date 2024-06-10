import React, { useContext, useState } from 'react';
import { View, Text, Button, TextInput, FlatList, Pressable } from 'react-native';
import { FolderContext } from '../store/context/FolderContext';

export function FolderScreen({navigation}){
    const { folders, addFolder, deleteFolder, updateFolder } = useContext(FolderContext);
    const [newFolderName, setNewFolderName] = useState('');
    const [editFolderId, setEditFolderId] = useState(null);
    const [editFolderName, setEditFolderName] = useState('');
  
    const addFolderHandler = () => {
      if (newFolderName.trim().length > 0) {
        addFolder(newFolderName);
        setNewFolderName('');
      }
    };
  
    const updateFolderHandler = (id) => {
      if (editFolderName.trim().length > 0) {
        updateFolder(id, editFolderName);
        setEditFolderId(null);
        setEditFolderName('');
      }
    };
  
    return (
      <View>
        <Text>Manage Folders</Text>
        <Button title='hêhe' />
        <FlatList
          data={folders}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {editFolderId === item.id ? (
                <>
                  <TextInput
                    value={editFolderName}
                    onChangeText={setEditFolderName}
                  />
                  <Button
                    title="Save"
                    onPress={() => updateFolderHandler(item.id)}
                  />
                  <Button
                    title="Cancel"
                    onPress={() => {
                      setEditFolderId(null);
                      setEditFolderName('');
                    }}
                  />
                </>
              ) : (
                <Pressable >
                <>
                  <Text>{item.name}</Text>
                  <Button
                    title="Edit"
                    onPress={() => {
                      setEditFolderId(item.id);
                      setEditFolderName(item.name);
                    }}
                  />
                  <Button
                    title="Delete"
                    onPress={() => deleteFolder(item.id)}
                  />
                </>
                </Pressable>
              )}
            </View>
          )}
        />
        <TextInput
          placeholder="New Folder Name"
          value={newFolderName}
          onChangeText={setNewFolderName}
        />
        <Button title="Add Folder" onPress={addFolderHandler} />
      </View>
    );
  };