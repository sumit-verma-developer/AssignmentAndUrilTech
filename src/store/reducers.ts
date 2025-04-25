import { AnyAction } from 'redux';
import { AppState } from './types';
import { commonConstants } from './commonConstants';

const initialState: AppState = {
  comments: [],
  ratings: {},
  loading: false,
  error: null,
  data: undefined
};

export const rootReducer = (state = initialState, action: AnyAction): AppState => {
  switch (action.type) {
    case commonConstants.SET_COMMENTS:
      return { ...state, comments: action.payload };
    case commonConstants.SET_ERROR:
      return { ...state, error: action.payload };
    case commonConstants.SET_LOADING:
      return { ...state, loading: action.payload };
    case commonConstants.SET_RATING:
      return {
        ...state,
        ratings: { ...state.ratings, [action.payload.id]: action.payload.rating },
      };
    case commonConstants.SET_ALL_RATINGS:
      return {
        ...state,
        ratings: action.payload,
      };
    default:
      return state;
  }
};



