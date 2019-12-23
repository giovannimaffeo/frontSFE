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
import { createStackNavigator, Assets } from 'react-navigation-stack';


import Dimensoes, { screenWidth, screenHeight } from '../Dimensoes/Dimensoes';

import palestra from './Palestra'

import Icon from 'react-native-vector-icons/FontAwesome';

import Animation from 'lottie-react-native';

import LottieView from 'lottie-react-native';










export default function TelaFavorito({ navigation }){
  return(
    
    <View style={styles.container}>

      <View style={styles.titleContainer}>

        <View style={{marginTop: screenHeight*0.02}}>

          <Text style={styles.title}>Palestras Favoritas</Text>

        </View>

        <View>

          <LottieView 
            source={require('../Assets/coracao_laranja_maior')} 
            autoPlay 
            loop 
            style={{height: 50}}/>

        </View>

      </View>

      

      


        



    </View>

  );
}


TelaFavorito.navigationOptions = ({ navigation }) => ({
  header: (  
    <View style={styles.header} >

      <View style={{width: 30}}>

        <Icon name="bars" size={25} color="white" onPress={() => navigation.openDrawer()} />

      </View>


      <View style={{marginLeft: screenWidth*0.08}}>
        
        <Text style={styles.textoHeader}>SEMANA FLUXO</Text>

      </View>

      <Image style={styles.logofluxo}
        source = {require('../Assets/FluxoSemFundo.png') } />

    
    
    </View>

  )
}) 

const styles = StyleSheet.create({

  header:{
    flexDirection: 'row',
    alignItems: 'center',
    height: screenHeight*0.1,
    backgroundColor: '#F4893B',
    borderBottomWidth: screenHeight*0.01,
    borderBottomColor: "#C0C0C0",
    justifyContent: "space-between",
    padding: 20

    
},

textoHeader:{
  fontSize: screenHeight*0.03,
  fontFamily: "Gelasio-Bold"

  
},

logofluxo:{
  borderRadius:5,
  width: 65,
  height: 65,

},


  container: {
    backgroundColor: '#222222',
    flex: 1,
  
    
  },

  titleContainer: {
    height: screenHeight*0.1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center'


  },
  title:{
    color: '#F4893B',
    fontFamily: 'Gelasio-Bold',
    fontSize: 30
  },


}
)



