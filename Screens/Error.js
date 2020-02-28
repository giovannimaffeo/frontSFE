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

import { createAppContainer, } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';


import Dimensoes, { screenWidth, screenHeight } from '../Dimensoes/Dimensoes';

import colors from '../styles/colors'
import fonts from '../styles/fonts';








export default function Error( props ){
  

    return(

        <View style={styles.conatiner}>

            <Text style={styles.errorMessage}>{props.errorMessage}</Text>

        </View>          

    );
}

const styles = StyleSheet.create({

    conatiner:{
        backgroundColor: 'red',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: screenWidth*0.004
    },

    errorMessage:{
        color: 'white',
        fontSize: screenHeight*0.023,
        fontWeight: 'bold'
    }
})