import React from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';

const Post = ({ post, onDelete, onEdit, children }) => {
  return (
    <View style={styles.postContainer}>
      <Text style={styles.title}>{post.title}</Text>
      <Text style={styles.author}>{post.author}</Text>
      <Image source={{ uri: post.image }} style={styles.image} />
      <View style={styles.buttonContainer}>
        <Button title="Eliminar" onPress={() => onDelete(post.id)} color="#ff6347" />
      </View>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  postContainer: {
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  author: {
    fontSize: 14,
    color: '#666',
  },
  image: {
    height: 200,
    width: '100%',
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
});

export default Post;
