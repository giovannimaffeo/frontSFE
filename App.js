/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useState, useEffect } from "react";

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

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import ImagePicker from 'react-native-image-picker';

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';


//import 'react-native-gesture-handler'

//import Dimensoes, { screenWidth, screenHeight } from './Dimensoes/Dimensoes';

import Dia1 from './Screens/Dia1'
import Dia2 from './Screens/Dia2'
import Dia3 from './Screens/Dia3'
import Dia4 from './Screens/Dia4'
import Dia5 from './Screens/Dia5' 

import Programacao from './Screens/Programacao'


import Screen2 from './Screens/Screen2'
import Screen3 from './Screens/Screen3'
import Screen4 from './Screens/Screen4'

import Informacoes from './Screens/Informacoes'
import { screenWidth, screenHeight } from './Dimensoes/Dimensoes';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import TelaFavorito from './Screens/TelaFavorito';

import AppIntroSlider from 'react-native-app-intro-slider';
import { hidden } from "ansi-colors";

import colors from "./styles/colors";
import fonts from './styles/fonts';
import { set } from "react-native-reanimated";
import { RawButton } from "react-native-gesture-handler";

//foto neymar: https://pbs.twimg.com/profile_images/1195070652346241024/TY83Cwxb_400x400.jpg

import AsyncStorage from '@react-native-community/async-storage';

import Login from './Screens/Login'

const DATA = 

    [

    {
      nome_usuario: "Neymar Júnior",
      foto_usuario: "https://www.bu.edu/disability/files/2019/02/no_profile_photo.jpg"

    }

];





/*const Stack = createStackNavigator (
  {
    Dia1: {
      screen: Dia1
    },
    Dia2: {
      screen: Dia2
    },
    Dia3: {
      screen: Dia3
    },
    Dia4: {
      screen: Dia4
    },
    Dia5: {
      screen: Dia5
    },
    Informacoes: {
      screen: Informacoes
    },
  },
  {
    initialRouteName: 'Dia1'
  },

);*/

const Stack = createStackNavigator (
  {
    Programacao: {
      screen: Programacao
    },
    Informacoes: {
      screen: Informacoes
    }
  },
  {
    initialRouteName: 'Programacao'
  },

);

const AppContainer = createAppContainer(Stack);



const StackFavorito = createStackNavigator (
  {
    TelaFavorito: {
      screen: TelaFavorito
    },
    Informacoes: {
      screen: Informacoes
    }

  },
  {
    initialRouteName: 'TelaFavorito'
  }
);

const AppContainerFavorito = createAppContainer(StackFavorito);



const CustomDrawer = (props) => {

  const [ contador, set_contador ] = useState(20)

  const [ esta_mudando, set_esta_mudando ] = useState(false)

  const [ username, set_username ] = useState(null)

  const [ imageSource, setImageSource ] = useState("https://www.bu.edu/disability/files/2019/02/no_profile_photo.jpg");

    pickImageHandler = () => {
    ImagePicker.showImagePicker({title: "Escolha uma Foto", maxWidth: 800, maxHeight: 600}, res => {
      if (res.didCancel) {
        console.log("User cancelled!");
      } else if (res.error) {
        console.log("Error", res.error);
      } else {
        
        setImageSource( res.uri )
        DATA[0].foto_usuario = res.uri
        
        armazena_foto_perfil( res.uri )


      }
    });
  }

  const texto_inicial = <Text style={styles.texto_inicial}>Clique para colocar seu nome!</Text>
  const texto_username = <Text style={styles.texto_username}>{username}</Text>

  const texto_mudando =

    <View>

      <View style={{flexDirection:'row', alignItems: 'center', width: screenWidth*0.5, justifyContent: 'space-evenly'}}>

        <TextInput 
        placeholder="Coloque seu nome aqui"
        onChangeText={(text) => { text != null ? set_contador(20 - text.length) : set_contador(20) ; set_username(text); } }
        value={username}
        maxLength = {20}
        autoCorrect = {false}
        textContentType = "name"
        style={{fontSize: screenWidth*0.035, color: colors.primary, fontWeight: 'bold'}} 
        />

        <Text style={{color:  'rgba(0, 0, 0, 0.25)', fontSize: screenWidth*0.033}}>{contador}</Text>

      </View>

      <View style={{alignItems: 'flex-end'}}>  

        <TouchableOpacity onPress={() => { set_esta_mudando(false); armazena_username(username); armazena_contador(contador)}} style={{alignItems: 'flex-end', width: screenWidth*0.35, justifyContent: 'center', height: screenWidth*0.07}}>

          <Text style={{fontSize: screenWidth*0.033}}>Confirmar</Text>

        </TouchableOpacity>

      </View>

    </View>

  const texto_nao_mudando = 

    <TouchableOpacity style={styles.botao_username} onPress={() => set_esta_mudando(true)}>

      { username == null || username == '' ? texto_inicial : texto_username }

    </TouchableOpacity>

  

  async function armazena_username(username){

    await AsyncStorage.setItem('@AppSFE:username', username)

  }

  async function armazena_foto_perfil(foto_perfil){

    await AsyncStorage.setItem('@AppSFE:foto_perfil', foto_perfil)

  }

  async function armazena_contador(contador){

    await AsyncStorage.setItem('@AppSFE:contador', String(contador))

    

  }


  async function reset_dados(){

    var username_armazenado = await AsyncStorage.getItem('@AppSFE:username')

    var foto_perfil_armazenada = await AsyncStorage.getItem('@AppSFE:foto_perfil')

    var contador_armazenado = Number(await AsyncStorage.getItem('@AppSFE:contador'))


    set_username(username_armazenado)
    setImageSource(foto_perfil_armazenada)
    set_contador(contador_armazenado)

  }

   
  useEffect( () => {
 
    reset_dados()
    
  }, [])


  return (

    <View style={{flex: 1}}>

      <View style={{height: screenHeight*0.187, backgroundColor: '#DCDCDC', borderBottomWidth: screenHeight*0.01, borderBottomColor: colors.tertiary}}>

        <View style={{padding: screenWidth*0.0375, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>

          <TouchableOpacity onPress={pickImageHandler}>

            <Image 
            style={{height: screenHeight*0.13, width: screenHeight*0.13, borderRadius: screenWidth*0.1125}}  
            source={{ uri: imageSource }} />

          </TouchableOpacity>

          { esta_mudando ? texto_mudando : texto_nao_mudando }

        </View>

      </View>

      
      <View style={{backgroundColor: colors.primary, flex: 1}}>
      
      
        <DrawerItems {...props} style={{Colors: colors.secondary}} />

        <TouchableOpacity style = {styles.itemcontainer} onPress={() => Linking.openURL('https://pbs.twimg.com/profile_images/1195070652346241024/TY83Cwxb_400x400.jpg')}>

          <View style={{marginRight: screenWidth*0.1}}>

            <Icon name="note-outline" size={screenWidth*0.0625} color="#a6a6a6" style={styles.icone}/>


          </View>

          <View>
            
            <Text style = {styles.texto}>Inscrição Processo Seletivo</Text>

          </View>

        </TouchableOpacity>

        <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', marginLeft: screenWidth*0.57, marginTop: screenWidth*0.3, height: screenWidth*0.1}} onPress={() => (logout(), props.navigation.navigate('Login'))}  >

          <View >

            <Icon name="logout" size={screenWidth*0.0625} color="#a6a6a6" style={styles.icone}/>

          </View>

          <View style={{marginLeft: screenWidth*0.02}}>

            <Text style={{color: 'white', fontSize: screenWidth*0.05, fontFamily: fonts.bold}}>Sair</Text>


          </View>

        </TouchableOpacity>

      </View>


    </View>
  );
};





const Drawer = createDrawerNavigator(
  {
  AppContainer: {
    screen: AppContainer,
    navigationOptions: {
      drawerLabel: "Programação",
      drawerIcon: () => (
        <Icon name="popcorn" size={screenWidth*0.06} color={colors.secondary} />
      )

    },
  },
  AppContainerFavorito: {
    screen: AppContainerFavorito,
    navigationOptions: {
      drawerLabel: "Favoritos",
      drawerIcon: () => (
        <Icon name="heart" size={screenWidth*0.06} color={colors.secondary} />
      )

    },
  },

  Screen3: {
    screen: Screen3,
    navigationOptions: {
      drawerLabel: "Confirmar Presença",
      drawerIcon: () => (
        <Icon name="qrcode" size={screenWidth*0.06} color={colors.secondary} />

      )
    },
  },

  Screen4: {
    screen: Screen4,
    navigationOptions: {
      drawerLabel: "Créditos",
      drawerIcon: () => (
        <Icon name="help-circle-outline" size={screenWidth*0.06} color={colors.secondary} />

      )
    },
  },

  },
  {
    initialRouteName: 'AppContainer',
    contentComponent: CustomDrawer,
    drawerWidth: screenWidth*0.8,
    
    contentOptions: {
      labelStyle: {
        color: colors.tertiary,
        fontSize: screenWidth*0.045,
        padding: screenWidth*0.025,
        fontFamily: fonts.regular,
        textAlign: "justify"

      },
    }
    

    
    
  }

)

export const RouteNav = createAppContainer(Drawer)


  /*const isSignedIn = () => {

  logout()

  const token =  await AsyncStorage.getItem('@storage_Key');
  
  console.log("token", token)
  if (token !== null){
    return true;
  }
  else{
    return false; 
   }*/

   /*const isSignedIn = () => {

    return new Promise((resolve, reject) => {
      AsyncStorage.getItem('@storage_Key')
        .then(res => {
          if (res !== null) {
            resolve(true);
          } else {
            resolve(false);
          }
        })
        .catch(err => reject(err));
    });
  };
  
*/

/*function CreateRootNavigator({logado, createSwitchNavigator, RouteNav, Login}){

  return(

    createSwitchNavigator(
      {
        RouteNav: {
          screen: RouteNav
        },
        Login: {
          screen: Login
        }
      },
      {
        initialRouteName: logado ? "RouteNav" : "Login"
      }
    )
  )
}*/

  /*const CreateRootNavigator = createSwitchNavigator(
      {
        RouteNav: {
          screen: RouteNav
        },
        Login: {
          screen: Login
        }
      },
      {
        initialRouteName: isSignedIn ? "RouteNav" : "Login"
      }
    )
*/


/*async function logout(){

  await AsyncStorage.removeItem('@storage_Key')
  console.log('está deslogado')
}*/

/*export const SignedOutRoutes = createSwitchNavigator({
  Login: {
    screen: Login,
  },
});

export const SignedInRoutes = createSwitchNavigator({
  RouteNav: {
    screen: RouteNav,
  },
});*/

export const createRootNavigator = (signedIn = null) => {
  return createSwitchNavigator({
    SignedIn: { screen: RouteNav },
    SignedOut: { screen: Login }
  },
  {
    initialRouteName: signedIn ? "SignedIn" : "SignedOut",
    /*headerMode: "none",
    mode: "modal",
    navigationOptions: {
      gesturesEnabled: false
    }*/
  });
};

async function logout(){

  await AsyncStorage.removeItem('@storage_Key')


  console.log('está deslogado')
}




export default function App(){

  /*const [ logado, setlogado ] = useState(null)

  const isSignedIn = () => {

    return new Promise((resolve, reject) => {
      AsyncStorage.getItem('@storage_Key')
        .then(res => {
          if (res !== null) {
            resolve(true);
            setlogado(true)
          } else {
            resolve(false);
            setlogado(false)
          }
        })
        .catch(err => reject(err));
    });
  };*/

  /*useEffect(() => {

    isSignedIn()
    
  }, [])*/


  
  const isSignedIn = async () => {
    const token = await AsyncStorage.getItem('@storage_Key');

    console.log(token)
  
    return (token !== null) ? (setSigned(true), setSignLoaded(true)) : (setSigned(false), setSignLoaded(true));

  };

  /*isSignedIn()
      .then(res => useState({ signed: res, signLoaded: true }));*/

  /*const [signed, signLoaded] = useState({
    signed: isSignedIn().then((res) => res),
    signLoaded: true,
  });*/

  const [ signed, setSigned ] = useState(null);
  const [ signLoaded, setSignLoaded ] = useState(null)

  //const RotaPrincipal = LoginRoute();

  //const RotaPrincipalNav = createAppContainer(RotaPrincipal)

  useEffect(() => {

    isSignedIn()
 

    /*return function cleanup(){
      AbortController.abort
    }*/
  }, [])


    if (!signLoaded) {
      return null;
  }

  const Layout = createRootNavigator(signed);
  const RotaPrincipal = createAppContainer(Layout)
    return (

    <>
    
    <StatusBar
        backgroundColor={colors.tertiary}
        barStyle="white-content"
                />

      <RotaPrincipal />

    </>
    
    );
  }

    //<RotaPrincipalNav />

  

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
    fontSize: screenHeight*0.027,
    fontWeight: 'bold',
    height: screenHeight*0.035,
  },

  itemcontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    //justifyContent: 'space-around',
    marginLeft: screenWidth*0.043,
    marginTop: screenHeight*0.028
  },

  texto_inicial: {
    color: colors.primary, 
    fontSize: screenWidth*0.031, 
    fontFamily: fonts.bold, 
    textAlign: "justify"

  },

  texto_username: {
    color: colors.primary, 
    fontSize: screenWidth*0.045, 
    fontFamily: fonts.bold, 
    textAlign: "justify",
    textAlign: 'justify'

  },

  botao_username: {
    height:screenHeight*0.08,
    width: screenWidth*0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },

  placeholder:{
    fontSize: screenWidth*0.03,
    fontFamily: fonts.primary
  }


})

const slides = [
  {
    key: 'k1',
    title: 'Nesse App ',
    text: ' Olá, seja bem vindo a Semana da Fluxo! Esse App será como um grande guia pra você durante a semana que vai rolar do dia 23 até o dia 27! Aqui, você poderá conferir toda a programação, entender mais sobre cada palestra, confirmar sua presença e muito mais!',
    image: require('./Assets/smart-phone.png'),
    titleStyle: styles.title,
    textStyle: styles.text,
    imageStyle: styles.image,
    backgroundColor: '#F7BB64',
  },
  {
    key: 'k2',
    title: 'Conferir a Programação ',
    text: ' Essa é a Tela Inicial do nosso App! Nela, estão organizadas todas as palestras de acordo com os dias da semana... E ainda tem mais! Aperte em qualquer uma delas e abrirá uma nova tela pra você conferir mais detalhes sobre cada uma delas',
    image: require('./Assets/popcorn.png'),
    titleStyle: styles.title,
    textStyle: styles.text,
    imageStyle: styles.image,
    backgroundColor: '#F4B1BA',
  },
  {
    key: 'k3',
    title: 'Favoritos ',
    text: ' É claro que nesse App você também poderá adicionar palestras aos seus favoritos! Simplesmente clicando no coração quando estiver acessando mais informações de uma das palestras...',
    image: require('./Assets/heart.png'),
    titleStyle: styles.title,
    textStyle: styles.text,
    imageStyle: styles.image,
    backgroundColor: '#4093D2',
  },
  {
    key: 'k4',
    title: 'Confirmar presença ',
    text: ' Esse App também vai ter QR Code? Claro! Serve para você confirmar sua presença na palestra lendo um código que será exibido durante a palestra! E pra quem é estudante, isso é maravilhoso porque garante nossas horas complementares...',
    image: require('./Assets/qr-code.png'),
    titleStyle: styles.title,
    textStyle: styles.text,
    imageStyle: styles.image,
    backgroundColor: '#644EE2',
  },
  {
    key: 'k5',
    title: 'Considerações ',
    text: ' Esse App também vai ter um espaço para os nossos parceiros que tornaram tudo isso possível! Além das nossas redes sociais para que vocês possam nos encontrar! Isso é tudo pessoal, curtam muito essa semana e tentem aproveitar tudo!!',
    image: require('./Assets/document.png'),
    titleStyle: styles.title,
    textStyle: styles.text,
    imageStyle: styles.image,
    backgroundColor: '#FF1744',
  },

];




    