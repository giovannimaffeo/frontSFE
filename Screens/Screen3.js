/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

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

export default function Screen3({navigation}){

  const [qrRespose, setQr] = useState();


  const onSuccess = (response) =>{
      setQr(response.data);
     // Linking.openURL(response.data);
  }
  return(

    
    <SafeAreaView style={{flex:1, backgroundColor: 'white'}}>
        
        <QRCodeScanner  cameraStyle={{height:screenHeight}} onRead = {(e) => onSuccess(e)} reactivate = {true}/>
        <View >
  <Text>{qrRespose}</Text>
        </View>
    </SafeAreaView>


  );
}

Screen3.navigationOptions = ({ navigation }) => ({
  header: ( /* Your custom header */
    
    <Header navigation = {navigation} />

  )
})
