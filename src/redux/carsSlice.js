import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { requestCarsList } from 'helpers/api';

export const fetchCars = createAsyncThunk(
  'cars/getAll',
  async ({ page = 1, limit = 12 }, thunkAPI) => {
    try {
      const carsList = await requestCarsList(page, limit);
      return carsList;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const INITIAL_STATE = {
  cars: [],
  isLoading: false,
  error: null,
  page: 1,
  limit: 12, 
  hasNextPage: true,
};

const carsSlice = createSlice({
  name: 'cars',
  initialState: INITIAL_STATE,
  reducers: {
    incrementLimit(state) {
      state.limit = state.limit + 4; 
    },
  },
  extraReducers: (builder) =>
  builder
    .addCase(fetchCars.fulfilled, (state, action) => {
      state.isLoading = false;
      state.cars = action.payload;
      state.error = false;
      state.page = state.page + 1;
      state.hasNextPage = action.payload.length > 0;

      if (action.payload.length === 0) {
        state.hasNextPage = false;
      }
    })
    
    .addMatcher(
      isAnyOf(fetchCars.pending),
      (state) => {
        state.isLoading = true;
        state.error = null;
      }
    )
    .addMatcher(
      isAnyOf(fetchCars.rejected),
      (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.hasNextPage = false;
      }
    )
    
});

export const { incrementLimit } = carsSlice.actions; 
export const carsReducer = carsSlice.reducer;