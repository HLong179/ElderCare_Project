import React, {Component} from 'react';
import {Header, Left, Body, Right, Title} from 'native-base';
import BulbComponent from './BulbComponent';
import PersonComponent from './PersonComponent';
import MoreComponent from './MoreComponent';
import type { RemoteMessage } from 'react-native-firebase';
import PushNotification from 'react-native-push-notification';
import firebase from "react-native-firebase";
import { withNavigation } from 'react-navigation';
import { Button, Vibration} from 'react-native'

class HeaderMultipleIcon extends Component {

    componentDidMount() {
        const that = this;
        PushNotification.configure({

            // (optional) Called when Token is generated (iOS and Android)
            onRegister: function(token) {
                console.log( 'TOKEN:', token );
            },

            // (required) Called when a remote or local notification is opened or received
            onNotification: function(notification) {
                console.log( 'NOTIFICATION:', notification );
               if (notification.message.includes("Số liệu nhịp tim")) {
                   // navigate to heart rate
                   Vibration.cancel();
                   that.props.navigation.navigate('HeartRate')                 
                

                   
               }
            },

            // ANDROID ONLY: GCM or FCM Sender ID (product_number) (optional - not required for local notifications, but is need to receive remote push notifications)
            senderID: "49718683704",

            // IOS ONLY (optional): default: all - Permissions to register.
            permissions: {
                alert: true,
                badge: true,
                sound: true
            },

            // Should the initial notification be popped automatically
            // default: true
            popInitialNotification: true,

            /**
            * (optional) default: true
            * - Specified if permissions (ios) and token (android and ios) will requested or not,
            * - if not, you must call PushNotificationsHandler.requestPermissions() later
            */
            requestPermissions: true,
        });

         this.messageListener = firebase.messaging().onMessage((message: RemoteMessage) => {
        // Process your message as required
        console.log("we create no0tificaton", message, message.data);
         let mTitle, mMessage;
           if (message.data.type === "Disconnect") {
               mtitle = "Thông báo";
               mMessage = "Không tìm thấy số liệu đo, xem lại vị trí đeo của đồng hồ thông minh!"
           } else {
               if (message.data.type === "Dangerous") {
                    mtitle = "Thông báo sức khỏe bệnh nhân";
                    mMessage = `Số liệu nhịp tim của bệnh nhân vào lúc ${message.data.time} đạt ngưỡng báo động ${message.data.value}`;
               } else {
                   if (message.data.type === "HeartRate") {
                        mtitle = "Thông báo sức khỏe bệnh nhân";
                        mMessage = `Số liệu nhịp tim của bệnh nhân vào lúc ${message.data.time} là ${message.data.value}`
                   }
               }
            }
            PushNotification.localNotification({
                title : mTitle, // (optional)
                message: mMessage, // (required)
            })
        });
       
    }
    componentWillUnmount() {
        this.messageListener();
    }
    render() {
        return (
            <Header>
                <Left />
                <Body>
                    <Title>Health App</Title>
                </Body>
                <Right>
                    {/*<BulbComponent/>*/}
                    <PersonComponent/>
                    {/*<MoreComponent/>*/}
                </Right>
                {/* <Button onPress={() => this.props.navigation.navigate('HeartRate')} title="HIHI"></Button> */}
            </Header>
        );
    }
}

export default withNavigation(HeaderMultipleIcon);