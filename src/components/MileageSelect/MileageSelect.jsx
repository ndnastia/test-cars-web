import React from 'react';
import style from 'components/CarsList/CarList.module.css'

const MileageInput = ({ label, value, onChange }) => {
  return (
    <div className={style['filter-input']}>
      <label>{label}</label>
      <input type="text" value={value} onChange={onChange} className={style['input-item']}/>
    </div>
  );
};

export default MileageInput;