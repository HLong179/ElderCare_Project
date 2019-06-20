import moment from 'moment';
import { generateDateInterval } from './timeConvert.util';

//format Calor, Weight Data from Object to array.
export const formatData = (data) => {
    let result = []

    for(let [ key, value ] of Object.entries(data)) {
        result.push({
            value,
            time: Number(key),
        })
    }
    
    return result;
}


//convert date to 'MM-DD' before render chart.
export const formatDateOfData = (data) => {
    let result = [];
    
    data.map(data => {
      result.push({
        x: moment(data.x).format('MM-DD'),
        y: data.y,  
      })
    })
    return result;
  }

//format data, labelArray for Chart
  export const processChartData = (rawData, type) => {
      let data = [];
      let labelArray = [];

      if(type === 'day') {
          data = formatDateOfData(rawData);
          console.log(' rawData[rawData.length - 2].x', rawData[rawData.length - 1].x)
          console.log('raw Data elemtn', rawData[rawData.length - 1].x)
          // labelArray = generateDateInterval(rawData[rawData.length - 1].x, type);
          // labelArray.push(moment(rawData[rawData.length - 1].x).add(1, 'days').format('MM-DD'))
      } else if (type === 'week') {
          data = formatDateOfData(rawData);
          for(let  i = 0; i< rawData.length; i++) {
              labelArray.push(moment(rawData[i].x).add(1, 'weeks').format('MM-DD'));
              
          }
          // labelArray.push(moment(rawData[rawData.length -1].x).add(1, 'months').format('MM-DD'));

      } 
      else {
        data = formatDateOfData(rawData);
        for(let  i = 0; i< rawData.length; i++) {
            labelArray.push(moment(rawData[i].x).add(1, 'months').format('MM-DD'));
            
        }
      }
      return {
        data,
        labelArray,
      }
  }