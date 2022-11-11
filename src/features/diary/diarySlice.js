import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from "axios";

const initialState = {
  diary: null
};

export const getDiary = createAsyncThunk("diary/diaryFetch", async (_, {dispatch}) => {
  const response = await axios.get("https://diary-hw-default-rtdb.asia-southeast1.firebasedatabase.app/diary.json");
  dispatch(setDiary(response.data));
});
export const addDiary = createAsyncThunk("add/diaryFetch", async (diary) => {
  await axios.post("https://diary-hw-default-rtdb.asia-southeast1.firebasedatabase.app/diary.json", diary)
});
export const removeDiary = createAsyncThunk("remove/diaryFetch", async (key) => {
  await axios.delete(`https://diary-hw-default-rtdb.asia-southeast1.firebasedatabase.app/diary/${key}.json`)

});

export const diarySlice = createSlice({
  name: 'diary',
  initialState,
  reducers: {
    setDiary(state, action){
      state.diary = action.payload
    },
  },
});

export const { setDiary } = diarySlice.actions;

export const selectDiary = (state) => state.diary.diary;

export default diarySlice.reducer;
