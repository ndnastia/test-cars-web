import React from "react";

import style from 'pages/CatalogPage/CatalogPage.module.css';
import CarsList from "components/CarsList/CarsList";


const CatalogPage = () => {
    
  
    return (
      
      <div className={style['container']}>

       <CarsList /> 
       
      </div>
        
      );
}

export default CatalogPage;