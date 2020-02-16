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








export default function Palestra( props ){
  
  const data = props.data

  return(

    <TouchableOpacity style={styles.container} onPress = {() => props.navigation.navigate('Informacoes', { data } )} >

        
        <View style={styles.containerImagem}>

            <Image  style={styles.fotoPalestrante}
            source={{ uri: props.data.foto_palestrante}}/>

        </View>

        <View style={styles.programacao} onPress = {() => props.navigation.navigate('Informacoes')}>

                <View>

                  <View>

                    <Text>

                      <Text style={styles.texto_padrao}>Tema:</Text> <Text style={styles.texto_variavel}>{props.data.tema}</Text>

                    </Text>

                  </View>


                  <View>

                    <Text>

                      <Text style={styles.texto_padrao}>Palestrante:</Text> <Text style={styles.texto_variavel}>{props.data.palestrante}</Text>

                    </Text>

                  </View>

                  <View style={{marginLeft: screenWidth*0.3}}>

                    <Text style={styles.horario}>{props.data.horario}</Text>

                  </View>
                  

                
                </View>


        </View>

    </TouchableOpacity >

  );
}

const styles = StyleSheet.create({ //d9d9d9

  container:{
    flexDirection: 'row',
    borderColor: colors.quaternary,
    height: screenHeight*0.137,
    borderBottomWidth: screenHeight*0.003,
    
    

  },

  containerImagem:{
    width: screenWidth*0.25,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: colors.primary

  },

  fotoPalestrante: {
    borderRadius: screenWidth*0.095,
    width: screenWidth*0.19,  
    height: screenWidth*0.19, 
    

  },

  programacao:{
    alignItems: 'center',
    justifyContent: 'center',

  },

  texto_padrao:{
    color: colors.tertiary,
    fontFamily: fonts.bold,
    fontSize: screenHeight*0.023
  },

  texto_variavel:{
    color: colors.primary,
    fontFamily: fonts.semi_bold,
    fontSize: screenWidth*0.034

  },

  horario:{
    color: colors.tertiary,
    fontFamily: fonts.bold,
    fontSize: screenHeight*0.0215,
    
    

  }



}
)

