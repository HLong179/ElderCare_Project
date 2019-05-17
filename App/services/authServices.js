import axios from 'axios';
// const requestURL = 'http://192.168.1.9:6900'
import SETTINGS from "../settings"
import firebase from 'react-native-firebase';
import config from '../Constant';

export async function Login(data) {
    const response = await  fetch(`http://${SETTINGS.LOCAL_IP}:6900/account/login`, {
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
}

export async function AddRelative(data) {
    const response = await fetch(`http://${SETTINGS.LOCAL_IP}:6900/account/addSubUser`, {
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

export async function getUserData(data) {
    const response = await fetch(`http://${SETTINGS.LOCAL_IP}:6900/account/getData`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            elder_id: data.id,
        })
    }) 

    const result = await response.json();
    return result;

}

