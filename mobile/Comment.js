import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Comment = ({ body }) => {
  return (
    <View style={styles.commentContainer}>
      <Text>{body}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  commentContainer: {
    backgroundColor: '#eee',
    padding: 8,
    marginVertical: 4,
    borderRadius: 4,
  },
});

export default Comment;
