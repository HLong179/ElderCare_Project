import React, { Component } from "react"
import { Layout } from "antd"

const { Content } = Layout

class DashboardContent extends Component {
  render() {
    return (
      <Content style={{ margin: "16px 16px" }}>
        <div style={{ padding: 24, minHeight: 460 }}>
          {/* <div className="gutter-example">
            <Row gutter={16}>
              <Col className="gutter-row" span={8}>
                <div className="gutter-box">
                  <Card title="Lịch khám bệnh" bordered={false} />
                </div>
              </Col>
              <Col className="gutter-row" span={8}>
                <div className="gutter-box">
                  <Card title="Danh sách bệnh nhân" bordered={false} />
                </div>
              </Col>
              <Col className="gutter-row" span={8}>
                <div className="gutter-box">
                  <Card title="Bệnh nhân cần theo dõi" bordered={false} />
                </div>
              </Col>
            </Row>
          </div> */}
        </div>
      </Content>
    )
  }
}

export default DashboardContent
