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
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { createAppContainer, } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';


import Dimensoes, { screenWidth, screenHeight } from '../Dimensoes/Dimensoes';

import Icon from 'react-native-vector-icons/FontAwesome';
Icon.loadFont();

import colors from '../styles/colors'
import fonts from '../styles/fonts';

export default function Header( props ){
    return(

        <View style={styles.header}>

        <TouchableOpacity style={{width: screenWidth*0.18, height: screenWidth*0.15, alignItems: 'center', justifyContent: 'center'}} onPress={() => props.navigation.openDrawer()}>

            <Icon name="bars" size={screenWidth*0.0625} color = {colors.secondary} />

        </TouchableOpacity>


        <View style={{alignSelf: 'center'}}>
        
            <Text style={styles.textoHeader}>SEMANA FLUXO</Text>

        </View>

        <Image style={styles.logofluxo}
            source = {require('../Assets/FluxoSemFundo.png') } />

        
    
    </View>
    )
}

const styles = StyleSheet.create({

    header:{
        flexDirection: 'row',
        alignItems: 'center',
        height: screenHeight*0.1,
        backgroundColor: colors.tertiary,
        borderBottomWidth: screenHeight*0.01,
        borderBottomColor: colors.quaternary,
        justifyContent: "space-between",
        paddingRight: screenWidth*0.05
  
        
    },
  
    textoHeader:{
      fontSize: screenHeight*0.03,
      fontFamily: fonts.bold,
      color: colors.primary
  
      
    },
  
    logofluxo:{
      borderRadius: screenWidth*0.0125,
      width: screenWidth*0.1625,
      height: screenWidth*0.1625,
  
    },
}
)