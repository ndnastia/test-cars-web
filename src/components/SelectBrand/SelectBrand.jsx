import ReactSelect from 'react-select';
import style from 'components/CarsList/CarList.module.css'

const CarBrandSelect = ({ selectedBrand, handleBrandChange, makes }) => {
  const options = makes.map(make => ({ value: make, label: make }));

  return (
    <div className={style['filter-container']}>
      <label className={style['filter-label']}>Car Brand</label>
      <div> 
        <ReactSelect
          value={selectedBrand ? { value: selectedBrand, label: selectedBrand } : null}
          onChange={(selectedOption) => handleBrandChange(selectedOption.value)}
          options={options}
          isSearchable={true}
          placeholder="Enter the text"
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

export default CarBrandSelect;