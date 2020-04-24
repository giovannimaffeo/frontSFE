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
  Keyboard,
  Image
} from 'react-native';


import { screenWidth, screenHeight } from '../Dimensoes/Dimensoes';

import Header from './Header'



import LottieView from 'lottie-react-native';

import Palestra from '../Screens/Palestra'

import fonts from '../styles/fonts';

//novo
import api from '../services/api'
import { useState, useEffect } from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import Error from './Error'

//Redux
import { useSelector } from 'react-redux';
//Redux


export default function TelaFavorito({ navigation }){

  //Redux
  const colorsList = useSelector(state => state.data)
  //Redux

  //puxando do back comecando aqui

  const [lista_favoritos, set_lista_favoritos] = useState(null);

  const [errorMessage, seterror] = useState(null);

  const [loading, setloading] = useState(true);


  async function DefineListaFavoritos() {

    try {

      const response = await api.get('/verfavoritos/');

      const favoritos = response.data

      set_lista_favoritos(favoritos)

      setloading(false)
    
    } catch(err) {

      seterror( 'Não foi possível carregar os favoritos' );

      //setloading(false)

    }

  };


  useEffect( () => {
 
    DefineListaFavoritos()
    
    
  })




  return(
    
    <View style={[styles.container, {backgroundColor: colorsList.primaria}]}>

      { /*<Spinner visible={loading}/>*/}

      {loading ? <View style={{zIndex: 5, flex: 1, marginTop: screenHeight*0.11, height: screenHeight*0.6, width: screenWidth, justifyContent: 'center', alignItems: 'center', position: 'absolute'}}>
              <Image source={require('../assets/LogoAudicao.gif')} style={styles.imagefluxo} resizeMode='cover'/>
      </View> : null}

      { !!errorMessage && <Error errorMessage={errorMessage}/> }

      <View style={[styles.titleContainer, {backgroundColor: colorsList.primaria}]}>

          <Text style={[styles.title, {color: colorsList.terciaria}]}>Palestras Favoritas</Text>

          <View style={{height: screenHeight*0.056, alignItems: 'center', width: screenWidth*0.15, justifyContent: 'center' }}>

            {/*<Image source={require('../assets/LogoExtraordinario.gif')} style={styles.animacao_vermelha} resizeMode='cover'/>*/}

            <LottieView 
              source={require('../assets/coracao_verde')} 
              autoPlay 
              loop 
              style={{height: screenHeight*0.0719}}
            />

          </View>

      </View>

      <View style={styles.bodyContainer}>

        <FlatList 

        data = {lista_favoritos}

        renderItem = { ({item}) =>  < Palestra favorite = {true} data = {item} length={lista_favoritos.length} index = {lista_favoritos.indexOf(item)} lastindex = {lista_favoritos.length - 1} navigation = {navigation}  /> }

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

  container: {
    flex: 1,
    borderRadius: screenWidth*0.015,
  
    
  },

  titleContainer: {
    height: screenHeight*0.1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'

  


  },
  title:{
    fontFamily: fonts.bold,
    fontSize: screenWidth*0.075,
    marginLeft: screenWidth*0.04,
    alignItems: 'center'
  },

  bodyContainer:{
    marginTop: screenHeight*0.018,
    //borderTopWidth: screenHeight*0.003, 
    borderRadius: screenHeight*0.015,
  },

  imagefluxo: {
    width: screenWidth * 0.29, 
    height: screenHeight * 0.15,
  },

  animacao_vermelha: {
    width: screenWidth * 0.09375, 
    height: screenHeight * 0.05,
  }


}
)



