import style from 'pages/HomePage/HomePage.module.css';
import { NavLink } from 'react-router-dom';

const HomePage = () => {
    return(
        <div className={style['banner']}>
            <div className={style['banner-context']}>
                
                <h1>Best Cars For The Best Journey</h1>
                <p>We Provide Best Cars With The Best Prices. We Care For Your Safety.</p>   
                 
               <NavLink className={style['banner-link']} to='/catalog'>
                    Rent Car
               </NavLink>
            </div> 
        </div>
    )
}

export default HomePage;