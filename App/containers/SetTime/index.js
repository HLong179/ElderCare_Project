import React from 'react';
import { Button, FlatList } from "react-native";
import { Container, Content, ListItem, CheckBox, Body, Text, Item } from 'native-base';
import DateTimePicker from "react-native-modal-datetime-picker";
import Dialog from "react-native-dialog"
import moment from 'moment'
import firebase from 'react-native-firebase';
import AsyncStorage from '@react-native-community/async-storage';
import { getUserData } from '../../services/authServices';
import { timeConvert } from '../../utils/timeConvert.util';

import { withSocketContext } from '../../../socketContext';

class SetTime extends React.Component {
    constructor(props) {
        super(props);
       
        this.state = {
            isDateTimePickerVisible: false,
            time: '',
            isEmergencyChecked: false,
            hasHeartRate: false,
            options: [{ id: 1, key: 'Theo dõi khẩn cấp' }],
            selectedOption: [],
            dialogVisible: false,
            hour: '0',
            minute: '0',
            second: 0, 
            elderId: '',
            interval: '',
        };
    }

    componentDidMount = async () => {


        const { socket } = this.props;
        if(!!socket) {
            if(socket.connected) {
               console.log("socket connected");
            }
        }
        let idElder;
        let emergency;
        let tempValue = await AsyncStorage.getItem('curUser');
        idElder = JSON.parse(tempValue).elderId;
        this.setState({elderId: idElder});
       await firebase.app('elder_care_mobile').database().ref(`Patients/${idElder}/Config/Emergency`).once("value", (snapshot) => {
            if (snapshot.val()) {
                emergency = snapshot.val();
            } else emergency = false;
            if(emergency === true) {
                this.setState({
                    selectedOption: [1]
                })
            }  
       });

       await firebase.app('elder_care_mobile').database().ref(`Patients/${idElder}/Config/Interval`).once("value", (snapshot) => {
         if (snapshot.val()) {
             interval = snapshot.val();
             let { fHours, rMinute } = timeConvert(interval);
             
             this.setState({
                 hour: fHours.toString(),
                 minute: rMinute.toString(),
             })
           
         } else return;
    });
        
    }

    showDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: true });
    };

    hideDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: false });
    };

    handleTimePicked = date => {
        console.log(moment(date).format('LT'));
        const pickedTime = moment(date).format('LT');
        this.setState({ time: pickedTime }, () => this.hideDateTimePicker())
    };

    onSelectCheckbox = (id) => {
        let temp = this.state.selectedOption;
        let isEmergency;
        if (temp.includes(id)) {
            temp.splice(temp.indexOf(id), 1);
        }
        else {
            temp.push(id);
        }
        this.setState({ selected: temp }, async () => {
            console.log("we selected this options: ", temp);
            if (temp[0] === 1) {
               isEmergency = true;
            } else isEmergency = false;
            await firebase.app('elder_care_mobile').database().ref(`Patients/${this.state.elderId}/Config/Emergency`).set(isEmergency)
            console.log("detail value selected: ", this.state.selected);
        });

    }

    showDialog = () => {
        this.setState({ dialogVisible: true });
    };
    handleChangeHour = (h) => {
        // let intH = parseInt(h);
        this.setState({hour: h});
        // console.log(typeof this.state.hour);
    }
    
    handleChangeMinute = (m) => {
        // let intM = parseInt(m);
        this.setState({minute: m});
        // console.log(typeof this.state.minute);
    }

    handleChangeSecond = (s) => {
        let intS = parseInt(s);
        this.setState({second: s});
        // console.log("Second:", this.state.second);
        // console.log(typeof this.state.second);
    }

    handleCancel = () => {
        this.setState({ dialogVisible: false });
    };

    handleOK = async () => {
        const { hour, minute } = this.state;
        const {socket } = this.props;
        
        // let newItv = (this.state.hour)*60 + (this.state.minute);
        if ((!hour || hour === '0') && minute === '0' ) {
            alert("Cannot set")
            return;
        }
        let newItv = !hour? 0: parseInt(hour) * 60 + !minute? 0 : parseInt(minute);

        // alert(newItv);
       
        
        // elderId = JSON.parse(user).elderId;
        // console.log(elderId)
        console.log("what the fuck? ", newItv, hour, minute);
        await firebase.app('elder_care_mobile').database().ref(`Patients/${this.state.elderId}/Config/Interval`).set(+newItv);
   


        
        socket.emit("data-interval", {
            elderId: this.state.elderId,
            value: newItv
        })
        console.log('we set interval value success')

        //update khoang thoi gian moi nhap vao db
        
        this.setState({ dialogVisible: false });
    };

    render() {
    console.log('name', this.props.hello);

        return (

            <Container>
                <Content>
                    <Button  
                     title="Chọn mức thời gian theo dõi nhịp tim" onPress={this.showDialog} />
                    {/* <DateTimePicker
                        isVisible={this.state.isDateTimePickerVisible}
                        onConfirm={this.handleTimePicked}
                        onCancel={this.hideDateTimePicker}
                        mode={'time'}
                        is24Hour={false}
                    /> */}
                    <Dialog.Container visible={this.state.dialogVisible}>
                        <Dialog.Title>Nhập khoảng thời gian bạn muốn</Dialog.Title>
                        {/* <Dialog.Description>
                            Set an interval time for getting data.
                        </Dialog.Description> */}
                        <Dialog.Input label="Giờ" style={{borderColor: 'gray', borderWidth: 1}}  value={this.state.hour} keyboardType={'numeric'} onChangeText={this.handleChangeHour.bind(this)}></Dialog.Input>
                        <Dialog.Input label="Phút" style={{borderColor: 'gray', borderWidth: 1}}  value={this.state.minute} keyboardType={'numeric'} onChangeText={this.handleChangeMinute.bind(this)}></Dialog.Input>
                        <Dialog.Input label="Giây" style={{borderColor: 'gray', borderWidth: 1}} keyboardType={'numeric'} onChangeText={this.handleChangeSecond.bind(this)}></Dialog.Input>
                        <Dialog.Button label="Hủy" onPress={this.handleCancel} />
                        <Dialog.Button label="OK" onPress={this.handleOK} />
                    </Dialog.Container>
                    <Item  style={{marginTop:'7%'}}>
                        <FlatList
                            extraData={this.state}
                            keyExtractor={(item, index) => `list-item-${index}`}
                            data={this.state.options}
                            renderItem={({ item }) => {
                                return (
                                    <ListItem  /*onPress={() => this.onSelectCheckbox(item.id)} */   >
                                        <CheckBox
                                            checked={this.state.selectedOption.includes(item.id) ? true : false}
                                            onPress={() => this.onSelectCheckbox(item.id)}
                                        />
                                        <Body>
                                            <Text>{item.key}</Text>
                                        </Body>
                                    </ListItem>
                                )
                            }}

                        />
                    </Item>
                    <Item>
                        <Text style={{fontWeight: 'bold', fontStyle: 'italic', color: 'red', marginLeft:'4%'}}>
                            *Tích chọn theo dõi khẩn cấp, bạn sẽ nhận thông báo nhịp tim bất cứ khi nào có dữ liệu đo được. Ngược lại, thông báo chỉ xuất hiện khi nhịp tim của bệnh nhân có dấu hiệu nguy hiểm!*
                        </Text>
                    </Item>

                </Content>

            </Container>
        )
    }

}

export default withSocketContext(SetTime);



