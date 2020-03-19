
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Linking,
  SafeAreaView
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import Header from './Header'
import Dimensoes, { screenWidth, screenHeight } from '../Dimensoes/Dimensoes';
import api from './../services/api';
import LottieView from 'lottie-react-native';
import {showMessage, hideMessage} from 'react-native-flash-message';

export default function Screen3({navigation}){


    async function confirmarPresenca(response){  

    try{
    const result = await api.get(`/validar/${response.data}`);
     console.log("log de sucesso:",result.data.message);
     showMessage({
       message:"Sua presença foi contabilizada!",
       type:"success",
       icon:"success",
       hideStatusBar:true,
       animated:false,
       //floating:true,
       style:{
         height:screenHeight*0.1
       },
       titleStyle:{
         fontWeight:'bold',
       },
       

     });
    }
  catch(e){
    console.log("log de erro:",e.originalError)
    if (e.problem == "NETWORK_ERROR"){
    showMessage({
      message:"Sem conexão a Internet",
      type:"danger",
      icon:"danger",
      hideStatusBar:true,
      animated:false,
      //floating:true,
      style:{
        height:screenHeight*0.1
      },
      titleStyle:{
        fontWeight:'bold',
      },
    });
  }
}
}
    
  

  return(

  <SafeAreaView style={{flex:1, backgroundColor: 'white'}}>
          
          {/*<View style = {{backgroundColor: 'red',width:screenWidth, height:screenHeight*0.5,}}/>*/}
          <QRCodeScanner  cameraStyle={{height:screenHeight*1}} onRead = {(e) => confirmarPresenca(e)} reactivate = {true} reactivateTimeout={5000}/>
          <View style={{position:"absolute",bottom:0, width:screenWidth, height:screenHeight, justifyContent:'center'}}>
          <LottieView autoPlay loop source ={require('./../assets/leitorQR')} style={{ width:screenHeight*0.4,height:screenHeight*0.4, alignSelf:'center',}}/>
          </View> 
          <View style={{ borderBottomWidth:(screenHeight-(screenHeight*0.4))/2,borderTopWidth:(screenHeight-(screenHeight*0.4))/2,borderLeftWidth:(screenWidth-(screenHeight*0.4))/2 ,borderRightWidth:(screenWidth-(screenHeight*0.4))/2, borderRadius:0,borderColor:"rgba(52, 52, 52, 0.4)", width:screenWidth,height:screenHeight,position:'absolute', bottom: 0,alignSelf:'center'}}/>
          
          <View >

          </View>
    </SafeAreaView>


  );
}

Screen3.navigationOptions = ({ navigation }) => ({
  header: ( /* Your custom header */
    
    <Header navigation = {navigation} />

  )
})
