import React from 'react';
import {Button, FlatList} from "react-native";
import {Container, Content, ListItem, CheckBox, Body, Text, Item} from 'native-base';
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from 'moment'


class SetTime extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isDateTimePickerVisible: false,
            time: '',
            isEmergencyChecked: false,
            hasHeartRate: false,
            options: [{id: 1, key: 'Emergency'}, {id: 2, key: 'Has Heart Rate'}],
            selectedOption: [1],
        };
    }

    showDateTimePicker = () => {
        this.setState({isDateTimePickerVisible: true});
    };

    hideDateTimePicker = () => {
        this.setState({isDateTimePickerVisible: false});
    };

    handleTimePicked = date => {
        console.log(moment(date).format('LT'));
        const pickedTime = moment(date).format('LT');
        this.setState({time: pickedTime}, () => this.hideDateTimePicker())
    };

    onSelectCheckbox = (id) => {
        let temp = this.state.selectedOption;
        if (temp.includes(id)) {
            temp.splice(temp.indexOf(id), 1);
        }
        else {
            temp.push(id);
        }
        this.setState({selected: temp}, () => {
            console.log(temp);
            console.log(this.state.selected);
        });

    }


    render() {
        return (

            <Container>
                <Content>
                    <Button title="Time Picker Demo" onPress={this.showDateTimePicker}/>
                    <DateTimePicker
                        isVisible={this.state.isDateTimePickerVisible}
                        onConfirm={this.handleTimePicked}
                        onCancel={this.hideDateTimePicker}
                        mode={'time'}
                        is24Hour={false}
                    />

                    <Item>
                        <FlatList
                            extraData={this.state}
                            keyExtractor={(item, index) => `list-item-${index}`}
                            data={this.state.options}
                            renderItem={({item}) => {
                                return(
                                <ListItem  /*onPress={() => this.onSelectCheckbox(item.id)} */   >
                                    <CheckBox
                                        checked= {this.state.selectedOption.includes(item.id) ? true: false}
                                        onPress={() => this.onSelectCheckbox(item.id)}
                                    />
                                    <Body>
                                        <Text>{item.key}</Text>
                                    </Body>
                                </ListItem>
                            )}}

                        />
                    </Item>

                </Content>

            </Container>
        )
    }

}

export default SetTime;



