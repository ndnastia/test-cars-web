import React, { useEffect, useState } from 'react';
import style from './CarList.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCars, incrementLimit } from 'redux/carsSlice';
import { selectCarData, selectError, selectFavorites, selectHasNextPage, selectIsLoading } from 'redux/cars.selectors';
import { addToFavorites, removeFromFavorites } from 'redux/favoritesSlice';
import { ReactComponent as AddFavorite } from 'images/active.svg';
import { ReactComponent as RemoveFavorite } from 'images/normal.svg';
import Modal from 'components/Modal/Modal';
import { Loader } from 'components/Loader/Loader';
import CarBrandSelect from 'components/SelectBrand/SelectBrand';
import CarPriceSelect from 'components/CarPriceSelect/CarPriceSelect';
import MileageInput from 'components/MileageSelect/MileageSelect';

import { setSelectedBrand, setSelectedPriceRange } from 'redux/filtersSlice';
import makes from 'helpers/makes.json';



const CarsList = () => {

  const cars = useSelector(selectCarData);
  const error = useSelector(selectError);
  const favorites = useSelector(selectFavorites);
  const hasNextPage = useSelector(selectHasNextPage); 
  const isLoading = useSelector(selectIsLoading);
  const dispatch = useDispatch();
  const selectedBrand = useSelector(state => state.filters.selectedBrand);
  const selectedPriceRange = useSelector(state => state.filters.selectedPriceRange);

  const [selectedCar, setSelectedCar] = useState(null); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filteredCars, setFilteredCars] = useState([]);

  const [mileageFrom, setMileageFrom] = useState('');
  const [mileageTo, setMileageTo] = useState('');

  const handleBrandChange = (brand) => {
    dispatch(setSelectedBrand(brand));
  };

  const handlePriceRangeChange = (price) => {
    dispatch(setSelectedPriceRange(price));
  };

  const handleMileageFromChange = (event) => {
    setMileageFrom(event.target.value);
  };

  const handleMileageToChange = (event) => {
    setMileageTo(event.target.value);
  };

  const handleSearch = () => {
    const filteredCars = cars.filter(car => {
      if (selectedBrand && car.make !== selectedBrand) return false;
      if (selectedPriceRange && car.rentalPrice > parseInt(selectedPriceRange)) return false;
      if (mileageFrom && car.mileage < parseInt(mileageFrom)) return false;
      if (mileageTo && car.mileage > parseInt(mileageTo)) return false;
      return true; 
    });
  
    setFilteredCars(filteredCars);

    dispatch(setSelectedBrand(''));
    dispatch(setSelectedPriceRange(''));
    setMileageFrom('');
    setMileageTo('');
  };
  

  useEffect(() => {
    dispatch(fetchCars({ page: 1, limit: 12 }));
  }, [dispatch]);

  useEffect(() => {
    setFilteredCars(cars);
  }, [cars]);

  const toggleFavorite = (car) => {
    const isFavorite = favorites.some((favorite) => favorite.id === car.id);
    if (isFavorite) {
      dispatch(removeFromFavorites(car));
    } else {
      dispatch(addToFavorites(car));
    }
  };

  const loadMore = () => {
    if (hasNextPage) {
      dispatch(incrementLimit());
      dispatch(fetchCars({ page: 1, limit: cars.length + 4 }));
    }
  };

  const openModal = (car) => {
    setSelectedCar(car);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }


 return (
  <div>
  {isLoading && <Loader />}
  <div>
    <div className={style['filter']}>
    <CarBrandSelect
      selectedBrand={selectedBrand}
      handleBrandChange={handleBrandChange}
      makes={makes}
    />

    <CarPriceSelect 
        selectedPriceRange={selectedPriceRange}
        handlePriceRangeChange={handlePriceRangeChange}
    />

    <div className={style['filter-container']}>
      <label className={style['filter-label']}>Car mileage / km</label>
      <div className={style['filter-mileage']}>
      
       <MileageInput
        label="From"
        value={mileageFrom}
        onChange={handleMileageFromChange}
    />
    <MileageInput
        label="To"
        value={mileageTo}
        onChange={handleMileageToChange}
        
    />
    </div>
    </div>
    

   

    <button onClick={handleSearch} className={style['filter-btn']}>Search</button>
   </div>
    

    <div className={style['car-list']}>
      {filteredCars.length > 0 ? (
      
        filteredCars.map(({ id, year, make, model, type, img, rentalCompany, description, fuelConsumption, engineSize, accessories, functionalities, rentalPrice, address, rentalConditions, mileage }) => {
          const addressParts = address ? address.split(",") : [];
          const city = addressParts.length >= 2 ? addressParts[addressParts.length - 2] : '';
          const country = addressParts.length >= 1 ? addressParts[addressParts.length - 1] : '';
          return (
            <ul className={style['car-item']} key={id}>
              <li>
                <div className={style['img-container']}>
                  <img src={img} alt={make} />
                  <button className={style['favorite-button']} onClick={() => toggleFavorite({ id,img, make, model, year, rentalPrice, address, rentalCompany, type, mileage, accessories })}>
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
                  <p>{type} | {make} | {mileage} | {accessories[0]}</p>
                </div>
                <div className={style['btn-container']}>
                  <button type='button' onClick={() => openModal({id, year, make, model, type, img, rentalCompany, description, fuelConsumption, engineSize, accessories, functionalities, rentalPrice, address, rentalConditions, mileage})} className={style['list-btn']}>Learn More</button>
                </div>
              </li>
            </ul>
          );
        })
        
      ) : (
        
        <div>Sorry, no matches were found.</div>
      )}

      
      {!hasNextPage && (
        <div>No more cars to load</div>
      )}
      {hasNextPage && (
        <div className={style['load-more-container']}>
          <button type='button' onClick={loadMore} className={style['load-more-btn']}>
            Load More
          </button>
        </div>
      )}

      
      {isModalOpen && (
        <Modal car={selectedCar} closeModal={closeModal} />
      )}
    </div>
    
  </div>
  </div>
);

};

export default CarsList;
