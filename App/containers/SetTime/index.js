import React from 'react';
import { Button, FlatList } from "react-native";
import { Container, Content, ListItem, CheckBox, Body, Text, Item } from 'native-base';
import DateTimePicker from "react-native-modal-datetime-picker";
import Dialog from "react-native-dialog"
import moment from 'moment'


class SetTime extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isDateTimePickerVisible: false,
            time: '',
            isEmergencyChecked: false,
            hasHeartRate: false,
            options: [{ id: 1, key: 'Emergency' }, { id: 2, key: 'Has Heart Rate' }],
            selectedOption: [1],
            dialogVisible: false,
            hour: 0,
            minute: 0,
            second: 0
        };
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
        if (temp.includes(id)) {
            temp.splice(temp.indexOf(id), 1);
        }
        else {
            temp.push(id);
        }
        this.setState({ selected: temp }, () => {
            console.log(temp);
            console.log(this.state.selected);
        });

    }

    showDialog = () => {
        this.setState({ dialogVisible: true });
    };
    handleChangeHour = (h) => {
        let intH = parseInt(h);
        this.setState({hour: intH});
        // console.log("Hour:", this.state.hour);
        // console.log(typeof this.state.hour);
    }
    
    handleChangeMinute = (m) => {
        let intM = parseInt(m);
        this.setState({minute: intM});
        // console.log("Minute:", this.state.minute);
        // console.log(typeof this.state.minute);
    }

    handleChangeSecond = (s) => {
        let intS = parseInt(s);
        this.setState({second: intS});
        // console.log("Second:", this.state.second);
        // console.log(typeof this.state.second);
    }

    handleCancel = () => {
        this.setState({ dialogVisible: false });
    };

    handleOK = () => {
        let newItv = (this.state.hour)*60*60 + (this.state.minute)*60 + (this.state.second);
        console.log("New interval (seconds):", newItv);
        //update khoang thoi gian moi nhap vao db
        
        this.setState({ dialogVisible: false });
    };

    render() {
        return (

            <Container>
                <Content>
                    <Button title="Time Picker Demo" onPress={this.showDialog} />
                    {/* <DateTimePicker
                        isVisible={this.state.isDateTimePickerVisible}
                        onConfirm={this.handleTimePicked}
                        onCancel={this.hideDateTimePicker}
                        mode={'time'}
                        is24Hour={false}
                    /> */}
                    <Dialog.Container visible={this.state.dialogVisible}>
                        <Dialog.Title>Input Getting Data Period</Dialog.Title>
                        <Dialog.Description>
                            Set an interval time for getting data.
                        </Dialog.Description>
                        <Dialog.Input label="Hour(s)" style={{borderColor: 'gray', borderWidth: 1}} keyboardType={'numeric'} onChangeText={this.handleChangeHour.bind(this)}></Dialog.Input>
                        <Dialog.Input label="Minute(s)" style={{borderColor: 'gray', borderWidth: 1}} keyboardType={'numeric'} onChangeText={this.handleChangeMinute.bind(this)}></Dialog.Input>
                        <Dialog.Input label="Second(s)" style={{borderColor: 'gray', borderWidth: 1}} keyboardType={'numeric'} onChangeText={this.handleChangeSecond.bind(this)}></Dialog.Input>
                        <Dialog.Button label="Cancel" onPress={this.handleCancel} />
                        <Dialog.Button label="OK" onPress={this.handleOK} />
                    </Dialog.Container>
                    <Item>
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

                </Content>

            </Container>
        )
    }

}

export default SetTime;



