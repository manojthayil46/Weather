import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2';
import styles from './Chart.module.css';

function Chart(props) {
    const [chartData,setchartData] = useState('');

  
    useEffect(() => {
     
        chartFunc();
        return () => {
          console.log("clearing");
        
       }
       
      });

    const chartFunc = () =>{
      
    setchartData({
        labels:['12am','1am','2am','3am','4am','5am','6am','7am','8am','9am','10am','11am','12pm','1pm','2pm','3pm','4pm','5pm','6pm','7pm','8pm','9pm','10pm','11pm'],
        datasets: [
          {
            label : "Temperature",  
            data: [...props.temparray],
            backgroundColor: ["rgba(75, 192, 192, 0.6)"],
            borderWidth: 4
          },
          
        ],
        options: {
          animation: {
              tension: {
                  duration: 1000,
                  easing: 'linear',
                  from: 1,
                  to: 0,
                  loop: true
              }
          },
      }
    });
    
  }



    return (
        <div className = {styles.charDiv}>
            <h1>{Math.floor(props.temp - 273)} ℃</h1>
        <Line data={chartData}
          options={{
            responsive: true,
            title: { text: "Temperature Scale", display: false },
            animation: {
              tension: {
                  duration: 1000,
                  easing: 'linear',
                  from: 1,
                  to: 0,
                  loop: true
              }
          },
            scales: {
              yAxes: [
                {
                  ticks: {
                    autoSkip: true,
                    maxTicksLimit: 40,
                    beginAtZero: true
                  },
                  gridLines: {
                    display: false
                  }
                }
              ],
              xAxes: [
                {
                  gridLines: {
                    display: true
                  }
                }
              ]
            }
          }}/>
          
        <div className = {styles.press_humid}>
                  <div className = {styles.pressure}>
                      <p>Pressure</p>
                      <p>{props.pressure}</p>

                   </div>
             <div className = {styles.humidity}>
                <p>Humidity</p>
                <p>{props.humidity}</p>
             </div>
        </div>
  </div>
    )
}

export default Chart







   
