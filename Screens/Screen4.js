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
  Linking,
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

import Hyperlink from 'react-native-hyperlink';

import Icon from 'react-native-vector-icons/FontAwesome';


const DATA = [
  {
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Globo.com_logo.svg/1280px-Globo.com_logo.svg.png'
  },
  {
    logo: 'https://www.whatsrel.com.br/wp-content/uploads/2018/09/vagas-grupo-soma-moda.png'
  },
  {
    logo: 'https://upload.wikimedia.org/wikipedia/commons/3/37/Logo_Ambev.png'
  },
];







export default function TelaCreditos({navigation}){
  return(
    <View>

      <View style={styles.header} >

        <View style={{width: 30}}>

          <Icon name="bars" size={25} color="white" onPress={() => navigation.openDrawer()}/>

        </View>


        <View style={{marginLeft: screenWidth*0.08}}>
          
          <Text style={styles.textoHeader}>SEMANA FLUXO</Text>

        </View>

        <Image style={styles.logofluxo}
          source = {require('../Assets/FluxoSemFundo.png') } />



      </View>

      <ScrollView style={styles.container}>

        <View>

          <Text style={styles.title}>Nossos Colaboradores</Text>

          <View style={styles.patrocinadoresContainer}>  

            <FlatList

            

            data = {DATA}

            renderItem = { ({item}) =>  <View style={{marginTop: 20}}>< Image source={{ uri: item.logo}} style={{height: 80, width: screenWidth, marginRight: 20}} /></View> }

            keyExtractor = { (item, index ) => index }

            />

          </View>

        </View>

        <View style={styles.faleConosco}>

          <Text style={styles.title}>Fale Conosco</Text>

          <Text style={styles.subtitle}>Acompanhe nosso trabalho nas redes sociais ou entre em contato diretamente pelo site!</Text>

        </View>

        <View style={styles.iconesContainer}>

          <TouchableOpacity onPress={ ()=> Linking.openURL('https://www.instagram.com/fluxoconsultoria/')} style={styles.iconeContainer}>

              <Image 
              source = {{uri: 'https://fluxoconsultoria.poli.ufrj.br/wp-content/uploads/2019/07/instagram.png'}} 
              style = {styles.icone}/>

              <Text style={styles.subtitle}>Instagram</Text>

          </TouchableOpacity>


          <TouchableOpacity onPress={ ()=> Linking.openURL('https://www.facebook.com/fluxoconsultoria') } style={styles.iconeContainer}>

            <Image 
            source = {{uri: 'https://fluxoconsultoria.poli.ufrj.br/wp-content/uploads/2019/07/facebook-logo.png'}} 
            style = {styles.icone}/>

            <Text style={styles.subtitle}>Facebook</Text>

          </TouchableOpacity>


          <TouchableOpacity onPress={ ()=> Linking.openURL('https://fluxoconsultoria.poli.ufrj.br/contato') } style={styles.iconeContainer}>

            <Image 
            source = {{uri: 'https://fluxoconsultoria.poli.ufrj.br/wp-content/uploads/2019/01/speech-bubble.png'}} 
            style = {styles.icone}/>

            <Text style={styles.subtitle}>Nosso site</Text>

          </TouchableOpacity>

        
        </View>



      </ScrollView>

    </View>
  
    

  );
}

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
    padding: screenWidth*0.02
  }, 

  title: {
    color: '#F4893B',
    fontSize: screenHeight*0.04,
    fontFamily: 'Gelasio-Bold',
    alignSelf: 'center'
  },

  patrocinadoresContainer:{
    marginTop: screenHeight*0.02,
    alignItems: 'center'
  },

  faleConosco:{
    padding: screenWidth*0.05
  },

  subtitle: {
    color: '#F4893B',
    fontSize: screenHeight*0.02,
    fontFamily: 'Gelasio-Bold',
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
    height: screenHeight*0.0864
  }


}
)
