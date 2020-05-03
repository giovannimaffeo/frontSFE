
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
//Redux
import { useSelector } from 'react-redux';
//Redux
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
Icon.loadFont();

import Dimensoes, { screenWidth, screenHeight } from '../Dimensoes/Dimensoes';

export default function DrawerIcon({ labelName }){

    //Redux
    //permite que usarmos os estados que está armazenado na store
    const colorsList = useSelector(state => state.data);
    //Redux

    return(
        <View style={{marginLeft: screenWidth*0.07, alignItems: 'center', justifyContent: 'center'}}>
            <Text style = {[styles.texto, {color: colorsList.terciaria}]}>{ labelName }</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    texto: {
      ...Platform.select({
        ios: {
          fontSize: screenHeight*0.026,
          marginTop: screenHeight*0.0045
        },
        android: {
          fontSize: screenHeight*0.027,
        },
      }),
      fontWeight: "bold",
      //fontFamily: fonts.bold,
      height: screenHeight*0.035,
    },
})