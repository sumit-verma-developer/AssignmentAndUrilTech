import {MMKV} from 'react-native-mmkv';

export const storage = new MMKV();

const RATINGS_KEY = 'ratings';

export const saveRatings = (ratings: Record<number, number>) => {
  storage.set(RATINGS_KEY, JSON.stringify(ratings));
};

export const loadRatings = (): Record<number, number> => {
  const saved = storage.getString(RATINGS_KEY);
  return saved ? JSON.parse(saved) : {};
};

export const addRating = (itemId: number, rating: number) => {
  const currentRatings = loadRatings();
  currentRatings[itemId] = rating;
  saveRatings(currentRatings);
};

export const deleteRating = (itemId: number) => {
  const currentRatings = loadRatings();
  if (itemId in currentRatings) {
    delete currentRatings[itemId];
    saveRatings(currentRatings);
  }
};

export const clearRatings = () => {
  storage.delete(RATINGS_KEY);
};
