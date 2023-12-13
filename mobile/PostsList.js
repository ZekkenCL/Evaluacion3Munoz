import React, { useEffect, useState } from 'react';
import { ScrollView, Alert, StyleSheet } from 'react-native';
import Post from './Post';
import Comment from './Comment';
import apiClient from './api';

const PostsList = () => {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState({});

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
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleDelete = (id) => {
    Alert.alert('Eliminar Publicación', '¿Estás seguro?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Eliminar', onPress: () => deletePost(id) },
    ]);
  };

  const handleEdit = (post) => {
    console.log('Editar post:', post);
    // Implementar lógica de edición aquí
  };

  return (
    <ScrollView style={styles.scrollView}>
      {posts.map(post => (
        <Post key={post.id} post={post} onDelete={handleDelete} onEdit={handleEdit}>
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
});

export default PostsList;
