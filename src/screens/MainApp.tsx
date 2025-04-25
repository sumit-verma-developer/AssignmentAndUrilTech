import React, {useEffect} from 'react';
import {Provider, useDispatch, useSelector} from 'react-redux';
import {
  FlatList,
  SafeAreaView,
  Text,
  ActivityIndicator,
  StyleSheet,
  View,
} from 'react-native';
import {RootState, AppDispatch, store} from '../store/store';
import {fetchComments, loadRatingsFromStorage} from '../store/actions';
import CommentCard from '../components/CommentCard';

const MainApp = () => {
  const dispatch: AppDispatch = useDispatch();
  const {comments, ratings, loading, error} = useSelector(
    (state: RootState) => state,
  );

  useEffect(() => {
    dispatch(fetchComments());
    dispatch(loadRatingsFromStorage());
  }, []);

  if (loading)
    return (
      <View style={styles.centeredContainer}>
        <ActivityIndicator size="large" style={{}} />
      </View>
    );
  if (error) return <Text style={{marginTop: 50}}>{error}</Text>;

  return (
    <>
    <SafeAreaView/>
      <FlatList
      contentContainerStyle={{justifyContent:'center',alignItems:'center'}}
      horizontal
        data={comments}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <CommentCard
            id={item.id}
            title={item.title}
            body={item.body}
            rating={ratings[item.id] || 0}
          />
        )}
      />
      
  </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
});

export default MainApp;
