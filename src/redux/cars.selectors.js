export const selectFavorites = (state) => state.favorites.items;

export const selectIsLoading = (state) => state.cars.isLoading;
export const selectError = (state) => state.cars.error;
export const selectCarData = (state)  => state.cars.cars;
export const selectHasNextPage = (state) => state.cars.hasNextPage;
export const selectPage = (state) => state.cars.page;