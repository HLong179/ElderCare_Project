import React, { Component } from "react"
import { List, Icon, Popconfirm } from "antd"
import * as firebase from "firebase/app"
import "../style.css"
import UpdateMedicine from "../UpdateMedicine"

class ListMedicines extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      medicineDatas: [],
      modalVisible: false,
      dataUpdate: null
    }
  }
  componentDidMount() {
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
  deleteMedicine = data => {
    const elderId = this.props.elder.ICID
    firebase
      .database()
      .ref(`Patients/${elderId}/Medicines/${data}`)
      .remove()
  }

  handleVisible = visible => {
    this.setState({
      modalVisible: visible
    })
  }
  render() {
    const listData = []
    for (let i = 0; i < this.state.medicineDatas.length; i++) {
      listData.push({
        idMedicineFB: this.state.medicineDatas[i].idMedicineFB,
        title: this.state.medicineDatas[i].name,
        description: `
          ${this.state.medicineDatas[i].morning ? " Sáng " : ""}
          ${this.state.medicineDatas[i].afternoon ? " Trưa " : ""}
          ${this.state.medicineDatas[i].evening ? " Tối " : ""}`,
        content: this.state.medicineDatas[i].script,
        imageUrl: this.state.medicineDatas[i].imageUrl,
        morning: this.state.medicineDatas[i].morning,
        afternoon: this.state.medicineDatas[i].afternoon,
        evening: this.state.medicineDatas[i].evening
      })
    }

    return (
      <React.Fragment>
        <List
          bordered
          style={{ marginTop: 50 }}
          loading={this.state.loading}
          itemLayout="vertical"
          pagination={{
            pageSize: 5
          }}
          dataSource={listData}
          renderItem={item => (
            <List.Item
              key={item.title}
              actions={[
                <span
                  style={{ color: "#108ee9" }}
                  onClick={() =>
                    this.setState({
                      modalVisible: true,
                      dataUpdate: item
                    })
                  }
                >
                  <Icon type="edit" />
                  <span> Sửa</span>
                </span>,
                <Popconfirm
                  title="Bạn chắc chắn xóa mục này ?"
                  onConfirm={() => this.deleteMedicine(item.idMedicineFB)}
                  okText="Yes"
                  cancelText="No"
                >
                  <span style={{ color: "red" }}>
                    <Icon type="delete" />
                    <span> Xóa</span>
                  </span>
                </Popconfirm>
              ]}
              extra={
                <div
                  style={{
                    width: 240,
                    height: 240,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <img
                    style={{ maxWidth: 240, maxHeight: 240 }}
                    alt="medicine"
                    src={item.imageUrl}
                  />
                </div>
              }
              className="list-medicine"
            >
              <List.Item.Meta
                title={item.title}
                description={item.description}
              />
              {item.content}
            </List.Item>
          )}
        />
        {this.state.modalVisible && (
          <UpdateMedicine
            medicineData={this.state.dataUpdate}
            modalVisible={true}
            handleVisible={this.handleVisible}
          />
        )}
      </React.Fragment>
    )
  }
}

export default ListMedicines
