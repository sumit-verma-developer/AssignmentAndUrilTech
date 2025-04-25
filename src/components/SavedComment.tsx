import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { storage } from '../utils/storage';
import { screenWidth, screenHeight, FONTS } from '../utils/contstants';
import { Rating } from 'react-native-ratings';

interface SavedComment {
  id: string;
  rating: number;
  comment: string;
}

const SavedCommentsScreen = () => {
  const [savedComments, setSavedComments] = useState<SavedComment[]>([]);

// console.log("savedComments",savedComments);


// console.log("storageuuuu",storage);


  useEffect(() => {
    const keys = storage.getAllKeys();
    const ratings = keys.filter(key => key.startsWith('rating_'));
    const data: SavedComment[] = [];

    ratings.forEach(key => {
      const raw = storage.getString(key);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed.comment || parsed.rating > 0) {
          data.push({
            id: key.replace('rating_', ''),
            rating: parsed.rating,
            comment: parsed.comment,
          });
        }
      }
    });

    setSavedComments(data);
  }, []);

  const renderItem = ({ item }: { item: SavedComment }) => (
    <View style={styles.card}>
      <Text style={styles.title}>ID: {item.id}</Text>
      <Text style={styles.comment}>{item.comment}</Text>
      <Rating
        readonly
        startingValue={item.rating}
        imageSize={30}
        style={{ marginTop: 10 }}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {savedComments.length === 0 ? (
        <Text style={styles.emptyText}>No saved comments yet.</Text>
      ) : (
        <FlatList
          data={savedComments}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ alignItems: 'center', paddingBottom: 20 }}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fdfdfd',
    paddingTop: 20,
  },
  card: {
    backgroundColor: '#e3f2fd',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    width: screenWidth * 0.9,
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  comment: {
    marginTop: 10,
    fontSize: 14,
    fontFamily: FONTS.medium_Font,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: screenHeight * 0.3,
    fontSize: 16,
    color: '#888',
  },
});

export default SavedCommentsScreen;
