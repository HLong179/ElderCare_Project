export function submitLogin(data) {
    console.log('action', data);
    console.log('call action');
    return {
        type: 'LOGIN',
        payload: data,
    }
}

