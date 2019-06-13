import React, { Component } from "react"
import { List, Icon } from "antd"
import * as firebase from "firebase/app"

class ListMedicines extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      medicineDatas: []
    }
  }
  componentDidMount() {
    console.log(this.props.elder)
    if (this.props.elder) {
      const elderId = this.props.elder.ICID
      if (firebase) {
        const patientsRef = firebase.database().ref("Patients")
        patientsRef.on("value", snapshot => {
          let patients = snapshot.val()[elderId]
          if (patients) {
            patients = patients["Medicines"]
            this.setState(
              {
                medicineDatas: []
              },
              () => {
                let { medicineDatas } = this.state
                for (let patient in patients) {
                  let data = patients[patient]
                  data.idMedicineFB = patient
                  medicineDatas.push(data)
                }
                this.setState({
                  medicineDatas,
                  loading: false
                })
              }
            )
          } else {
            this.setState({
              loading: false
            })
          }
        })
      }
    }
  }

  render() {
    const listData = []
    for (let i = 0; i < this.state.medicineDatas.length; i++) {
      listData.push({
        title: this.state.medicineDatas[i].name,
        description: `
          ${this.state.medicineDatas[i].morning ? " Sáng " : ""}
          ${this.state.medicineDatas[i].afternoon ? " Trưa " : ""}
          ${this.state.medicineDatas[i].evening ? " Tối " : ""}`,
        content: this.state.medicineDatas[i].script,
        imageUrl: this.state.medicineDatas[i].imageUrl
      })
    }

    const IconText = ({ type, text }) => (
      <span>
        <Icon type={type} style={{ marginRight: 8 }} />
        {text}
      </span>
    )
    return (
      <List
        bordered
        style={{ marginTop: 50 }}
        loading={this.state.loading}
        itemLayout="vertical"
        dataSource={listData}
        renderItem={item => (
          <List.Item
            key={item.title}
            // actions={[
            //   <IconText type="star-o" text="156" />,
            //   <IconText type="like-o" text="156" />,
            //   <IconText type="message" text="2" />
            // ]}
            extra={<img width={272} alt="medicine" src={item.imageUrl} />}
          >
            <List.Item.Meta title={item.title} description={item.description} />
            {item.content}
          </List.Item>
        )}
      />
    )
  }
}

export default ListMedicines
