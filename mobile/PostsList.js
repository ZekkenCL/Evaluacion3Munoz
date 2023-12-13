import React, { useEffect, useState } from 'react';
import { View, ScrollView, Alert } from 'react-native';
import Post from './Post';
import apiClient from './api';

const PostsList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await apiClient.get('/posts');
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
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


  return (
    <ScrollView>
      {posts.map(post => (
        <Post key={post.id} post={post} onDelete={handleDelete} />
      ))}
    </ScrollView>
  );
};

export default PostsList;
