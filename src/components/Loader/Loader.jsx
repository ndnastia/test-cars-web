import { BallTriangle } from "react-loader-spinner";
import style from "./Loader.module.css"

export const Loader = () => {
    return (
        <div className={style['loader']}>
            <BallTriangle
        height={100}
        width={100}
        radius={5}
        color="#5b7c99"
        ariaLabel="ball-triangle-loading"
        wrapperClass={{}}
        wrapperStyle=""
        visible={true}
        /> 
        </div>
       
    )
}