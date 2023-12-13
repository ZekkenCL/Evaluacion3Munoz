import React from 'react';
import { View, StyleSheet } from 'react-native';
import PostsList from './PostsList';

const App = () => {
  return (
    <View style={styles.container}>
      <PostsList />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});

export default App;
