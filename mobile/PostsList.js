import React, { useEffect, useState } from 'react';
import { ScrollView, Modal, Text, Pressable, StyleSheet, View } from 'react-native';
import Post from './Post';
import Comment from './Comment';
import apiClient from './api';

const PostsList = () => {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState({});
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);

  useEffect(() => {
    fetchPosts();
    fetchComments();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await apiClient.get('/posts');
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await apiClient.get('/comments');
      const commentsByPost = response.data.reduce((acc, comment) => {
        acc[comment.postId] = acc[comment.postId] || [];
        acc[comment.postId].push(comment);
        return acc;
      }, {});
      setComments(commentsByPost);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const deletePost = async (id) => {
    try {
      await apiClient.delete(`/posts/${id}`);
      setPosts(posts.filter(post => post.id !== id));
      setPostToDelete(null);
      setShowDeleteConfirm(false);
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleDelete = (id) => {
    setPostToDelete(id);
    setShowDeleteConfirm(true);
  };

  const renderDeleteConfirmModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showDeleteConfirm}
      onRequestClose={() => setShowDeleteConfirm(false)}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>¿Estás seguro de que quieres eliminar esta publicación?</Text>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => deletePost(postToDelete)}
          >
            <Text style={styles.textStyle}>Eliminar</Text>
          </Pressable>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => setShowDeleteConfirm(false)}
          >
            <Text style={styles.textStyle}>Cancelar</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );

  return (
    <ScrollView style={styles.scrollView}>
      {renderDeleteConfirmModal()}
      {posts.map(post => (
        <Post key={post.id} post={post} onDelete={handleDelete}>
          {(comments[post.id] || []).map(comment => (
            <Comment key={comment.id} body={comment.body} />
          ))}
        </Post>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginVertical: 5,
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

export default PostsList;
