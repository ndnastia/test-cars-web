import React from "react";
import style from 'components/Navigation/Navigation.module.css';
import { NavLink } from "react-router-dom";


const Navigation = () => {
   


    return(
        <header className={style['header']}>

            <div className={style['header-nav']}>
            <p>DriveMaster</p>
            <nav className={style['header-link']}>
            <NavLink to='/'>
                Home
            </NavLink>
            
            <NavLink to='/catalog'>
                Catalog
            </NavLink>
            <NavLink to='/favorites'>
                Favorites
            </NavLink>

            </nav>
            </div>
        </header>
    )
}

export default Navigation;
