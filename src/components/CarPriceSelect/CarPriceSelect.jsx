import React from 'react';
import ReactSelect from 'react-select';
import style from 'components/CarsList/CarList.module.css';
import prices from 'helpers/prices.json';

const CarPriceSelect = ({ selectedPriceRange, handlePriceRangeChange }) => {
  const options = prices.map(price => ({ value: price, label: price }));

  return (
    <div className={style['filter-container']}>
      <label className={style['filter-label']}>Price/1 hour</label>
      <div>
        <ReactSelect
          value={selectedPriceRange ? { value: selectedPriceRange, label: selectedPriceRange } : null}
          onChange={(selectedOption) => handlePriceRangeChange(selectedOption.value)}
          options={options}
          isSearchable={true}
          placeholder="To $"
          styles={{ 
            control: (provided, state) => ({
              ...provided,
              borderRadius: '14px',
              width: '224px',
              height: '48px', 
              background: 'rgb(247, 247, 251)',
              color: '#121417',
              fontSize: '18px',
              fontWeight: '500',
              lineHeight: '20px',
              letterSpacing: '0%',
            }),
          }}
        />
      </div>
    </div>
  );
};

export default CarPriceSelect;

