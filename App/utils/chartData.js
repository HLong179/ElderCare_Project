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
  let today = moment()
  let startOfWeek = moment(today).startOf("isoWeek")
  let endOfWeek = moment(today).endOf("isoWeek")
  let minTime = Math.min(...labels)
  today = moment(today).valueOf()
  while (today >= parseInt(minTime, 10) - 24 * 60 * 60 * 1000 * 7) {
    rate[moment(startOfWeek).format("DD/MM")] = {
      start: moment(startOfWeek).format("DD/MM"),
      end: moment(endOfWeek).format("DD/MM"),
      data: []
    }
    today = moment(today).valueOf() - 24 * 60 * 60 * 1000 * 7
    startOfWeek = moment(today).startOf("isoWeek")
    endOfWeek = moment(today).endOf("isoWeek")
  }
  for (let i = 0; i < labels.length; i++) {
    let timeLabel = labels[i]
    let timeStart = moment(timeLabel)
      .startOf("isoWeek")
      .format("DD/MM")
    if (rate[timeStart]) {
      rate[timeStart].data.push(chartData[i])
    }
  }

  for (let y in rate) {
    if (!rate[y].data[0]) {
      rate[y].data.push(0)
    }
    data.labels.push(y)
    data.dataSet.push(averageOfArray(rate[y].data))
  }

  data.labels = data.labels.reverse()
  data.dataSet = data.dataSet.reverse()
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
