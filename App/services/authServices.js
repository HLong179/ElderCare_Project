import axios from 'axios';
const requestURL = 'http://192.168.1.9:6900'
import firebase from 'react-native-firebase';
import config from '../Constant';

export async function Login(data) {
    console.log(data);
    const response = await  fetch(`${requestURL}/account/login`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: data.username,
            password: data.password
        })
    })

    const result = await response.json();
    return result;
        // .then(( response) => {
        //         // console.log('the result after login : ', response);
        //         // const Side = firebase.initializeApp(config.opt, 'test');
        //         // Side.onReady().then(app => {
        //         //     app.messaging().subscribeToTopic('S1mdk2XxXg');
        //         // })
        //       return response;
        //     }
        // )
        // .catch(e => console.log(e))


}

export async function AddRelative(data) {
    console.log(data);
    const response = await  fetch(`${requestURL}/account/addSubUser`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            elder_id: data.id,
            name: data.username,
            email: data.email,
            phone: data.phone,
            address: data.address,
            username: data.username,
            password: data.password,

        })
    })

    const result = await response.json();
    return result;
}

