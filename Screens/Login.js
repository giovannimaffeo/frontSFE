import {
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Image,
    Linking,
    TextInput,
    TouchableOpacity
  } from 'react-native';

import AppIntroSlider from 'react-native-app-intro-slider';

import { screenWidth, screenHeight } from '../Dimensoes/Dimensoes';

import colors from "../styles/colors";
import fonts from '../styles/fonts';

import React, { useState, useEffect } from "react";

import api from '../services/api'
import AsyncStorage from '@react-native-community/async-storage';
import { SafeAreaView } from 'react-navigation';







export default function Login(){

  const [ show_Main_App, set_show ] = useState(false);

  on_Done_all_slides = () => {
    set_show(true);
  };
  
  on_Skip_slides = () => {
    set_show(true);
  };

  async function fazendo_login(){


    
      const response = await api.post('/login/',
      {
        "email": "joaopvolpi@gmail.com",
        "password": "abelha",
      },
      
      )


      const { token } = response.data;

      await AsyncStorage.setItem('@storage_Key', token)

      /*SEMPRE QUE MEXERMOS COM O ASCYNCSTORAGE TEMOS QUE USAR AWAIT*/

      //console.log(await AsyncStorage.getItem('@storage_Key'))

};
//CONFERIR STATUS BAR

//<StatusBar backgroundColor={colors.tertiary} />
//<StatusBar hidden={true} />
    
  if (show_Main_App) {

    return(
        
      <View>
          <Text>Login</Text>

          <TouchableOpacity onPress={() => (fazendo_login())}>
            <Text>Faca Login</Text>
          </TouchableOpacity>
      </View>

      
      
    );
  }

  else {  

    return ( 

      <>

        <StatusBar hidden={true} /> 

        <AppIntroSlider slides={slides} 
        onDone={on_Done_all_slides} 
        showSkipButton={true} 
        onSkip={on_Skip_slides}/>

      </>


    ); 
  } 
}


const styles = StyleSheet.create({

    MainContainer: { 
     flex: 1, 
     paddingTop: screenHeight*0.02875, 
     alignItems: 'center', 
     justifyContent: 'center', 
     padding: screenHeight*0.02875,
    }, 
    title: { 
     fontSize: screenHeight*0.03737, 
     color: '#FFFFFF', 
     fontWeight: 'bold', 
     textAlign: 'center', 
     marginTop: screenHeight*0.02875, 
    }, 
    text: { 
     color: '#FFFFFF', 
     fontSize: screenHeight*0.02875, 
    }, 
    image: { 
     width: screenHeight*0.2875, 
     height: screenHeight*0.2875, 
     resizeMode: 'contain' 
    },
    texto: {
      color: colors.tertiary,
      fontSize: screenHeight*0.02616,
      fontWeight: 'bold',
      height: screenHeight*0.035,
    },
})



const slides = [
    {
      key: 'k1',
      title: 'Nesse App ',
      text: ' Olá, seja bem vindo a Semana da Fluxo! Esse App será como um grande guia pra você durante a semana que vai rolar do dia 23 até o dia 27! Aqui, você poderá conferir toda a programação, entender mais sobre cada palestra, confirmar sua presença e muito mais!',
      image: require('../Assets/smart-phone.png'),
      titleStyle: styles.title,
      textStyle: styles.text,
      imageStyle: styles.image,
      backgroundColor: '#F7BB64',
    },
    {
      key: 'k2',
      title: 'Conferir a Programação ',
      text: ' Essa é a Tela Inicial do nosso App! Nela, estão organizadas todas as palestras de acordo com os dias da semana... E ainda tem mais! Aperte em qualquer uma delas e abrirá uma nova tela pra você conferir mais detalhes sobre cada uma delas',
      image: require('../Assets/popcorn.png'),
      titleStyle: styles.title,
      textStyle: styles.text,
      imageStyle: styles.image,
      backgroundColor: '#F4B1BA',
    },
    {
      key: 'k3',
      title: 'Favoritos ',
      text: ' É claro que nesse App você também poderá adicionar palestras aos seus favoritos! Simplesmente clicando no coração quando estiver acessando mais informações de uma das palestras...',
      image: require('../Assets/heart.png'),
      titleStyle: styles.title,
      textStyle: styles.text,
      imageStyle: styles.image,
      backgroundColor: '#4093D2',
    },
    {
      key: 'k4',
      title: 'Confirmar presença ',
      text: ' Esse App também vai ter QR Code? Claro! Serve para você confirmar sua presença na palestra lendo um código que será exibido durante a palestra! E pra quem é estudante, isso é maravilhoso porque garante nossas horas complementares...',
      image: require('../Assets/qr-code.png'),
      titleStyle: styles.title,
      textStyle: styles.text,
      imageStyle: styles.image,
      backgroundColor: '#644EE2',
    },
    {
      key: 'k5',
      title: 'Considerações ',
      text: ' Esse App também vai ter um espaço para os nossos parceiros que tornaram tudo isso possível! Além das nossas redes sociais para que vocês possam nos encontrar! Isso é tudo pessoal, curtam muito essa semana e tentem aproveitar tudo!!',
      image: require('../Assets/document.png'),
      titleStyle: styles.title,
      textStyle: styles.text,
      imageStyle: styles.image,
      backgroundColor: '#FF1744',
    },
  
  ];
  
  
  
