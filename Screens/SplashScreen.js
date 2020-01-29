/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useState, useEffect } from "react";

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  Linking
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import Dimensoes, { screenWidth, screenHeight } from '../Dimensoes/Dimensoes';


export default function SplashScreen() {

  return (

    <View style = {styles.container}>


        <Image source = {require('../Assets/FluxoSemFundo.png') }
                style = {styles.icone} />


    </View>

  )
}

const styles = StyleSheet.create({

    container:{
        backgroundColor: '#222222',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    icone:{
        width: screenHeight*0.2875,
        height: screenHeight*0.2875



    }



})