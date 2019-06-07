import React from "react";
import {
  CardItem,
  Icon,
  Button,
  Text,
  Toast,
} from "native-base";
import { withNavigation } from "react-navigation";
import styled from "styled-components";
import { View, StyleSheet,  } from "react-native";
import Slider from "react-native-slider";
import Dialog from "react-native-dialog";
import { updateElderWeight, getElderDetail } from '../../../services/authServices';
import CommonCard from '../../../components/CommonCard';
import AsyncStorage from "@react-native-community/async-storage";

const StyledText = styled(Text)`
     font-size: 50px;
     line-height: 60px;
`;
const Wrapper = styled(View)`
    margin-left: -10px;
    flex-direction: row;
    margin-bottom: 40px;
    margin-top: 40px;
`;

class CardDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weight: 0,
      newWeight: 0,
      isShowUpdateForm: false,
      visible: false,
      id: '',
    };
  }

  componentDidMount =  async () => {
    let dataCur = await AsyncStorage.getItem("curUser")
    let jsonData = JSON.parse(dataCur);
    let id = jsonData.elderId;


    let response = await getElderDetail(id);
    let weight = response.weight ? response.weight : 0;

    this.setState({ id, weight, newWeight: weight }, () => console.log(this.state));
  }

  handleUpdate = () => {
    const { newWeight, id} = this.state;

    this.setState({ weight: newWeight, visible: false },  async() => {
      let data = { 
        id,
        weight: newWeight,
        
      }
      try {
      let result = await updateElderWeight(data);

      console.log(result);

      Toast.show({
        text: 'Update thành công',
        buttonText: 'Ok',
        type: "success"
      })

      }
      catch(error ) {
        Toast.show({
          text: 'Update không thành công',
          buttonText: 'Ok',
          type: 'error',
        })
  

      }
    });
  };

  showDialog = () => {
    this.setState({ visible: true });
  }

  onCancel = () => {
    const { weight } = this.state;
    this.setState({ visible: false, newWeight: weight })
  }

  render() {
    const { visible, weight, newWeight } = this.state;

      return (
        <CommonCard>
          <CardItem>
            <View
              style={{
                alignItems: "center",
                flex: 1,
                textAlign: "center"
              }}
            >
              <View flexDirection="row">
                <Icon
                  name="paw"
                  style={{
                    fontSize: 40,
                    color: "red",
                    lineHeight: 40,
                    marginRight: 10
                  }}
                />
                <Text style={{ fontSize: 20, lineHeight: 40 }}>
                  {"Cân Nặng"}
                </Text>
              </View>

              <Wrapper>
                <StyledText text="12">{weight}</StyledText>
                <Text style={{ lineHeight: 60, fontSize: 30 }}>/Kg</Text>
              </Wrapper>
              <Button
                full
                info
                onPress={this.showDialog}
              >
                <Text>{"Cập Nhật"}</Text>
              </Button>

              <Dialog.Container visible={visible}>
              <Dialog.Title>{'Cập nhật cân nặng'}</Dialog.Title>
                  <Slider
                    minimumValue={0}
                    maximumValue={120}
                    value={Math.round(weight)}
                    onValueChange={value => this.setState({ newWeight: Math.round(value)})}
                  />
                  <Text style={{textAlign: 'center'}}>{Math.round(newWeight)}/kg</Text>
              <Dialog.Button label="Hủy" onPress={this.onCancel}/>
              <Dialog.Button label="Cập nhật" onPress={this.handleUpdate}/>
              </Dialog.Container>
            </View>
          </CardItem>
        </CommonCard>
      );
    }
}


export default withNavigation(CardDetail);
