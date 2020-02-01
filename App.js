/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useState, useEffect } from "react";

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  Linking
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import ImagePicker from 'react-native-image-picker';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';


//import 'react-native-gesture-handler'

//import Dimensoes, { screenWidth, screenHeight } from './Dimensoes/Dimensoes';

import Dia1 from './Screens/Dia1'
import Dia2 from './Screens/Dia2'
import Dia3 from './Screens/Dia3'
import Dia4 from './Screens/Dia4'
import Dia5 from './Screens/Dia5' 


import Screen2 from './Screens/Screen2'
import Screen3 from './Screens/Screen3'
import Screen4 from './Screens/Screen4'

import Informacoes from './Screens/Informacoes'
import { screenWidth, screenHeight } from './Dimensoes/Dimensoes';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import TelaFavorito from './Screens/TelaFavorito';
import { TouchableOpacity } from 'react-native-gesture-handler';

import AppIntroSlider from 'react-native-app-intro-slider';
import { hidden } from "ansi-colors";

//foto neymar: https://pbs.twimg.com/profile_images/1195070652346241024/TY83Cwxb_400x400.jpg

const DATA = 

    [

    {
      nome_usuario: "Neymar Júnior",
      foto_usuario: "https://www.bu.edu/disability/files/2019/02/no_profile_photo.jpg"

    }

];





const Stack = createStackNavigator (
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



const CustomDrawer = props => {

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


      }
    });
  }
  
  return (
    <View style={{flex: 1}}>

      <View style={{height: 130, backgroundColor: '#DCDCDC', borderBottomWidth: screenHeight*0.01, borderBottomColor: '#F4893B'}}>

        <View style={{padding: 15, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>

          <TouchableOpacity onPress={pickImageHandler}>

            <Image 
            style={{height: 90, width: 90, borderRadius: 45}}  
            source={{ uri: imageSource }} />

          </TouchableOpacity>
        
          <Text style={{color: '#222222', fontSize: 21, fontFamily: "Gelasio-Bold", textAlign: "justify"}}>
            
            {DATA[0].nome_usuario}
            
          </Text>

        </View>

      </View>

      
      <View style={{backgroundColor: '#222222', flex: 1}}>
      
      
        <DrawerItems {...props} style={{Colors: "white"}} />

        <TouchableOpacity style = {styles.itemcontainer} onPress={() => Linking.openURL('https://pbs.twimg.com/profile_images/1195070652346241024/TY83Cwxb_400x400.jpg')}>

          <View>

            <Icon name="note-outline" size={25} color="#a6a6a6" style={styles.icone}/>


          </View>

          <View>
            
            <Text style = {styles.texto}>Inscrição Processo Seletivo</Text>

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
        <Icon name="popcorn" size={24} color="white" />
      )

    },
  },
  AppContainerFavorito: {
    screen: AppContainerFavorito,
    navigationOptions: {
      drawerLabel: "Favoritos",
      drawerIcon: () => (
        <Icon name="heart" size={24} color="white" />
      )

    },
  },

  Screen3: {
    screen: Screen3,
    navigationOptions: {
      drawerLabel: "Confirmar Presença",
      drawerIcon: () => (
        <Icon name="qrcode" size={24} color="white" />

      )
    },
  },

  Screen4: {
    screen: Screen4,
    navigationOptions: {
      drawerLabel: "Créditos",
      drawerIcon: () => (
        <Icon name="help-circle-outline" size={24} color="white" />

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
        color: '#F4893B',
        fontSize: 18,
        padding: 10,
        fontFamily: "Gelasio-Regular",
        textAlign: "justify"

      },
    }
    

    
    
  }

)

const RouteNav = createAppContainer(Drawer)





export default function App(){

  const [ show_Main_App, set_show ] = useState(false);

  on_Done_all_slides = () => {
    set_show(true);
  };
  
  on_Skip_slides = () => {
    set_show(true);
  };
    
  if (show_Main_App) {

    return(
      
      <RouteNav />
      
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
   color: '#fff', 
   fontWeight: 'bold', 
   textAlign: 'center', 
   marginTop: screenHeight*0.02875, 
  }, 
  text: { 
   color: '#fff', 
   fontSize: screenHeight*0.02875, 
  }, 
  image: { 
   width: screenHeight*0.2875, 
   height: screenHeight*0.2875, 
   resizeMode: 'contain' 
  },
  texto: {
    color: '#F4893B',
    fontSize: screenHeight*0.02616,
    fontWeight: 'bold',
    height: screenHeight*0.035,
  },

  itemcontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: screenHeight*0.028
  },

});

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




    