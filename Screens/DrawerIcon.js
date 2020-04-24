
import React from 'react';
import { View } from 'react-native';
//Redux
import { useSelector } from 'react-redux';
//Redux
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
Icon.loadFont();

import Dimensoes, { screenWidth, screenHeight } from '../Dimensoes/Dimensoes';

export default function DrawerIcon({ iconName }){

    //Redux
    //permite que usarmos os estados que está armazenado na store
    const colorsList = useSelector(state => state.data);
    //Redux

    return(
        <View style = {{width:screenWidth*0.07, height: screenHeight*0.1 , alignItems: 'center', justifyContent: 'center',}}>
            <Icon name={iconName} size={screenWidth*0.06} color = {colorsList.secundaria} />
        </View>
    );
}
