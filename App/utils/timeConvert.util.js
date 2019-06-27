import moment from 'moment';

export function timeConvert(m){
    let temp = m;
    let hours = temp / 60;
    let fHours = Math.floor(hours);
    let minute = (hours - fHours) * 60;

    let rMinute = Math.round(minute);
    return {
        fHours,
        rMinute,
    }


}

// export const formatDate = (date) => {
//     return moment(date).format('L');
// }


// export const getHourAndMinute = (data) => {
//     let hour = new Date(data).getHours();
//     let minute = new Date(data).getMinutes();
//     return `${hour}:${minute}`;
// }


// export const findPreviousDate = (data) => {
//     // const ToDate = new Date(Date.now()).setHours(0,0,0,0);
//     const ToDate = new Date('06/13/2019').setHours(0,0,0,0);

//     const formatData = new Date(data).setHours(0, 0, 0, 0);
//     if((ToDate - formatData) === 0) {
//         return true;
//     } 
//     return false;
// }




// export const averageHeartRateByWeek = (data) => {
//   let result = [];
//   let sum = 0;
//   let length = data.length;

//   for (let i = 0; i < length; i++) {
//     sum = data[i].value;
//     count = 1;

//     if(i === length - 1) {
//         // result.push({x: data[i].x, y: sum});
//         result.push({value: sum, time: data[i].time});
//       }

//     for (let j = i + 1; j < length; j++) {
//       if (compareTwoDate(data[i].x, data[j].x)) {
//         sum += data[j].y;
//         count++;
//         if (j === length - 1) {
//         //   result.push({ x: data[i].x, y: sum /count });
//         result.push({ x: formatDate(data[i].x), y: sum /count });

//           i = j;
//           break;
//         }
//       } else {
//         if(count === 1) {
//             // result.push({ x: data[i].x, y: sum });
//             result.push({ x: formatDate(data[i].x), y: sum });
//             break;
//           }
//         // result.push({ x: data[i].x, y: sum / count });
//         result.push({ x: formatDate(data[i].x), y: sum / count });
//         i = j - 1;
//         break;
//       }
//     }
//   }
//   return result;
// };


//function filter data by ( day, week, month);
export const filterByTime = (arrData, start, end ) => {
  let filterData = [];

   arrData.filter((data) => {
    if(data.time >= start && data.time <= end) {
      console.log('true')
      time = moment(new Date(data.time)).format("YYYY-MM-DD")
      filterData.push({ value: data.value, time})
    } else {
      console.log('false');
    }
  })
  console.log('filterByTime', filterData)

  let result = averageDataByDate(filterData);

  return result;
}

// Calculate average date by date.
export const averageDataByDate = (data) => {
  let result = [];
  let sum = 0;
  let length = data.length;
  console.log('data', data);

  for (let i = 0; i < length; i++) {
    sum = data[i].value;
    count = 1;

    if(i === length - 1) {
        result.push({ x: data[i].time, y: sum});
      }

    for (let j = i + 1; j < length; j++) {
        if(moment(data[i].time).isSame(data[j].time)) {
        sum += data[j].value;
        count++;
        if (j === length - 1) {
        result.push({x: data[i].time, y: Math.round(sum / count)});
          i = j;
          break;
        }
      } else {
        if(count === 1) {
            // result.push({ x: data[i].x, y: sum });
            result.push({x: data[i].time, y: sum});
            break;
          }
        // result.push({ x: data[i].x, y: sum / count });
        result.push({x: data[i].time, y: Math.round(sum / count)});
        i = j - 1;
        break;
      }
    }
  }
  console.log('averageDataByDate', result);
  
  return result;
};


// Generate date from start date to current date.
export const generateDateInterval = (start, type) => {
  let result = [];
  let numOfDays = 7;

  if(type === 'week') {
    numOfDays = 21;
  } else if(type === 'month') {
    numOfDays = 60;
  }

  for(let i = numOfDays; i >= 0; i--) {
    result.push(moment(start).subtract(i, 'day').format('MM-DD'));
  }

  return result;
}

// Caculate average data by week( use average date data).

export const averageDateByWeek = (data)  => {
  let startDate = '';
  let endDate = '';
  let result = [];
  
  for( let i = 7; i >0; i--) {
    startDate = moment(data[data.length - 1].x).subtract(i, 'weeks').format('YYYY-MM-DD');
    endDate = moment(startDate).add(1, 'weeks').format('YYYY-MM-DD');

    let sum = 0;
    let count = 0;

    for(let j = 0; j < data.length; j ++) {
      if(data[j].y && moment(data[j].x).isBetween(startDate, endDate)) {
        sum += data[j].y;
        count++;
      }
      
    }

      result.push({
        x: moment(startDate).format('YYYY-MM-DD'),
        y: sum !== 0 ? Math.round(sum/count) : 0,
      })
  }

  return result;

}

export const averageDateByMonth = (data)  => {
  let startDate = '';
  let endDate = '';
  let result = [];
  
  // for( let i = 3; i >0; i--) {
    // startDate = moment(data[data.length - 1].x).subtract(i, 'months').format('YYYY-MM-DD');
    // endDate = moment(startDate).add(1, 'months').format('YYYY-MM-DD');
    // let startDate, endDate;
    let month;
console.log('motn rate', data[data.length - 1]);
    for(let i = 0; i < 3; i++) {
      if(i === 0) {
        endDate = moment(data[data.length - 1].x).format('YYYY-MM-DD');
         month = new Date(data[data.length - 1].x).getMonth() + 1;
        let year =  new Date(data[data.length - 1].x).getFullYear();
        startDate = moment(new Date(year, month -1, 1)).format('YYYY-MM-DD');
        console.log("startDate", startDate);

      } else {

        endDate = moment(startDate).subtract(1).format('YYYY-MM-DD');
        startDate = moment(startDate).subtract(1 , 'months').format('YYYY-MM-DD');
        month = new Date(startDate).getMonth() + 1;
      }

    let sum = 0;
    let count = 0;
    
    for(let j = 0; j < data.length; j ++) {
      if(data[j].y && moment(data[j].x).isBetween(startDate, endDate)) {
        sum += data[j].y;
        count++;
      }
      
    }

      result.push({
        x: moment(startDate).format('YYYY-MM-DD'),
        y: sum !== 0 ? Math.round(sum/count): 0,
      })
  }
  console.log('month result', result);
  let finalResult = result.reverse();
  
  
  return finalResult;

}