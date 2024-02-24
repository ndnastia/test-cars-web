import React from 'react';
import style from './CarsList/CarList.module.css';
import { useSelector, useDispatch } from 'react-redux';
import {  selectFavorites } from 'redux/cars.selectors';
import { addToFavorites, removeFromFavorites } from 'redux/favoritesSlice';
import { ReactComponent as AddFavorite } from 'images/active.svg';
import { ReactComponent as RemoveFavorite } from 'images/normal.svg';


const FavoritesList = () => {
  const favorites = useSelector(selectFavorites);
  const dispatch = useDispatch();
  

  const toggleFavorite = (car) => {
    const isFavorite = favorites.some((favorite) => favorite.id === car.id);

    if (isFavorite) {
      dispatch(removeFromFavorites(car));
    } else {
      dispatch(addToFavorites(car));
    }
  };



  return (
    <div className={style['car-list']}>
      
      {favorites.map(({ id, img, make, model, year, rentalPrice, address, rentalCompany, type, mileage, accessories }) => {

        const addressParts = address ? address.split(",") : [];
        const city = addressParts.length >= 2 ? addressParts[addressParts.length - 2] : '';
        const country = addressParts.length >= 1 ? addressParts[addressParts.length - 1] : '';
        const accessorie = accessories && accessories[0]; 

        return (
          <ul className={style['car-item']} key={id}>
            <li>
              <div className={style['img-container']}>
                <img src={img} alt={make} />
                <button className={style['favorite-button']} onClick={() => toggleFavorite({ id, img, make, model, year, rentalPrice, address, rentalCompany, type, mileage, accessories })}>
                  {favorites.some((favorite) => favorite.id === id) ? (
                    <AddFavorite />
                  ) : (
                    <RemoveFavorite />
                  )}
                </button>
              </div>

              <div className={style['list-title']}>
                <h3>{make} <span className={style['list-title-model']}>{model}</span>, {year}</h3>
                <h3>{rentalPrice}</h3>
              </div>

              <div className={style['list-desc']}>
                <p>{city} | {country} | {rentalCompany}</p>
                <p>{type} | {make} | {mileage} | {accessorie}</p>
              </div>
              <div className={style['btn-container']}>
                <button type='button' className={style['list-btn']}>Learn More</button>
              </div>

            </li>
          </ul>
        );
      })}
    </div>
  );
};

export default FavoritesList;