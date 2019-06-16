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
          labelArray = generateDateInterval(rawData[rawData.length - 1].x, type);
      } else {
          data = formatDateOfData(rawData);
          for(let  i = 0; i< rawData.length; i++) {
              labelArray.push(moment(rawData[i].x).format('MM-DD'));
              
          }
      }
      labelArray.push(moment(data[data.length - 1]).add(1, 'days').format('MM-DD'));
      return {
        data,
        labelArray,
      }
  }