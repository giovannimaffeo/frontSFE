
import React from 'react';
import {SafeAreaView, TouchableOpacity, StyleSheet} from 'react-native';
//Redux
import { useSelector } from 'react-redux';
//Redux
import Icon from 'react-native-vector-icons/MaterialIcons';
Icon.loadFont();

import Dimensoes, { screenWidth, screenHeight } from '../Dimensoes/Dimensoes';

export default function BackHeader({navigation}){

    //Redux
    //permite que usarmos os estados que está armazenado na store
    const colorsList = useSelector(state => state.data);
    //Redux

    return(
      <SafeAreaView style={[styles.header, {backgroundColor: colorsList.terciaria}]} >

        <TouchableOpacity style={{width: screenWidth*0.18, height: screenWidth*0.18, alignItems: 'center', justifyContent: 'center'}} onPress={() => navigation.goBack()}>

            <Icon name="keyboard-arrow-left" size={screenWidth*0.09} color = {colorsList.secundaria} />
            
        </TouchableOpacity>

      </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    header:{
        flexDirection: 'row',
        alignItems: 'center',
        ...Platform.select({
            ios: {
                height: screenHeight*0.1,
            },
            android: {
                height: screenHeight*0.07,
            },      
          }),
    }
})