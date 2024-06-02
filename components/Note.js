import { View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
export function Node({ id, color, labelIds, content, updateAt, isBookmarked }) {
  return (
    <View>
      <View>
        <Text>10h ago</Text>
      </View>
      <View>
        <Text>Label here</Text>
      </View>
      <View>Content</View>
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
});
