/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  TextInput,
  Button,
  Alert,
  Dimensions
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage'


const screenHeight= Math.round(Dimensions.get("window").height) 
const screenWidth= Math.round(Dimensions.get("window").width) 

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';


export default function Login () {

  const [eemail, setEmail] = useState('');
  const [passwordd, setPassword] = useState('');


  function _handleLoginMethod () {
    const uri= `https://appsfe.herokuapp.com/login/`;
    const request=  {
      method: "POST",
      headers: new Headers ({
        "content-type": "application/json"
      }),
      body: JSON.stringify ({
        email: "joaopvolpi@gmail.com" ,
        password: "abelha"
      })
    }
    fetch (uri,request)
    .then(response => {
      return response.text()
    })
    .then(serverResponse => {
      let arr = JSON.parse(serverResponse)
      AsyncStorage.setItem("USER_TOKEN", arr["token"])

    })
    .catch(error => (console.log(error)))  
}
  
  return (
  
  <View style={styles.container}>
    <View style={styles.sectionContainer}>
              
      <View style={styles.imageView}>
        <Image style={styles.image} source={require("./components/images/logo_fluxo_escuro.png")} />
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

              <View style={styles.orangeBorder} >
              <View style={styles.loginBox} >
                <TextInput
                style={styles.textLogin}
                placeholder='Senha'
                placeholderTextColor='white'
                textContentType='password'
                secureTextEntry= {true}
                onChange= {(value) => setPassword(value)}
                />
              </View>
              </View>
              <Text style = {styles.textSenha} >Esqueci minha senha</Text>


              <Button
                  style= {styles.button}
                  title="Fazer Login"
                  color="#F4893B"
                  onPress={() => _handleLoginMethod()} />


            </View>
          </View>
  );
};

const styles = StyleSheet.create({
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
    height: screenHeight * 0.4,
    },
  loginBox: {
    backgroundColor: "black",
    borderRadius: 15,
  },
  orangeBorder: {
    backgroundColor: "#F4893B",
    borderRadius: 15,
    padding: 1,
    marginBottom: screenHeight * 0.05,
  },
  textIntro: {
    color: "white",
    textShadowColor: "white",
    fontSize: 25,
    alignSelf: "center",
    marginBottom: screenHeight * 0.05,
    marginTop: screenHeight * 0.05,
    },
    textSenha: {
      color: "#F4893B",
      fontSize: 15,
      textDecorationLine:"underline",
      textAlign: "right",
      marginTop: 5,
    },
    button: {
      fontSize: 25,
      padding: 10
    },
    textLogin: {
      color: "white"
    },

});


