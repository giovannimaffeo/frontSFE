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
  Image
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
  Screen2: {
    screen: Screen2,
    navigationOptions: {
      drawerLabel: "Informações Gerais",
      drawerIcon: () => (
        <Icon name="note-outline" size={24} color="white" />
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
  return(


    <RouteNav />
    
    



  );
}
    