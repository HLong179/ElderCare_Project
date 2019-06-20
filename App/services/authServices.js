// const requestURL = 'http://192.168.1.9:6900'
import SETTINGS from "../settings"
import firebase from 'react-native-firebase';
import config from '../Constant';

import AsyncStorage from '@react-native-community/async-storage';


export async function Login(data) {
    const response = await  fetch(`${SETTINGS.LOCAL_IP}/account/login`, {
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
    const response = await fetch(`${SETTINGS.LOCAL_IP}/account/addSubUser`, {
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
    const response = await fetch(`${SETTINGS.LOCAL_IP}/account/getData`, {
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

    const response = await fetch(`${SETTINGS.LOCAL_IP}/account/addElder`, {
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
    const response = await fetch(`${SETTINGS.LOCAL_IP}/account/addMainUser`, {
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
    const response = await fetch(`${SETTINGS.LOCAL_IP}/account/updateWeight`, {
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
    const response = await fetch(`${SETTINGS.LOCAL_IP}/account/elderDetail`, {
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


export async function getCurrentUser() {
    const curUser = await AsyncStorage.getItem('curUser');
    const objCurUser = JSON.parse(curUser);
    return objCurUser;
}