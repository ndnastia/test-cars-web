import React, {useEffect} from "react";
import style from './Modal.module.css';
import {ReactComponent as Close} from 'images/x.svg';


const Modal = ({car, closeModal}) => {
    const addressParts = car.address ? car.address.split(",") : [];
    const city = addressParts.length >= 2 ? addressParts[addressParts.length - 2] : '';
    const country = addressParts.length >= 1 ? addressParts[addressParts.length - 1] : '';
    const conditions = car.rentalConditions.split("\n");

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                closeModal();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [closeModal]);
  
    const handleOverlyClick = (e) => {
        if (e.currentTarget === e.target) {
          closeModal();
        }
      };

    
    return(
        
        <div className={style['modal']} key={car.id} onClick={handleOverlyClick}>
            <div className={style['modal-container']}>
                <button type='button'  className={style['modal-close-btn']} onClick={closeModal}><Close/></button>
                <img src={car.img} alt={car.model}/>

                <div className={style['modal-title']}>
                    <h3>{car.make} <span className={style['modal-title-model']}>{car.model}</span>, {car.year}</h3>
                </div>

                <div className={style['modal-desc']}>
                    <p>{city} | {country} | Id: {car.id} | Year: {car.year} | Type: {car.type}</p>
                    <p>Fuel Consumption: {car.fuelConsumption} | Engine Size {car.engineSize} </p>
              </div>

                <div className={style['info-container']}>
                     <p className={style['modal-info']}>{car.description}</p>

              <h3 className={style['modal-second-title']}>Accessories and functionalities:</h3>

              <div className={style['features-container']}>
                <div className={style['modal-features']}>
                    {car.accessories.map((accessorie, index) => {
                        return <li key={index}> {accessorie} | </li>;
                    })}
                </div>
                <div className={style['modal-features']}>
                    {car.functionalities.map((functionalitie, index) => {
                        return <li key={index}> {functionalitie} | </li>;
                    })}
                </div>
              </div>
              
             
              <h3 className={style['modal-second-title']}>Rental Conditions</h3>

              <div className={style['conditions-container']}>
                 <ul className={style['modal-conditions']}>
                {conditions.map((condition, index) => {
                    const characters = condition.split("");
                    return (
                    <li key={index} className={style['conditions-item']}>
                        {characters.map((char, charIndex) => {
                        const isDigit = /^\d+$/.test(char);
                        return (
                            <span
                            key={charIndex}
                            style={{
                                color: isDigit ? "#3470FF" : "#363535",
                                fontWeight: isDigit ? 600 : 400,
                            }}
                            >
                            {char}
                            </span>
                        );
                        })}
                    </li>
                    );
                })}
               
        </ul> 
        <div className={style['modal-conditions']}>
            <p className={style['conditions-item']}>
                    Mileage:{" "}
                    <span style={{ color: "#3470FF", fontWeight: 600 }}>
                    {Number(car.mileage).toLocaleString("en")}
                    </span>
             </p>
             <p className={style['conditions-item']}>
                    Price:{" "}
                    <span style={{ color: "#3470FF", fontWeight: 600 }}>
                    {car.rentalPrice}
                    </span>
            </p> 
            </div>
        </div>
             
                </div>
             
               
              <button type='button' className={style['modal-btn']}>
              <a href="tel:+380730000000">Rental Car</a>
              </button>
            </div>
        </div>
    )
}

export default Modal;