/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  AppRegistry,
  Image,
  FlatList,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { useState, useEffect } from 'react';


import Dimensoes, { screenWidth, screenHeight } from '../Dimensoes/Dimensoes';










export default function Error( props ){

    const [errorMessage, seterror] = useState(props.errorMessage);


    useEffect( () => {

        setTimeout(() => {
            seterror('Sem conexão a internet');
            }, 3000);
        
      }, [])

    return(

        <View style={styles.conatiner}>

         <Text style={styles.errorMessage}>{errorMessage}</Text>

        </View>          

    );
}

const styles = StyleSheet.create({

    conatiner:{
        backgroundColor: 'red',
        height: screenHeight*0.05,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: screenWidth*0.006
    },

    errorMessage:{
        color: 'white',
        fontSize: screenHeight*0.023,
        fontWeight: 'bold'
    }
})