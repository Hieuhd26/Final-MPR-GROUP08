import React, { useContext, useRef, useState } from 'react'
import { View, Text, TextInput, StyleSheet, Pressable, Button,TouchableOpacity, Modal, ScrollView, FlatList  } from "react-native";
import { TrashNoteContext } from "../store/context/NoteContext";
import { COLORS } from "../data/dummy-data";
import { LabelContext } from  "../store/context/LabelContext";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import 'react-native-gesture-handler';
import {BottomSheetModal, BottomSheetModalProvider} from "@gorhom/bottom-sheet"
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export const UpdateNote = ({route, navigation}) => {
    const noteId = route.params.noteId;
    const catList = route.params.catList;
    const content = route.params.content;
    const time = route.params.time;
    const bookmark = route.params.bookmark;
    const perColor = route.params.color;

    const {notes, updateNote, deleteNote, addBookmark, removeBookmark, updateColor} = useContext(TrashNoteContext);
    const [contents, setContents] = useState(content);
    const [clicks, setClicks] = useState(bookmark);
    const [selectedColor, setSelectedColor] = useState(perColor);
    const bottomSheetModalRef = useRef(null);
    const {labels} = useContext(LabelContext);

    const renderColor = ({item}) =>{
        return (
            <TouchableOpacity onPress={() => {
                setSelectedColor(item)
                updateColor(noteId,item)
            }}>
                <View style={{
                backgroundColor: item,
                width: 45,
                height:45,
                margin: 10,
                borderRadius: 30
                }}>
                </View>
            </TouchableOpacity>
            
        );
    }
    const renderLabel = ({item}) =>{
        return (
            <View style={{flexDirection: "row"}}>
                <View>
                    <Text style={{
                    backgroundColor: "#E5E4E2",
                    margin: 5,
                    padding: 4
                    }}> {item.label}</Text>
                    
                </View>
            </View>
        );
    }

    const openBottomSheet = () =>{
        bottomSheetModalRef.current?.present();
    }
   
    const updateBookmark = () =>{
        if(bookmark){
            removeBookmark(noteId);
            setClicks(false);
        }else {
            addBookmark(noteId);
            setClicks(true);
        }
    }
    const moveNoteToTrash = () =>{
        deleteNote(noteId);
        navigation.navigate('Trash');

    }
  

    const defaultColor = () =>{
        updateColor(noteId,null);
        setSelectedColor(null);

    }
    const handleSave = () => {
        updateNote(noteId, contents);
        navigation.navigate('Root');
    };

  return (
    <GestureHandlerRootView style={{flex:1}}>
    <BottomSheetModalProvider>
        <View style={{height: 1000, backgroundColor: selectedColor}}>
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              {catList.map((label, index) => (
                <View
                  key={index}
                  style={{
                    backgroundColor: "#E5E4E2",
                    padding: 4,
                    borderRadius: 4,
                    marginLeft: 15,
                    marginRight: 4,
                    marginBottom: 25,
                    marginTop: 17,
                  }}
                >
                  <Text style={{ color: "#343434", fontSize:17 }}>{label}</Text>
                </View>
              ))}
          </View>
        <TextInput value={contents} onChangeText={setContents} style={{fontSize:15, marginLeft: 15, marginRight: 15}}/>
        <Button title="Save" onPress={handleSave}/>
        <View style={style.bottomBar}>
            <Text style={{color:"gray", marginLeft: 20, width: 110}}>Edited {time}</Text>
            <TouchableOpacity onPress={updateBookmark} >
                {clicks ? <Ionicons name="bookmark" size={24} color="black" style={{marginLeft:65}} />: 
                    <Feather name="bookmark" size={24} color="black" style={{marginLeft:65}}/>
                }
            </TouchableOpacity>

            <TouchableOpacity onPress={openBottomSheet}>
                <Entypo name="dots-three-vertical" size={20} color="gray"  style={{marginLeft:150}}/>
            </TouchableOpacity>
        </View>
        <BottomSheetModal ref={bottomSheetModalRef} snapPoints={["48%"]}>
            <View style={{marginLeft: 20, marginRight: 20, marginTop:20}}>
                <View style={{flexDirection: "row"}}> 
                    <TouchableOpacity onPress={defaultColor}>
                        <MaterialIcons name="do-not-disturb-alt" size={55} color="gray" style={{margin:5}}/>
                    </TouchableOpacity>
                    <FlatList horizontal data={COLORS} renderItem={renderColor} showsHorizontalScrollIndicator={false} />
                </View>
                <View style={{flexDirection: "row", marginTop:10}}>
                <FlatList horizontal keyExtractor={(item) => item.id} data={labels.slice(0,2)} renderItem={renderLabel} style={{marginRight:0}} />
                    <Text style={{
                        backgroundColor: "#E5E4E2",
                        margin: 5,
                        padding: 4,
                    }}> + Manage Labels </Text>
                </View>
                <TouchableOpacity onPress={moveNoteToTrash}>
                    <View style={{flexDirection: "row", marginTop:20}}>
                        <AntDesign name="delete" size={24} color="black" />
                        <Text style={{top: 5, left: 5, fontSize: 17}}>Delete</Text>
                    </View>
                </TouchableOpacity>

                

            </View>
            
        </BottomSheetModal>
        
        
    </View>
    </BottomSheetModalProvider>
    </GestureHandlerRootView>
    
  )
} 

const style = StyleSheet.create({

    save: {
        backgroundColor: "#4169E1"
    },
    bottomBar: {
        position:"absolute",
        backgroundColor: "#E5E4E2",
        width: "100%",
        height: 60,
        marginTop: 740 ,
        flexDirection: "row", 
        textAlign: "center",
        alignItems:"center",
    }
})