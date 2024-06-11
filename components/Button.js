import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

const CustomButton = ({ title, onPress, style, textStyle }) => {
  return (
    <Pressable style={[styles.button, style]} onPress={onPress}>
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    margin: 5,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});

export default CustomButton;