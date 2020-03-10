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






export default function Login(){

  const [ show_Main_App, set_show ] = useState(false);

  const [userEmail, setEmail] = useState('');
  const [userPassword, setPassword] = useState('');
  const [error,setError] = useState('');


  on_Done_all_slides = () => {
    set_show(true);
  };
  
  on_Skip_slides = () => {
    set_show(true);
  };

  async function fazendo_login(){

      try{
      const response = await api.post('/login/',
      {
        "email": userEmail,
        "password": userPassword,
      },
      )
      const { token } = response.data;
      await AsyncStorage.setItem('@storage_Key', token)
    }

      catch(e){
        setError(e.data.error)

      }

      /*SEMPRE QUE MEXERMOS COM O ASCYNCSTORAGE TEMOS QUE USAR AWAIT*/

      //console.log(await AsyncStorage.getItem('@storage_Key'))

};
//CONFERIR STATUS BAR

//<StatusBar backgroundColor={colors.tertiary} />
//<StatusBar hidden={true} />
    
  if (show_Main_App) {

    return(

      <View style={styles.container}>
      <View style={styles.sectionContainer}>
          
        <View style={styles.imageView}>
          <Image style={styles.image} source={require("../Assets/logo_fluxo_escuro.png")} />
        </View>

          <View >
            <Text style={styles.textIntro} >Semana Fluxo de Engenharia</Text>
          </View>

          <View style={styles.orangeBorder}>
          <View style={styles.loginBox} >
            <TextInput
            style={styles.textLogin}
            placeholder='Email'
            placeholderTextColor= 'white' 
            textContentType= 'emailAddress'
            onChangeText= {(value) => setEmail(value) }
            />
          </View>
          </View>          
          
          
          <View style={styles.orangeBorder}>
          <View style={styles.loginBox} >
            <TextInput
            style={styles.textLogin}
            placeholder='Senha'
            placeholderTextColor= 'white' 
            textContentType= 'password'
            secureTextEntry= {true}
            onChangeText= {(value) => setPassword(value) }
            />
          </View>
          </View>

         <Text style={{color: 'red', fontSize: 20, alignSelf:"center", marginTop: screenHeight*0.02}} >{error}</Text>

          <TouchableOpacity onPress={() => (fazendo_login()) } style = {styles.button}>
            <Text style={styles.textButton}>FAZER LOGIN</Text>
          </TouchableOpacity>


        </View>
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

    container: {
      flex: 1,
      backgroundColor: "black",
      paddingHorizontal: screenWidth * 0.05,
      paddingVertical: screenHeight * 0.1
    },
    sectionContainer: {
    },
    imageView: {
      alignItems: "center",
    },
    image: {
      width: screenWidth * 0.65, 
      height: screenHeight * 0.3,
      },
    loginBox: {
      backgroundColor: "black",
      borderRadius: 15,
    },
    orangeBorder: {
      backgroundColor: "#F4893B",
      borderRadius: 15,
      padding: 1,
      marginTop: screenHeight * 0.05,
    },
    textIntro: {
      color: "white",
      textShadowColor: "white",
      fontSize: 22,
      alignSelf: "center",
      marginTop: screenHeight * 0.05,
      },
      textSenha: {
        color: "#F4893B",
        fontSize: 15,
        textDecorationLine:"underline",
        textAlign: "right",
        marginBottom: 5,
      },
      textButton: {
        flex: 1,
        fontSize: 20,
        color: "white",
        textAlign:'center',
        textAlignVertical:'center'
        
      },
      textLogin: {
        color: "white",
      },
      button:{
        backgroundColor: "#F4893B",
        marginTop: screenHeight *0.08,
        height:screenHeight * 0.06,
        borderRadius:10


      }
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
  
  
  
