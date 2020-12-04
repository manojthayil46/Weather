import React, { useEffect, useState } from 'react';
import styles from "./Days.module.css";


function Days(props) {
    const [Icon, setIcon] = useState('');
    let tempInCelsius = Math.floor(props.day.temp.max - 273);

    useEffect(() => {
        switch(true){
            case props.id >= 200 && props.id < 232:
                setIcon('/assets/sunny.png')
                break;
              case props.id >= 300 && props.id <= 321:
                setIcon('/assets/drizzle.png')
                break;
              case props.id >= 500 && props.id <= 521:
                setIcon('/assets/rain.png')
                break;
              case props.id >= 600 && props.id <= 622:
                setIcon('/assets/snow.png')
                break;
              case props.id >= 701 && props.id <= 781:
                setIcon('/assets/atmosphere.png')
                break;
              case props.id === 800:
                setIcon('/assets/clear.png')
                break;
              case props.id >= 801 && props.id <= 804:
                setIcon('/assets/clouds.png')
                break;
              default:
                setIcon('/assets/sunny.png')
                }
        return () => {
            console.log("unsubscribe");
        }
    })
    
    return (
        
        <div className = {styles.container}>
            <div className ={styles.wrapper} >
            <p>Sunday</p>
            <p>{tempInCelsius} ℃</p>
            <img src = {Icon} alt="not available"/>
            <p>{props.description}</p>
                
            </div>
           
        </div>
    )
}

export default Days
