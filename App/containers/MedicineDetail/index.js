import React from 'React';
import { Image } from 'react-native';
import { Container, Card, CardItem, Text, Body, Content } from 'native-base';
import drug from '../../images/drugs.jpg'

class MedicineDetails extends React.Component {
  render() {
    return (
      <Container>
          <Content>
          <Card>
            <CardItem>
              <Body>
                <Image source={drug} style={{ height: undefined, width: '100%', aspectRatio: 1  }} />
            
              </Body>
            </CardItem>

            <CardItem header>
              <Text>Viên xanh</Text>
            </CardItem>
            <CardItem>
              <Body>
                <Text>
                 Ngày sử dụng 2 lần sáng/tối. Mỗi lần 1 viên. 
                </Text>
              </Body>
            </CardItem>

            <CardItem header>
              <Text>Viên đỏ</Text>
            </CardItem>
            <CardItem>
              <Body>
                <Text>
                 Ngày 3 lần. Mỗi lần 1 viên. Sử dụng sau bữa ăn.
                </Text>
              </Body>
            </CardItem>

            <CardItem header>
              <Text>Viên trắng</Text>
            </CardItem>
            <CardItem>
              <Body>
                <Text>
                 Ngày 1 lần sau bữa tối. 
                </Text>
              </Body>
            </CardItem>
          </Card>
          </Content>
      </Container>
    );
  }
}

export default MedicineDetails;