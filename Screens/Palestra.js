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
  return(

    <View style={styles.container}>

        
        <View style={styles.horario}>

            <Text style={styles.texto}>{props.horario}</Text>

        </View>

        <TouchableOpacity style={styles.programacao} onPress = {() => props.navigation.navigate('Informacoes')}>

                <View>

                  <View>

                    <Text>

                      <Text style={styles.texto}>Tema:</Text> <Text style={{fontFamily: "Gelasio-Regular"}}>{props.tema}</Text>

                    </Text>

                  </View>


                  <View>

                    <Text>

                      <Text style={styles.texto}>Autor:</Text> <Text style={{fontFamily: "Gelasio-Regular"}}>{props.autor}</Text>

                    </Text>

                  </View>

                
                </View>


        </TouchableOpacity>

    </View>

  );
}

const styles = StyleSheet.create({

  container:{
    flexDirection: 'row',
    borderWidth: screenWidth*0.002,
    borderColor: "#C0C0C0",
    backgroundColor: "#d9d9d9",
    height: screenHeight*0.12

  },

  horario:{
    width: '30%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: screenWidth*0.002,
    borderColor: "#222222"

  },

  programacao:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

  },

  texto:{
    color: 'black',
    fontFamily: "Gelasio-Bold"
  }

}
)

