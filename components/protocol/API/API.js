import { Platform } from "react-native"

const URL = Platform.OS === 'android' ? 'http://10.0.2.2:8080/api' : 'http://172.20.10.2:8080/api'

export const postLoginApi = async (username, password) => {
    let data = { username: username, password: password }
    
    return await fetch(`${URL}/login`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then((response) => response.json())
    .then((json) => {
      return json
    })
    .catch((err) => {
        console.log(`login ERROR`, err);
    })
}

export const postRegisterApi = async (username, email, password) => {
    let data = { username: username, email: email, password: password }

    return await fetch(`${URL}/register`,{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }) 
    .then((response) => response.json())
    .then((json) => {
      return json
    })
    .catch((err) => {
        console.log(`register ERROR`, err);
    })
}

export const getText = async () =>{
    return await fetch(`${URL}/test`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
    })
    .then((response) => response.json())
    .then((json) => {
      return json
    })
    .catch((err) => {
        console.log(`login ERROR`, err);
    })
}