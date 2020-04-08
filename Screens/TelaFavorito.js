/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
} from 'react-native';




import { screenWidth, screenHeight } from '../Dimensoes/Dimensoes';

import Header from './Header'



import LottieView from 'lottie-react-native';

import Palestra from '../Screens/Palestra'

import colors from '../styles/colors';
import fonts from '../styles/fonts';

//novo
import api from '../services/api'
import { useState, useEffect } from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import Error from './Error'



export default function TelaFavorito({ navigation }){

  //puxando do back comecando aqui

  const [lista_favoritos, set_lista_favoritos] = useState(null);

  const [errorMessage, seterror] = useState(null);

  const [loading, setloading] = useState(true)

  async function DefineListaFavoritos() {

    try {

      const response = await api.get('/verfavoritos/');

      const favoritos = response.data

      set_lista_favoritos(favoritos)

      setloading(false)
    
    } catch(err) {

      seterror( 'Não foi possível carregar os favoritos' );

      setloading(false)

    }

  };

  useEffect( () => {

    DefineListaFavoritos()
    
  })




  return(
    
    <View style={styles.container}>

      <Spinner visible={loading}/>

      { !!errorMessage && <Error errorMessage={errorMessage}/> }

      <View style={styles.titleContainer}>

        <View style={{marginTop: screenHeight*0.02}}>

          <Text style={styles.title}>Palestras Favoritas</Text>

        </View>

        <View>

          <LottieView 
            source={require('../Assets/coracao_laranja_maior')} 
            autoPlay 
            loop 
            style={{height: screenHeight*0.0719}}/>

        </View>

      </View>

      <View style={styles.bodyContainer}>

        <FlatList 

        data = {lista_favoritos}

        renderItem = { ({item}) =>  < Palestra data = {item} length={lista_favoritos.length} index = {lista_favoritos.indexOf(item)} lastindex = {lista_favoritos.length - 1} navigation = {navigation}  /> }

        keyExtractor={ (item) => item.id.toString() }

        />

      </View>

      

      


        



    </View>

  );
}


TelaFavorito.navigationOptions = ({ navigation }) => ({
  header: (  
    
    <Header navigation = {navigation} />

  )
}) 

const styles = StyleSheet.create({

  header:{
    flexDirection: 'row',
    alignItems: 'center',
    height: screenHeight*0.1,
    backgroundColor: colors.tertiary,
    borderBottomWidth: screenHeight*0.01,
    borderBottomColor: colors.quaternary,
    justifyContent: "space-between",
    padding: 20

    
},

textoHeader:{
  fontSize: screenHeight*0.03,
  fontFamily: fonts.bold

  
},


  logofluxo:{
    borderRadius: screenWidth*0.0125,
    width: screenWidth*0.1625,
    height: screenWidth*0.1625,

  },


  container: {
    backgroundColor: colors.primary,
    flex: 1,
    borderRadius: screenWidth*0.015,
  
    
  },

  titleContainer: {
    height: screenHeight*0.1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',


  },
  title:{
    color: colors.tertiary,
    fontFamily: fonts.bold,
    fontSize: screenWidth*0.075
  },

  bodyContainer:{
    marginTop: screenHeight*0.018,
    borderTopWidth: screenHeight*0.003, 
    backgroundColor: 'white',
    borderRadius: screenHeight*0.015,
  }


}
)



