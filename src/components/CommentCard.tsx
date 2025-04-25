import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {Rating} from 'react-native-ratings';
import {useDispatch} from 'react-redux';
import {setRating} from '../store/actions';
import {RFValue} from 'react-native-responsive-fontsize';
import {Colors, FONTS, screenHeight, screenWidth} from '../utils/contstants';
import NetInfo from '@react-native-community/netinfo';
import {storage} from '../utils/storage'; // import your MMKV instance
import { useNavigation } from '@react-navigation/native';

interface Props {
  id: number;
  title: string;
  body: string;
  rating: number;
}

const colors = ['#ffcdd2', '#c8e6c9', '#bbdefb', '#ffe082'];

const CommentCard: React.FC<Props> = ({id, title, body, rating}) => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState('');
  const [localRating, setLocalRating] = useState(rating);
  const [message, setMessage] = useState('');
  const navigation=useNavigation()

  // Load saved rating and comment on mount
  useEffect(() => {
    const saved = storage.getString(`rating_${id}`);
    if (saved) {
      const data = JSON.parse(saved);
      setLocalRating(data.rating);
      setComment(data.comment);
    }
  }, []);

  const handleRating = async (rate: number) => {
    const netState = await NetInfo.fetch();
    const isOnline = netState.isConnected;

    // Save to MMKV
    storage.set(`rating_${id}`, JSON.stringify({rating: rate, comment}));

    setLocalRating(rate);

    if (isOnline) {
      dispatch(setRating(id, rate)); // optional: dispatch to redux or send to server
    } else {
      console.log('Saved offline. Will sync when back online.');
    }
  };

  const submitComment = () => {
    if (localRating === 0 || comment.trim() === '') {
      setMessage('Please provide both a rating and a comment.');
      setTimeout(() => setMessage(''), 2000);
      return;
    }

    storage.set(`rating_${id}`, JSON.stringify({rating: localRating, comment}));
    setMessage('Comment and rating submitted!');

    // Reset after submission
    setTimeout(() => {
      setComment('');
      setLocalRating(0);
      storage.set(`rating_${id}`, JSON.stringify({rating: 0, comment: ''}));
      setMessage('');
    }, 500);
  };

  const resetComment = () => {
    setComment('');
    setLocalRating(0);
    storage.set(`rating_${id}`, JSON.stringify({rating: 0, comment: ''}));
    setMessage('Comment and rating reset.');
    setTimeout(() => setMessage(''), 2000);
  };

  return (
    <View style={[styles.card, {backgroundColor: colors[id % 4]}]}>
      <View style={styles.headerContainer}>
        <Text numberOfLines={3} style={styles.title}>
          {title}
        </Text>
        <Text numberOfLines={4} style={styles.body}>
          {body}
        </Text>
      </View>

      <TextInput
        placeholder="Write your comment..."
        value={comment}
        onChangeText={text => {
          setComment(text);
          storage.set(
            `rating_${id}`,
            JSON.stringify({rating: localRating, comment: text}),
          );
        }}
        style={styles.input}
        multiline
        maxLength={300}
        placeholderTextColor={'#000'}
      />

      <View style={{flexDirection: 'row'}}>
        <Rating
          startingValue={localRating}
          imageSize={40}
          onFinishRating={handleRating}
          style={{}}
          ratingColor="#3498db"
        />

        <TouchableOpacity
          onPress={resetComment}
          style={[styles.button, {backgroundColor: '#e57373'}]}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
      </View>

      {/* ✅ Save and Reset Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={submitComment} style={styles.button}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>

      {/*  Confirmation Message */}
      {message !== '' && <Text style={styles.message}>{message}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
    padding: 15,
    borderRadius: 10,
    elevation: 3,
    width: screenWidth * 0.9,
    height: screenHeight * 0.6,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  title: {
    fontWeight: '700',
    fontSize: RFValue(16),
    marginBottom: 5,
    alignSelf: 'center',
  },
  body: {
    fontSize: 14,
    color: '#444',
    fontFamily: FONTS.medium_Font,
    alignSelf: 'center',
  },
  input: {
    width: '100%',
    borderColor: '#aaa',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    minHeight: 60,
    fontSize: RFValue(10),
    fontWeight: '600',
    // fontFamily: FONTS.Bold_Font,
    color: Colors.lightText,
    height: '35%',
    marginBottom: 30,
    marginTop: 20,
  },

  buttonContainer: {
    flexDirection: 'row',
    marginTop: 40,
    justifyContent: 'center',
    width: '100%',
    alignSelf: 'center',
  },
  button: {
    backgroundColor: '#4caf50',
    borderRadius: 8,
    marginLeft: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: '30%',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 10,
  },
  message: {
    marginTop: 10,
    color: '#388e3c',
    fontSize: 14,
    fontWeight: '600',
  },
  headerContainer: {
    width: '100%',
  },
});

export default CommentCard;
