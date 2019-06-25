import moment from "moment"

const averageOfArray = arr => {
  let result = 0
  for (let i = 0; i < arr.length; i++) {
    result += arr[i]
  }
  return (result / arr.length).toFixed(1)
}

const pressDay = (labels, chartData) => {
  const rate = {}
  const data = {
    labels: [],
    dataSet: []
  }

  for (let i = 0; i < labels.length; i++) {
    let timeLabel = moment(parseInt(labels[i], 10)).format("DD/MM")
    if (rate[timeLabel]) {
      rate[timeLabel].push(chartData[i])
    } else {
      rate[timeLabel] = [chartData[i]]
    }
  }
  for (let y in rate) {
    data.labels.push(y)
    data.dataSet.push(averageOfArray(rate[y]))
  }
  return data
}

const pressWeek = (labels, chartData) => {
  const data = {
    labels: [],
    dataSet: []
  }
  let rate = {}
  for (let i = 0; i < labels.length; i++) {
    let timeLabel = labels[i]

    if (moment(timeLabel).date() >= 1 && moment(timeLabel).date() <= 7) {
      let weekTime = `1/${moment(timeLabel).month() + 1}/${moment(
        timeLabel
      ).year()}`
      if (rate[weekTime]) {
        rate[weekTime].push(chartData[i])
      } else {
        rate[weekTime] = [chartData[i]]
      }
    } else if (
      moment(timeLabel).date() >= 8 &&
      moment(timeLabel).date() <= 14
    ) {
      let weekTime = `8/${moment(timeLabel).month() + 1}/${moment(
        timeLabel
      ).year()}`
      if (rate[weekTime]) {
        rate[weekTime].push(chartData[i])
      } else {
        rate[weekTime] = [chartData[i]]
      }
    } else if (
      moment(timeLabel).date() >= 15 &&
      moment(timeLabel).date() <= 21
    ) {
      let weekTime = `15/${moment(timeLabel).month() + 1}/${moment(
        timeLabel
      ).year()}`
      if (rate[weekTime]) {
        rate[weekTime].push(chartData[i])
      } else {
        rate[weekTime] = [chartData[i]]
      }
    } else if (
      moment(timeLabel).date() >= 22 &&
      moment(timeLabel).date() <= 28
    ) {
      let weekTime = `22/${moment(timeLabel).month() + 1}/${moment(
        timeLabel
      ).year()}`
      if (rate[weekTime]) {
        rate[weekTime].push(chartData[i])
      } else {
        rate[weekTime] = [chartData[i]]
      }
    } else {
      let weekTime = `29/${moment(timeLabel).month() + 1}/${moment(
        timeLabel
      ).year()}`
      if (rate[weekTime]) {
        rate[weekTime].push(chartData[i])
      } else {
        rate[weekTime] = [chartData[i]]
      }
    }
  }
  for (let y in rate) {
    data.labels.push(y)
    data.dataSet.push(averageOfArray(rate[y]))
  }
  return data
}

const pressMonth = (labels, chartData) => {
  const data = {
    labels: [],
    dataSet: []
  }
  let rate = {}
  for (let i = 0; i < labels.length; i++) {
    let timeLabel = moment(parseInt(labels[i], 10)).format("MM/YYYY")
    if (rate[timeLabel]) {
      rate[timeLabel].push(chartData[i])
    } else {
      rate[timeLabel] = [chartData[i]]
    }
  }
  for (let y in rate) {
    data.labels.push(y)
    data.dataSet.push(averageOfArray(rate[y]))
  }
  return data
}

exports.pressDay = pressDay
exports.pressWeek = pressWeek
exports.pressMonth = pressMonth
