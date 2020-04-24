import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  Linking,
  TextInput,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native';

import AppIntroSlider from 'react-native-app-intro-slider';
import LottieView from 'lottie-react-native';
import { screenWidth, screenHeight } from '../Dimensoes/Dimensoes';

import colors from "../styles/colors";
import fonts from '../styles/fonts';

import React, { useState, useEffect, useRef } from "react";

import api from '../services/api'
import AsyncStorage from '@react-native-community/async-storage';
import { SafeAreaView } from 'react-navigation';


//Redux
import { useSelector } from 'react-redux';
//Redux



export default function Login({navigation}){

const [ show_Main_App, set_show ] = useState(false);

const [userEmail, setEmail] = useState('');
const [userPassword, setPassword] = useState('');
const [error,setError] = useState('');

const [ login_feito, set_login_feito ] = useState(false);

const inputSenha = useRef(null);

const [showPresentation, setShowPresentation] = useState(null);
const [showPresentationLoaded, setShowPresentationLoaded] = useState(false);

//Redux
//permite que usarmos os estados que está armazenado na store
const colorsList = useSelector(state => state.data);
//Redux


async function verifyIfShowPresentation(){

  alreadyLoged = await AsyncStorage.getItem('@AppSFE:alreadyLoged');

  console.log(alreadyLoged)
  if (alreadyLoged) {
    setShowPresentation(false);
    setShowPresentationLoaded(true);
  }

  else{
    setShowPresentation(true);
    setShowPresentationLoaded(true);
  }

  console.log(showPresentation)
}


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
    console.log(token)
    await AsyncStorage.setItem('@storage_Key', token)
    await AsyncStorage.setItem('@AppSFE:password', userPassword)
    
    
    set_login_feito(true)
    await AsyncStorage.setItem('@AppSFE:alreadyLoged', 'ja_logado')
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

function navegar_para_o_App(){

  (login_feito) ? navigation.navigate('SignedIn') : null

}

useEffect( () =>
  (
  verifyIfShowPresentation(),
  navegar_para_o_App()), [login_feito, showPresentation]
)

if (!showPresentationLoaded) {
  return null
}

if(!showPresentation) {

  return(
      <KeyboardAvoidingView 
        behavior={Platform.select({
        ios: 'padding',
        android: null,})} 
        style={{flex: 1}} >
      <TouchableWithoutFeedback onPress = {Keyboard.dismiss}>
      <View style={[styles.container, {backgroundColor: colorsList.primaria}]}>
        {/*<View style={styles.imageView}>
          <LottieView style={styles.imagefluxo} autoPlay loop source={require("../assets/logotipoLottieMelhor")} />
        </View>*/}
      <View style={styles.imageView}>

        <Image source={require('../assets/LogoFrases.gif')} style={styles.imagefluxo} />

      </View>
          <View style={{...Platform.select({ios: {}, android: {height: screenWidth*0.099, marginBottom: screenWidth*0.02}})}}>
            <Text style={[styles.textIntro, {color: colorsList.terciaria}]} >Semana Fluxo de Engenharia</Text>
          </View>
          {/*<View style={styles.orangeBorder}>*/}
          <View style={[styles.loginBox, {borderBottomColor: colorsList.secundaria, backgroundColor: colorsList.quaternaria}, {...Platform.select({ios: {marginTop: screenHeight*0.025}, android:{marginTop: screenHeight*0.06} })}]}>
            <TextInput
            style={[styles.textLogin, {color: colorsList.dark_terciaria}]}
            keyboardType='email-address'
            autoCorrect={false}
            autoCapitalize='none'
            placeholder='Email'
            returnKeyType='next'
            placeholderTextColor= {colorsList.terciaria}
            onSubmitEditing={() => inputSenha.current.focus()}
            onChangeText= {(value) => setEmail(value) }
            />
          </View>
        {/* </View>          */}
          
          {/*<View style={styles.orangeBorder}>*/}
          <View style={[styles.loginBox, {borderBottomColor: colorsList.secundaria, backgroundColor: colorsList.quaternaria}]}>
            <TextInput
            style={[styles.textLogin, {color: colorsList.dark_terciaria}]}
            placeholder='Senha'
            autoCorrect={false}
            autoCapitalize='none'
            placeholderTextColor= {colorsList.terciaria} 
            keyboardType='default'
            returnKeyType='done'
            secureTextEntry= {true}
            ref={inputSenha}
            onChangeText= {(value) => setPassword(value) }
            />
          </View>
          {/*</View>*/}
          <View>
        <Text style={{color: 'red', fontSize: screenWidth*0.05, alignSelf:"center", marginTop: screenHeight*0.02}} >{error}</Text>
        </View>

          <TouchableOpacity onPress={() => (fazendo_login()) } style = {[styles.button, {backgroundColor: colorsList.secundaria}]}>
            <Text style={[styles.textButton, {color: colorsList.primaria}]}>LOGIN</Text>
          </TouchableOpacity>


      </View>
      </TouchableWithoutFeedback>
      </KeyboardAvoidingView>

    );
}

else{
  
  if (show_Main_App) {

    return(
      <KeyboardAvoidingView 
        behavior={Platform.select({
        ios: 'padding',
        android: null,})} 
        style={{flex: 1}} >
      <TouchableWithoutFeedback onPress = {Keyboard.dismiss}>
      <View style={[styles.container, {backgroundColor: colorsList.primaria}]}>
        {/*<View style={styles.imageView}>
          <LottieView style={styles.imagefluxo} autoPlay loop source={require("../assets/logotipoLottieMelhor")} />
        </View>*/}
      <View style={styles.imageView}>

        <Image source={require('../assets/LogoFrases.gif')} style={styles.imagefluxo} />

      </View>
          <View style={{...Platform.select({ios: {}, android: {height: screenWidth*0.099, marginBottom: screenWidth*0.02}})}}>
            <Text style={[styles.textIntro, {color: colorsList.terciaria}]} >Semana Fluxo de Engenharia</Text>
          </View>
          {/*<View style={styles.orangeBorder}>*/}
          <View style={[styles.loginBox, {borderBottomColor: colorsList.secundaria, backgroundColor: colorsList.quaternaria}, {...Platform.select({ios: {marginTop: screenHeight*0.025}, android:{marginTop: screenHeight*0.06} })}]}>
            <TextInput
            style={[styles.textLogin, {color: colorsList.dark_terciaria}]}
            keyboardType='email-address'
            autoCorrect={false}
            autoCapitalize='none'
            placeholder='Email'
            returnKeyType='next'
            placeholderTextColor= {colorsList.terciaria}
            onSubmitEditing={() => inputSenha.current.focus()}
            onChangeText= {(value) => setEmail(value) }
            />
          </View>
        {/* </View>          */}
          
          {/*<View style={styles.orangeBorder}>*/}
          <View style={[styles.loginBox, {borderBottomColor: colorsList.secundaria, backgroundColor: colorsList.quaternaria}]}>
            <TextInput
            style={[styles.textLogin, {color: colorsList.dark_terciaria}]}
            placeholder='Senha'
            autoCorrect={false}
            autoCapitalize='none'
            placeholderTextColor= {colorsList.terciaria} 
            keyboardType='default'
            returnKeyType='done'
            secureTextEntry= {true}
            ref={inputSenha}
            onChangeText= {(value) => setPassword(value) }
            />
          </View>
          {/*</View>*/}
          <View>
        <Text style={{color: 'red', fontSize: screenWidth*0.05, alignSelf:"center", marginTop: screenHeight*0.02}} >{error}</Text>
        </View>

          <TouchableOpacity onPress={() => (fazendo_login()) } style = {[styles.button, {backgroundColor: colorsList.secundaria}]}>
            <Text style={[styles.textButton, {color: colorsList.primaria}]}>LOGIN</Text>
          </TouchableOpacity>


      </View>
      </TouchableWithoutFeedback>
      </KeyboardAvoidingView>

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
    justifyContent:'center',
    paddingHorizontal: screenWidth * 0.05,
    //marginTop: screenHeight * 0.05
  },

  imageView: {
    alignItems: "center",
    marginTop: screenWidth*0.03
  },
  imagefluxo: {
    width: screenWidth * 0.65, 
    height: screenHeight * 0.3,
    },
  loginBox: {...Platform.select({
    android:{
      marginTop:screenHeight*0.04,
      borderBottomWidth: screenWidth*0.005,
      borderRadius: screenWidth*0.01,
    },
    ios: {
      height: screenHeight*0.055,
      justifyContent: 'center',
      marginTop:screenHeight*0.04,
      borderBottomWidth: screenWidth*0.005,
      borderRadius: screenWidth*0.01,
    }
  })
  },
  textIntro: {
    //textShadowColor: "#F4893B",
    fontSize: screenWidth*0.055,
    fontWeight:'bold',
    alignSelf: "center",
    marginTop: screenHeight * 0.05,
    },
    textButton: {
      fontSize: screenWidth*0.05,
      textAlign:'center',
    },
    textLogin: {
    },
    button:{
      justifyContent: 'center',
      alignSelf:'center',
      marginTop: screenHeight *0.05,
      height:screenHeight * 0.06,
      width:screenWidth*0.4,
      borderRadius: screenWidth*0.0385


    },
    
})



const slides = [
  {
    key: 'k1',
    title: 'Nesse App ',
    text: ' Olá, seja bem vindo a Semana da Fluxo! Esse App será como um grande guia pra você durante a semana que vai rolar do dia 23 até o dia 27! Aqui, você poderá conferir toda a programação, entender mais sobre cada palestra, confirmar sua presença e muito mais!',
    image: require('../assets/smart-phone.png'),
    titleStyle: styles.title,
    textStyle: styles.text,
    imageStyle: styles.image,
    backgroundColor: '#F7BB64',
  },
  {
    key: 'k2',
    title: 'Conferir a Programação ',
    text: ' Essa é a Tela Inicial do nosso App! Nela, estão organizadas todas as palestras de acordo com os dias da semana... E ainda tem mais! Aperte em qualquer uma delas e abrirá uma nova tela pra você conferir mais detalhes sobre cada uma delas',
    image: require('../assets/popcorn.png'),
    titleStyle: styles.title,
    textStyle: styles.text,
    imageStyle: styles.image,
    backgroundColor: '#F4B1BA',
  },
  {
    key: 'k3',
    title: 'Favoritos ',
    text: ' É claro que nesse App você também poderá adicionar palestras aos seus favoritos! Simplesmente clicando no coração quando estiver acessando mais informações de uma das palestras...',
    image: require('../assets/heart.png'),
    titleStyle: styles.title,
    textStyle: styles.text,
    imageStyle: styles.image,
    backgroundColor: '#4093D2',
  },
  {
    key: 'k4',
    title: 'Confirmar presença ',
    text: ' Esse App também vai ter QR Code? Claro! Serve para você confirmar sua presença na palestra lendo um código que será exibido durante a palestra! E pra quem é estudante, isso é maravilhoso porque garante nossas horas complementares...',
    image: require('../assets/qr-code.png'),
    titleStyle: styles.title,
    textStyle: styles.text,
    imageStyle: styles.image,
    backgroundColor: '#644EE2',
  },
  {
    key: 'k5',
    title: 'Considerações ',
    text: ' Esse App também vai ter um espaço para os nossos parceiros que tornaram tudo isso possível! Além das nossas redes sociais para que vocês possam nos encontrar! Isso é tudo pessoal, curtam muito essa semana e tentem aproveitar tudo!!',
    image: require('../assets/document.png'),
    titleStyle: styles.title,
    textStyle: styles.text,
    imageStyle: styles.image,
    backgroundColor: '#FF1744',
  },

];
