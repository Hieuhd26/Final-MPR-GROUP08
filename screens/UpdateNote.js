import React, { useContext, useRef, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, TouchableOpacity, ScrollView, FlatList } from "react-native";
import { TrashNoteContext } from "../store/context/NoteContext";
import { COLORS } from "../data/dummy-data";
import Ionicons from '@expo/vector-icons/Ionicons';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import 'react-native-gesture-handler';
import { BottomSheetModal, BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export const UpdateNote = ({ route, navigation }) => {
    const noteId = route.params.noteId;
    const initialCatList = route.params.catList;
    const content = route.params.content;
    const time = route.params.time;
    const bookmark = route.params.bookmark;
    const perColor = route.params.color;

    const { notes, updateNote, deleteNote, addBookmark, removeBookmark, updateColor, updateCategories } = useContext(TrashNoteContext);
    const [contents, setContents] = useState(content);
    const [clicks, setClicks] = useState(bookmark);
    const [selectedColor, setSelectedColor] = useState(perColor);
    const [catList, setCatList] = useState(initialCatList);
    const bottomSheetModalRef = useRef(null);

    const renderColor = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => {
                setSelectedColor(item);
                updateColor(noteId, item);
            }}>
                <View style={[styles.colorCircle, { backgroundColor: item }]} />
            </TouchableOpacity>
        );
    };

    const renderLabel = ({ item }) => {
        return (
            <Text style={styles.labelScrollItem}>{item}</Text>
        );
    };

    const openBottomSheet = () => {
        bottomSheetModalRef.current?.present();
    };

    const updateBookmark = () => {
        if (clicks) {
            removeBookmark(noteId);
            setClicks(false);
        } else {
            addBookmark(noteId);
            setClicks(true);
        }
    };

    const moveNoteToTrash = () => {
        deleteNote(noteId);
        navigation.navigate('Trash');
    };

    const defaultColor = () => {
        updateColor(noteId, null);
        setSelectedColor(null);
    };

    const handleSave = () => {
        updateNote(noteId, contents);
        navigation.navigate('Root');
    };

    const manageLabel = () => {
        navigation.navigate('Manage Labels', {
            id: noteId,
            labels: catList,
            onGoBack: handleGoBackFromManageLabels
        });
    };

    const handleGoBackFromManageLabels = (updatedLabels) => {
        setCatList(updatedLabels);
        updateCategories(noteId, updatedLabels);
    };

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <BottomSheetModalProvider>
                <View style={[styles.container, { backgroundColor: selectedColor }]}>
                    <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
                        <View style={styles.labelsContainer}>
                            {catList.map((label, index) => (
                                <View key={index} style={styles.label}>
                                    <Text style={styles.labelText}>{label}</Text>
                                </View>
                            ))}
                        </View>
                        <TextInput
                            value={contents}
                            onChangeText={setContents}
                            style={styles.textInput}
                            multiline
                        />
                        <Button title="Save" onPress={handleSave} />
                    </ScrollView>
                    <View style={styles.bottomBar}>
                        <Text style={styles.editedTime}>Edited {time}</Text>
                        <TouchableOpacity onPress={updateBookmark}>
                            {clicks ? (
                                <Ionicons name="bookmark" size={24} color="black" />
                            ) : (
                                <Feather name="bookmark" size={24} color="black" />
                            )}
                        </TouchableOpacity>
                        <TouchableOpacity onPress={openBottomSheet}>
                            <Entypo name="dots-three-vertical" size={20} color="gray" />
                        </TouchableOpacity>
                    </View>
                    <BottomSheetModal ref={bottomSheetModalRef} snapPoints={["50%"]}>
                        <View style={styles.bottomSheetContent}>
                            <View style={styles.colorSelection}>
                                <TouchableOpacity onPress={defaultColor}>
                                    <MaterialIcons name="do-not-disturb-alt" size={55} color="gray" />
                                </TouchableOpacity>
                                <FlatList horizontal data={COLORS} renderItem={renderColor} showsHorizontalScrollIndicator={false} />
                            </View>
                            <FlatList
                                horizontal
                                data={catList}
                                renderItem={renderLabel}
                                keyExtractor={(item, index) => `${item}-${index}`}
                                showsHorizontalScrollIndicator={false}
                                style={styles.labelsScroll}
                            />
                            <TouchableOpacity onPress={manageLabel}>
                                <Text style={styles.labelScrollItem}>+ Manage Labels</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={moveNoteToTrash} style={styles.deleteButton}>
                                <AntDesign name="delete" size={24} color="black" />
                                <Text style={styles.deleteButtonText}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    </BottomSheetModal>
                </View>
            </BottomSheetModalProvider>
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    labelsContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginBottom: 20,
    },
    label: {
        backgroundColor: "#E5E4E2",
        padding: 6,
        borderRadius: 4,
        marginRight: 6,
        marginBottom: 6,
    },
    labelText: {
        color: "#343434",
        fontSize: 16,
    },
    textInput: {
        fontSize: 18,
        marginBottom: 20,
        backgroundColor: "white",
        padding: 10,
        borderRadius: 5,
    },
    bottomBar: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: 60,
        backgroundColor: "#E5E4E2",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
    },
    editedTime: {
        color: "gray",
    },
    colorCircle: {
        width: 45,
        height: 45,
        margin: 10,
        borderRadius: 30,
    },
    bottomSheetContent: {
        padding: 20,
    },
    colorSelection: {
        flexDirection: "row",
        alignItems: "center",
    },
    labelsScroll: {
        marginTop: 20,
    },
    labelScrollItem: {
        backgroundColor: "#E5E4E2",
        margin: 5,
        padding: 6,
        borderRadius: 4,
    },
    deleteButton: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 20,
    },
    deleteButtonText: {
        marginLeft: 5,
        fontSize: 17,
    },
});

export default UpdateNote;

