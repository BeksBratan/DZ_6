import { configureStore } from '@reduxjs/toolkit';
import diarySLice from '../features/diary/diarySlice';

export const store = configureStore({
  reducer: {
    diary: diarySLice,
  },
});
