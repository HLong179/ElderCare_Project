// import React, { Component } from "react"
// import { Button, Icon, Modal, Form, Input, InputNumber } from "antd"

// class AddDrugsWithForm extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       modalVisible: false
//     }
//   }
//   showModal = () => {
//     this.props.form.resetFields()
//     this.setState({
//       visible: true
//     })
//   }

//   handleCancel = e => {
//     this.setState({
//       visible: false
//     })
//   }
//   handleSubmit = e => {
//     e.preventDefault()
//     this.props.form.validateFields((err, values) => {
//       if (!err) {
//         this.setState({
//           drugs: [...this.state.drugs, values],
//           visible: false
//         })
//       } else {
//         console.log(err)
//       }
//     })
//   }
//   displayPatientDetails() {
//     const { getFieldDecorator } = this.props.form
//     if (newData) {
//       return (
//         <React.Fragment>
//           <div className="list-drug">
//             <Title level={3}>Danh sách thuốc</Title>
//             <Button
//               type="dashed"
//               style={{ width: "40%" }}
//               onClick={this.showModal}
//             >
//               <Icon type="plus" /> Thêm thuốc
//             </Button>
//             <Modal
//               title="Thêm thuốc"
//               visible={this.state.visible}
//               onOk={this.handleSubmit}
//               onCancel={this.handleCancel}
//             >
//               <Form onSubmit={this.handleSubmit}>
//                 <Form.Item label="Tên thuốc">
//                   {getFieldDecorator("drugName", {})(<Input />)}
//                 </Form.Item>
//                 <Form.Item label="Số lượng">
//                   {getFieldDecorator("drugNumber", {})(
//                     <InputNumber min={1} max={10} />
//                   )}
//                 </Form.Item>
//                 <Form.Item label="Ghi chú">
//                   {getFieldDecorator("drugNote", {})(<TextArea />)}
//                 </Form.Item>
//               </Form>
//             </Modal>
//             <ul style={{ marginTop: "20px", fontWeight: "500" }}>
//               {this.state.drugs.map((drug, index) => {
//                 return (
//                   <li className="list-drug-item" key={index}>
//                     {drug.drugName} {"  -  "} {drug.drugNumber + " viên"}
//                   </li>
//                 )
//               })}
//             </ul>
//           </div>
//         </React.Fragment>
//       )
//     }
//   }
//   render() {
//     return <div />
//   }
// }

// const AddDrugs = Form.create({ name: "add_drugs" })(AddDrugsWithForm)

// export default AddDrugs
