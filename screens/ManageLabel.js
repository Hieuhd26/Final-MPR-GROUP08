import { useState,useContext,useEffect } from "react";
import { View, Text,  StyleSheet,TouchableOpacity, Image, TextInput, ScrollView, FlatList, Button } from "react-native";
import check from "../assets/check.png"
import { TrashNoteContext } from "../store/context/NoteContext";
import { LabelContext } from "../store/context/LabelContext";

export function ManageLabel({route, navigation}) {
  const noteId = route.params.id;
  const oldLabels = route.params.labels;
  const {notes, addNewLabel,removeLabel} = useContext(TrashNoteContext);
  const {labels, searchLabels} = useContext(LabelContext);
  const [searchQuery, setSearchQuery] = useState("");
  
  const [searchResults, setSearchResults] = useState(labels);    

  let test = labels.map(label => label.label);
  const res = test.filter(x => oldLabels.includes(x));

  const [select, setSelect] = useState(res);
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
  const renderSearch = ({item}) => {
    if(select.includes(item.label)){
      return (
        <TouchableOpacity onPress={() => {
            removeLabel(noteId,item.id);
            const filteredItems =select.filter(i => i !== item.label);
            setSelect(filteredItems)
        }}>
          <View>
            <Text style={style.selectedBox}>{item.label}</Text> 
          </View>
        </TouchableOpacity>
        
    )} else {
      return (
        <TouchableOpacity onPress={()=> {
          addNewLabel(noteId,item.id);
          setSelect((prev) => [...prev, item.label])
          }}>
        <View>
            <Text style={style.labelBox}>{item.label}</Text> 
        </View>
        </TouchableOpacity>
        
      )
    }
    
  };

  return (
    <View>
      <View style={style.searchBar}>
      <TextInput
          value={searchQuery}
          placeholder="Search or create labels..."
          onChangeText={handleSearch} style={{top: 17, left: 10}}
        />
      </View>
      <FlatList
         showsVerticalScrollIndicator={false}
         contentContainerStyle={{
         alignSelf: 'center',
         alignItems: 'center',
         height: 600,
         left: 10
         }}
         columnWrapperStyle={{flexWrap: 'wrap'}}
         data={searchResults}
         renderItem={renderSearch}
        numColumns={labels.length}
      />
      <Button title="Done" onPress={() => navigation.navigate('Root')}></Button>
    </View> 
  );
}


const style = StyleSheet.create({
    searchBar : {
      backgroundColor: "white",
      height: 50,
      marginBottom: 20
    },
    labelBox:{
      backgroundColor:"#F0FFFF",
      color: "#0818A8",
      padding: 6,
      margin: 5
    },
    selectedBox: {
      backgroundColor:"#0818A8",
      color: "white",
      padding: 6,
      margin: 5
    }
  });
