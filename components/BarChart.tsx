'use client'
import React,{ReactElement} from 'react';
import {  Chart as ChartDisplay,   } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

const BarCart = ({labels,label,data,
  chartType,
}:{
  labels:string[],
  label:string,
  data:number[],
  chartType:string
}) => {
  Chart.register(...registerables);

  return (
    
      <ChartDisplay type={chartType}

        data={{
          labels: labels,
          datasets: [{
            label: label,
            data: data,
            backgroundColor: [
              'green',
              'orange',
            //   'rgba(255, 205, 86, 0.2)',
            //   'rgba(75, 192, 192, 0.2)',
            //   'rgba(54, 162, 235, 0.2)',

            ],
          },],

        }

        }

      />
   
  )

}

export default BarCart;