import type { RemoteMessage } from 'react-native-firebase';
import PushNotification from 'react-native-push-notification';
import firebase from 'react-native-firebase';
import {Vibration} from "react-native";
const PATTERN = [ 1000, 2000 ] ;
export default async (message: RemoteMessage) => {
    // handle your message
    console.log("we received message from background", message);

         let mTitle, mMessage;
           if (message.data.type === "Disconnect") {
               mtitle = "Thông báo";
               mMessage = "Không tìm thấy số liệu đo, xem lại vị trí đeo của đồng hồ thông minh!"
           } else {
               if (message.data.type === "Dangerous") {
                    mtitle = "Thông báo sức khỏe bệnh nhân";
                    mMessage = `Số liệu nhịp tim của bệnh nhân vào lúc ${message.data.time} đạt ngưỡng báo động ${message.data.value}`;
                    Vibration.vibrate(PATTERN, true) ;
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
                // vibrate: true,
                // vibration: 5000
            })

    return Promise.resolve();
}