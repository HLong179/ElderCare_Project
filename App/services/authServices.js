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

export async function addElder(data) {

    const response = await fetch(`http://${SETTINGS.LOCAL_IP}:6900/account/addElder`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: data.name,
            gender: data.gender,
            age: Number(data.age),
            icid: data.icid,
            docterPhoneNum: Number(data.docterPhoneNum),

        })
    }) 

    const result = await response.json();
    return result;
}

export async function addMainRelative(data) {
    const response = await fetch(`http://${SETTINGS.LOCAL_IP}:6900/account/addMainUser`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            elder_id: data.icid,
            name: data.name,
            email: data.email,
            phone: data.phone,
            address: data.address,
            username: data.username,
            password: data.password,
        })
    });
    
    return response;
}

export async function updateElderWeight(data) {
    const response = await fetch(`http://${SETTINGS.LOCAL_IP}:6900/account/updateWeight`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            elderId: data.id,
            value: data.weight,
        })
    });
    
    return response;
}


export async function getElderDetail(id) {
    console.log(id);
    const response = await fetch(`http://${SETTINGS.LOCAL_IP}:6900/account/elderDetail`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            elderId: id,
        })
    }) 

    const result = await response.json();
    return result;

}