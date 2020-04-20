/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Linking,
  StatusBar,
  TouchableOpacity,
  AppRegistry,
  Image,
  FlatList,
  Dimensions,
} from 'react-native';

import {
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { createAppContainer, } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';


import Dimensoes, { screenWidth, screenHeight } from '../Dimensoes/Dimensoes';

import Hyperlink from 'react-native-hyperlink';


import fonts from '../styles/fonts';

import Header from './Header';
import Error from './Error';

import api from '../services/api'

import Spinner from 'react-native-loading-spinner-overlay';


import Icon from 'react-native-vector-icons/Ionicons';
Icon.loadFont();

import Icon2 from 'react-native-vector-icons/SimpleLineIcons'
Icon2.loadFont()

//Redux
import { useSelector } from 'react-redux';
//Redux


export default function TelaCreditos({navigation}){

  //Redux
  const colorsList = useSelector(state => state.data)
  //Redux

  const [patrocinadores, setPatrocinadores] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState(true)
  const [Colors, setColors] = useState([])

  
  async function loadColors(){
    try{
        const response = await api.get('/cores/');
        console.log(response.data)
        setColors(response.data)
    } catch{
        console.log('Não foi possível carregar as cores')
    }
  };

  async function carrega_patrocinadores(){

    try{

      const response = await api.get('/parceiros/');

      lista_patrocinadores = response.data

      setPatrocinadores(response.data)
      setLoading(false)
    
    } catch{

      setErrorMessage('Não foi possível carregar essa página')
      //setLoading(false)

    }

  }

  useEffect(() => {

    carrega_patrocinadores()
    loadColors()

  }, []);

  //<View style={{marginTop: screenWidth*0.05}}>< Image source={{ uri: item.logo}} style={{height: screenHeight*0.115, width: screenWidth*0.375, marginRight: screenWidth*0.05}} /></View>

  return(

    <ScrollView style={{backgroundColor: colorsList.primaria}}>

      <Header navigation = {navigation} />

      { !!errorMessage && <Error errorMessage={errorMessage}/> }
      
      <View style={[styles.container, {backgroundColor: colorsList.primaria}]}>

        {/*<Spinner visible={loading}/> */}

        <View>

          <Text style={[styles.title, {color: colorsList.terciaria}]}>Nossos Colaboradores</Text>

          <View style={styles.patrocinadoresContainer}> 

            {loading ? <View style={{width: screenWidth*0.5, height: screenWidth*0.18, justifyContent: 'center', alignItems: 'center'}}>
              <Image source={require('../assets/LogoForca.gif')} style={styles.imagefluxo} resizeMode='cover'/>
            </View> : null} 

            <FlatList

            horizontal={true}

            showsHorizontalScrollIndicator={false}

            data = {patrocinadores}

            renderItem = { ({item}) => <View style={{marginTop: screenWidth*0.05}}>< Image source={{ uri: `http://67.205.161.203:8000${item.logo}`}} style={{height: screenHeight*0.115, width: screenWidth*0.375, marginRight: screenWidth*0.05}} /></View> }

            keyExtractor={ (item) => item.id.toString() }
            />

          </View>

        </View>

        <View style={styles.faleConosco}>

          <Text style={[styles.title, {color: colorsList.terciaria}]}>Fale Conosco</Text>

          <Text style={[styles.subtitle, {color: colorsList.secundaria}]}>Clique para acompanhar nosso trabalho nas redes sociais ou entre em contato diretamente pelo site!</Text>

        </View>

        <View style={styles.iconesContainer}>

          <TouchableOpacity onPress={ ()=> Linking.openURL('https://www.instagram.com/fluxoconsultoria/')} style={styles.iconeContainer}>

              <Icon name="logo-instagram" color={colorsList.terciaria} size={screenWidth*0.18} />

              <Text style={[styles.texto_icone, {color: colorsList.terciaria}]}>Instagram</Text>

          </TouchableOpacity>


          <TouchableOpacity onPress={ ()=> Linking.openURL('https://www.facebook.com/fluxoconsultoria') } style={styles.iconeContainer}>

            <Icon name="logo-facebook" color={colorsList.terciaria} size={screenWidth*0.18} />

            <Text style={[styles.texto_icone, {color: colorsList.terciaria}]}>Facebook</Text>

          </TouchableOpacity>


          <TouchableOpacity onPress={ ()=> Linking.openURL('https://fluxoconsultoria.poli.ufrj.br/contato') } style={styles.iconeContainer}>

            <Icon2 name="bubbles" color={colorsList.terciaria} size={screenWidth*0.18} />

            <Text style={[styles.texto_icone, {color: colorsList.terciaria}]}>Nosso site</Text>

          </TouchableOpacity>

        
        </View>



      </View>

  </ScrollView>
  
    

  );
}

const styles = StyleSheet.create({

  container: {
    padding: screenWidth*0.02,
  }, 

  title: {
    fontSize: screenHeight*0.04,
    fontFamily: fonts.bold,
    alignSelf: 'center'
  },

  patrocinadoresContainer:{
    marginTop: screenHeight*0.02,
    flex:1,
    maxWidth: Dimensions.get('window').width , // Width / 3 - (marginLeft and marginRight for the components)
    justifyContent: 'center',
    alignItems:'center',    
    margin: screenWidth*0.0125
  },

  faleConosco:{
    padding: screenWidth*0.05
  },

  subtitle: {
    fontSize: screenHeight*0.02,
    fontFamily: fonts.bold,
    alignSelf: 'center',
    textAlign: 'center'

  },

  iconesContainer:{
    padding: screenHeight*0.02,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'

  },

  iconeContainer:{
    alignItems: 'center'



  },

  icone:{
    width: screenHeight*0.0864,
    height: screenHeight*0.0864,
  },

  texto_icone:{
    fontSize: screenHeight*0.02,
    fontFamily: fonts.bold,
    alignSelf: 'center',
    textAlign: 'center'

  },

  imagefluxo: {
    width: screenWidth * 0.18, 
    height: screenHeight * 0.1,
    },


}
)
