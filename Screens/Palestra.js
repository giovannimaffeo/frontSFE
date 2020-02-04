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

                      <Text style={styles.texto}>Tema:</Text> <Text style={{fontFamily: "Gelasio-SemiBold"}}>{props.data.tema}</Text>

                    </Text>

                  </View>


                  <View>

                    <Text>

                      <Text style={styles.texto}>Palestrante:</Text> <Text style={{fontFamily: "Gelasio-SemiBold"}}>{props.data.palestrante}</Text>

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
    borderColor: "#C0C0C0",
    height: screenHeight*0.137,
    borderBottomWidth: screenHeight*0.003,
    
    

  },

  containerImagem:{
    width: screenWidth*0.25,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: "#222222"

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

  texto:{
    color: '#F4893B',
    fontFamily: "Gelasio-Bold",
    fontSize: screenHeight*0.023
  },

  horario:{
    color: '#F4893B',
    fontFamily: "Gelasio-Bold",
    fontSize: screenHeight*0.0215,
    
    

  }



}
)

