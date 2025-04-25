import {Dispatch} from 'redux';
import {Comment} from './types';
import {loadRatings, saveRatings} from '../utils/storage';
import {commonConstants} from './commonConstants';
import axios from 'axios';


export const fetchComments = () => {
    return async (dispatch: Dispatch) => {
      try {
        dispatch({ type: commonConstants.SET_LOADING, payload: true });
        const response = await axios.get<Comment[]>('https://jsonplaceholder.typicode.com/posts');
        dispatch({
          type: commonConstants.SET_COMMENTS,
          payload: response?.data,
        });
      } catch (error) {
        dispatch({
          type: commonConstants.SET_ERROR,
          payload: 'Failed to fetch comments',
        });
      } finally {
        dispatch({ type: commonConstants.SET_LOADING, payload: false });
      }
    };
  };


export const setRating = (id: number, rating: number) => {
  return (dispatch: Dispatch, getState: () => any) => {
    dispatch({type: commonConstants.SET_RATING, payload: {id, rating}});
    const updatedRatings = {
      ...getState().ratings,
      [id]: rating,
    };
    saveRatings(updatedRatings);
  };
};

export const loadRatingsFromStorage = () => {
  return (dispatch: Dispatch) => {
    const ratings = loadRatings();
    dispatch({type: commonConstants.SET_ALL_RATINGS, payload: ratings});
  };
};
