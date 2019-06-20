import type { RemoteMessage } from 'react-native-firebase';
import PushNotification from 'react-native-push-notification';
import firebase from 'react-native-firebase';
import {Vibration} from "react-native";
import {AsyncStorage} from 'react-native';
const PATTERN = [ 1000, 2000 ] ;
export default async (message: RemoteMessage) => {
    // handle your message
    console.log("we received message from background", message);


         let mTitle, mMessage;
        if (message.data.type === "Confirm") {
            // do some thing in here
            mTitle = "Thông báo";
            mMessage = message.data.body
        } else {
            if (message.data.type === "ServiceOff") {
                mTitle = "Thông báo";
                mMessage = "Dịch vụ truy cập dữ liệu sức khỏe đã dừng, điều này sẽ ảnh hưởng tới việc nhận thông báo nhịp tim của bệnh nhân!"
            } else {
                if (message.data.type === "IntervalChanged") {
                    mTitle = "Thông báo";
                    mMessage = `Dữ liệu nhịp tim sẽ được gửi tới trong vòng ${message.data.value} phút nữa!`;
                } else {
                    if (message.data.type === "Disconnect") {
                        mTitle = "Thông báo";
                        mMessage = "Không tìm thấy số liệu đo, chỉnh sửa lại vị trí đeo của đồng hồ thông minh!"
                    } else {
                        if (message.data.type === "Dangerous") {
                            mTitle = "Thông báo sức khỏe bệnh nhân";
                            mMessage = `Số liệu nhịp tim của bệnh nhân vào lúc ${message.data.time} đạt ngưỡng báo động ${message.data.value}`;
                            Vibration.vibrate(PATTERN, true) ;
                        } else {
                            if (message.data.type === "HeartRate") {
                                mTitle = "Thông báo sức khỏe bệnh nhân";
                                mMessage = `Số liệu nhịp tim của bệnh nhân vào lúc ${message.data.time} là ${message.data.value}`
                           
                          }
                        }
                    }
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