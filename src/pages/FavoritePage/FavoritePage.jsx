import style from "pages/FavoritePage/FavoritePage.module.css"
import React from 'react';
import FavoritesList from "components/FavoritesList";
import { useSelector } from "react-redux";
import { Loader } from 'components/Loader/Loader';
import { selectIsLoading } from "redux/cars.selectors";

const FavoritePage = () => {
  const isLoading = useSelector(selectIsLoading);

    return (
        <div className={style['container']}>
          {isLoading && <Loader />}
           <h1 className={style['fav-title']}>Your Favourites</h1>
           <FavoritesList />
        </div>
    )
}

export default FavoritePage;


