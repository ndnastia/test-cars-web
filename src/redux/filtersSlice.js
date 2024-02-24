import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedBrand: '',
  selectedPriceRange: '',
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSelectedBrand(state, action) {
      state.selectedBrand = action.payload;
    },
    setSelectedPriceRange(state, action) {
      state.selectedPriceRange = action.payload;
    },
    setSelectedMileageRange(state, action) {
      state.selectedMileageRange = action.payload;
    }
  }
});

export const { setSelectedBrand, setSelectedPriceRange, setSelectedMileageRange } = filtersSlice.actions;
export const filtersReducer = filtersSlice.reducer;
