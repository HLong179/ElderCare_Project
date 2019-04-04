import React, { Component } from "react"
import { Layout, Typography, Calendar, Badge, Popover } from "antd"
import scheduleData from "../../scheduleData.json"

const { Content } = Layout
const { Title } = Typography

export default class Schedules extends Component {
  getListData = value => {
    let listData = {}
    for (let i = 0; i < scheduleData.length; i++) {
      if (listData[scheduleData[i].date]) {
        listData[scheduleData[i].date].push(scheduleData[i])
      } else {
        listData[scheduleData[i].date] = [scheduleData[i]]
      }
    }
    return listData[value]
  }
  dateCellRender = value => {
    let temp = value.format("DD/MM/YYYY")
    const listData = this.getListData(temp)
    if (listData) {
      const content = (
        <div style={{ padding: 5 }}>
          {listData.map(item => (
            <p>
              <Badge status={"success"} text={`${item.time} - ${item.name}`} />
            </p>
          ))}
        </div>
      )

      return (
        <ul className="events">
          <Popover content={content} title="Lịch khám bệnh">
            {listData.map(item => (
              <li key={item.id}>
                <Badge
                  status={"success"}
                  text={`${item.time} - ${item.name}`}
                />
              </li>
            ))}
          </Popover>
        </ul>
      )
    }
  }
  render() {
    return (
      <Content style={{ margin: "16px 16px" }}>
        <div style={{ padding: 24, minHeight: 460, backgroundColor: "#fff" }}>
          <Title level={3} style={{ marginBottom: 20 }}>
            Lịch khám bệnh
          </Title>
          <Calendar dateCellRender={this.dateCellRender} />
        </div>
      </Content>
    )
  }
}
