import React, { useState } from 'react';
import axios from 'axios'
import { URL } from '@env';
import { Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';


export const ADD_USER='ADD_USER'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAIL = 'LOGIN_FAIL'
export const POST_CONTACTS = 'POST_CONTACTS'

//ACTIONS CREATE: CREAR UN USUARIO 
export function createUser(user) {

  return function (dispatch) {
    console.log(URL)
    return axios.post(`http://${URL}/api/user/createUser`, user)
      .then((resp) => {
        dispatch({
          type: ADD_USER,
          user: resp.data
        })
      })
      .catch((error) => {
        // console.warn(error)

      })

  }

}

const LoginStorage=(user)=>{
  AsyncStorage.setItem('token', JSON.stringify(user.token), err => {
    if (err) console.log('ERROR en AsyncStorage', err);
})
AsyncStorage.setItem('usuario', JSON.stringify(user), err => {
    if (err) console.log('ERROR en AsyncStorage', err);
})

}
export const loginUser=(user, props)=>async(dispatch)=>{
  try{
    const resp= await axios.post(`http://${URL}/api/user/login`, user);
    
    const loginData= await resp.data;
    console.log('LOGIN', loginData)
    dispatch({
          type: LOGIN_SUCCESS,
           user: loginData 
         });
    LoginStorage(loginData)
    if(loginData.message==='success'){
      props.navigation.navigate('UserProfile')
    }

  }catch(error){
    dispatch({
      type: 'LOGIN_FAIL',
      user:error.resp.data
    })
  }
}


export const logout = (token) => {
  return function(dispatch){
    return axios.post(`http://${URL}/api/user/logout`, {token})
    .then(resp=>{
       dispatch({ type: 'LOGOUT_SUCCESS' })
    })
  }
};

//VELIDAR PIN
export function validarPin(pin, props) {
  return function (dispatch) {
    return axios.post(`http://${URL}/api/user/validateUserPin`, { 'pin': pin })
      .then(resp => {
        // console.warn(resp.data.message)
        console.log(resp)
        dispatch({
          type: 'VALID_PIN',
          pin: resp.data.pin
        })
        if (resp.data.message === 'success') {

          props.navigation.navigate("CompleteDataUser")
        }
      })
      .catch(error => {
        if (error) {
          Alert.alert(
            'Error',
            'Invalid PIN',
            [{
              text: 'OK',
              onPress: () => { props.navigation.navigate("InsertPin") }
            }]
          )
        }
      })
  }

}

//COMPLETAR DATOS DEL USUARIO

export function updateUser(lastname, typeDoc, numberDoc, birthday, numberPhone, email, image, props) {
  const usuario = { lastname, typeDoc, numberDoc, birthday, numberPhone, email, image }
  // console.log('USUARIO RECIVIDO', usuario)

  return function (dispatch) {
    return axios.put(`http://${URL}/api/user/approveUser`, usuario)
      .then(resp => {
        // console.warn(resp)
        dispatch({
          type: 'EDIT_USER',
          user: resp.data
        })
        console.log('REPUESTA', resp)
        if (resp.data.message === 'success') {

          props.navigation.navigate("RegisterAdress")
        }
      })
      .catch(error => {
        console.log(error)
      })
  }
}

export function addAddress(payload) {
  console.log(payload)
  return function (dispatch) {
    return axios.put(`http://${URL}/api/user/cuentaGo`, payload)
      .then(resp => {

        dispatch({
          type: 'GET_USER',
          user: resp.data
        })
      })
  }

}

export function getDataUser(id) {
 console.log('PARAMETROS ID:',id)
  return function (dispatch) {
    return axios.get(`http://${URL}/api/user/${id}`)
      .then(resp => {
        dispatch({
          type: 'GET_DATA_USER',
          user: resp.data
        })
      })
      .catch(error=>{
        console.log(error)
      })
  
  }

}

