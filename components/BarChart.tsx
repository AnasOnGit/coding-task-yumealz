'use client'
import React,{ReactElement} from 'react';
import {  Chart as ChartDisplay   } from 'react-chartjs-2';
import { Chart, registerables,ChartType  } from 'chart.js';

const BarCart = ({labels,label,data,
  chartType,
}:{
  labels:string[],
  label:string,
  data:number[],
  chartType:any
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
            ],
            borderColor:
            [
              chartType === "line" ? "#1e1e1e" : "#ffffff",
            ]
          },],

        }

        }

      />
   
  )

}

export default BarCart;