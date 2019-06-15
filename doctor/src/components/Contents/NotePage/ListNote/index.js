import React, { Component } from "react"
import { List, Icon, Popconfirm, message } from "antd"
import { connect } from "react-redux"
import { fetchNotes, removeNote } from "../../../../actions/patientActions"
import "../style.css"
import UpdateNote from "../UpdateNote"

class ListNote extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      visible: false,
      dataUpdate: null
    }
  }
  componentDidMount() {
    this.props.fetchNotes({ elderId: this.props.auth.user.elderId })
    this.setState({
      loading: false
    })
  }

  handleVisible = visible => {
    this.setState({
      visible: visible
    })
  }
  deleteNote = id => {
    const elderId = this.props.auth.user.elderId
    let deleteNote = {
      noteId: id,
      elderId: elderId
    }
    this.props.removeNote(deleteNote)
    message.success("Xóa ghi chú thành công", 3)
  }
  render() {
    const listData = []
    if (this.props.listNotes[0]) {
      for (let i = 0; i < this.props.listNotes.length; i++) {
        listData.push({
          id: this.props.listNotes[i].id,
          title: this.props.listNotes[i].title,
          description: `${this.props.listNotes[i].time}`,
          content: this.props.listNotes[i].script
        })
      }
    }
    return (
      <React.Fragment>
        <List
          style={{ marginTop: 30 }}
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
                  style={{ color: "#108ee9", fontSize: 12 }}
                  onClick={() =>
                    this.setState({
                      visible: true,
                      dataUpdate: item
                    })
                  }
                >
                  <Icon type="edit" />
                  <span> Sửa</span>
                </span>,
                <Popconfirm
                  title="Bạn chắc chắn xóa mục này ?"
                  onConfirm={() => this.deleteNote(item.id)}
                  okText="Yes"
                  cancelText="No"
                >
                  <span style={{ color: "red", fontSize: 12 }}>
                    <Icon type="delete" />
                    <span> Xóa</span>
                  </span>
                </Popconfirm>
              ]}
              className="list-notes"
            >
              <List.Item.Meta
                title={item.title}
                description={item.description}
              />
              <div className="meta-data-content">{item.content}</div>
            </List.Item>
          )}
        />
        {this.state.visible && (
          <UpdateNote
            noteData={this.state.dataUpdate}
            modalVisible={true}
            handleVisible={this.handleVisible}
          />
        )}
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    listNotes: state.patient.listNotes
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchNotes: elderId => dispatch(fetchNotes(elderId)),
    removeNote: data => dispatch(removeNote(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListNote)
