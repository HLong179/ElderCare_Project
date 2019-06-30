import React, {Component} from 'react';
import {Text} from 'react-native';
import styled from "styled-components";
import {Content, Form, Label, Icon, Input, Toast, ListItem, Picker } from "native-base";
import Item from "../../../../components/CommonItemInput";
import Button from "../../../../components/CommonButton";
import Wrapper from "../../../../components/CommonWrapper";
import { Formik } from 'formik';
import TextError from '../../../../components/CommonFormError/index';
// import * as authServices from '../../../services/authServices';
import { addElder } from '../../../../services/authServices';
import AsyncStorage from '@react-native-community/async-storage';
import { BackHandler } from 'react-native'
import getSchema from './validateSchema';
const maxAge = 100;

const StyleHeader = styled(Text)`
    font-size: 30;
    font-weight: bold;
    margin-bottom: 20;
    color: darkslategray;
    align-self: center;

`;


class SignUp extends Component {
    static navigationOptions = ({navigation}) => ({
        header: null
    })

    constructor(props) {
        super(props);
        this.state = {
          icid: '',
          name: '',
          age: 40,
          gender: 'Nữ',
          docterPhoneNum: '',
          selected2: undefined,
        }
    }

    onGenderChange = (value) => {
      console.log('gender', value);

      this.setState({
        gender: value,
      });
    }

    onAgeChange = (value) => {
      this.setState({
        age: value,
      })
    }

    handleAddElder = async (values) => {
      const { icid, name, docterPhoneNum} = values;
      const { age, gender } = this.state;

      const data = {
        name,
        gender,
        age,
        icid,
        docterPhoneNum,
      }


      try {
      const response = await addElder(data);
      await AsyncStorage.setItem('currElderId', data.icid);
      Toast.show({
        text: `${response.message}`,
        buttonText: "OK",
        type: 'success'
      })
      this.props.navigation.navigate('MainRelativeSignUp');
      } catch(error) {
        Toast.show({
          text: `${error}`,
          buttonText: "OK",
          type: 'danger'
        })
      }
}

    createPickerItems = () => {
      let Items = [];
      for(let i = 40; i < 100; i++) {
        Items.push(
          <Picker.Item label={`${i}`} value={`${i}`} key={i} />
        )
      }
      return Items;
    }
    componentWillMount() {
      BackHandler.addEventListener(
        "hardwareBackPress",
        this.handleBackButtonClick
      );
    }

    componentWillUnmount() {
      BackHandler.removeEventListener(
        "hardwareBackPress",
        this.handleBackButtonClick
      );
    }

    handleBackButtonClick = () => {
      this.props.navigation.navigate('Login');
      return
    }

    render() {
        const  initialValues  = this.state;
        return (
          <Wrapper>
            <Content>
              <Formik
                initialValues={initialValues}
                onSubmit={this.handleAddElder}
                validationSchema={getSchema()}
              >
                {props => (
                  <Form>
                    <StyleHeader>Đăng Ký</StyleHeader>
                    <Item>
                      <Input
                        placeholder={"Vui lòng nhập Icid"}
                        name={"icid"}
                        onChangeText={props.handleChange("icid")}
                        autoFocus={true}
                        value={props.values.icid}
                        autoCapitalize={"none"}
                      />
                      <Icon active name="person-add" />
                    </Item>

                    <TextError>
                      {props.touched.icid && props.errors.icid}
                    </TextError>

                    <Item >
                      <Picker
                        mode="dropdown"
                        iosIcon={<Icon name="arrow-down" />}
                        style={{ width: 20 }}
                        placeholder="Giới tính"
                        placeholderStyle={{ color: "#bfc6ea" }}
                        placeholderIconColor="#007aff"
                        selectedValue={this.state.gender}
                        onValueChange={(itemValue, itemIndex) => {
                          props.setFieldValue('gender', itemValue);
                          this.setState({
                            gender: itemValue,
                          })
                        }}
                      >
                        <Picker.Item label="Nữ" value="Nữ" />
                        <Picker.Item label="Nam" value="Nam" />
                      </Picker>
                    </Item>

                    <Item>
                      <Input
                        placeholder={"Tên"}
                        name={"name"}
                        onChangeText={props.handleChange("name")}
                        // autoFocus={true}
                        value={props.values.name}
                        autoCapitalize={"none"}
                      />
                      <Icon active name="person-add" />
                    </Item>

                    <TextError>
                      {props.touched.name && props.errors.name}
                    </TextError>

                    <Item >
                      <Picker
                        mode="dropdown"
                        iosIcon={<Icon name="arrow-down" />}
                        style={{ width: undefined }}
                        placeholder="Vui lòng chọn tuổi"
                        placeholderStyle={{ color: "#bfc6ea" }}
                        placeholderIconColor="#007aff"
                        selectedValue={props.values.age}
                        onValueChange={(itemValue, itemIndex) => {
                          props.setFieldValue('age', itemValue);
                          this.setState({
                            age: itemValue,
                          })
                        }}
                      >

                        { this.createPickerItems() }
                      </Picker>
                    </Item>

                    <Item>
                      <Input
                        placeholder={"Số điện thoại bác sỹ"}
                        name={"docterPhoneNum"}
                        onChangeText={props.handleChange("docterPhoneNum")}
                        value={props.values.docterPhoneNum}
                        autoCapitalize={"none"}
                      />
                      <Icon active name="call" />
                    </Item>

                    <TextError>
                      {props.touched.username && props.errors.username}
                    </TextError>

                    <Button
                      style={{ marginTop: 10 }}
                      onPress={props.handleSubmit}
                      title={"Thêm bệnh nhân"}
                    />
                  </Form>
                )}
              </Formik>
            </Content>
          </Wrapper>
        );
    }
}



export default (SignUp);
