

import React, { useState, useEffect } from "react";

import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  Image,
  Linking,
  TextInput,
  TouchableOpacity
} from 'react-native';


import ImagePicker from 'react-native-image-picker';

import { createAppContainer, createSwitchNavigator, SafeAreaView } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';

import FlashMessage from 'react-native-flash-message';

import Programacao from './Screens/Programacao'


import Screen3 from './Screens/Screen3'
import Screen4 from './Screens/Screen4'

import Informacoes from './Screens/Informacoes'
import { screenWidth, screenHeight } from './Dimensoes/Dimensoes';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
Icon.loadFont();


import TelaFavorito from './Screens/TelaFavorito';


import colors from "./styles/colors";
import fonts from './styles/fonts';


import AsyncStorage from '@react-native-community/async-storage';

import Login from './Screens/Login'

const DATA = 

    [

    {
      nome_usuario: "Neymar Júnior",
      foto_usuario: "https://www.bu.edu/disability/files/2019/02/no_profile_photo.jpg"

    }

];




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

const StackQR = createStackNavigator(
  {
    QRcode:{
      screen:Screen3
    }
  },
  {
    initialRouteName:'QRcode'
  }
)

const AppContainerFavorito = createAppContainer(StackFavorito);

const QRContainer = createAppContainer(StackQR);

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

    <View style={styles.menu_lateral_container}>

      <View style={styles.perfil_container}>

        <View style={{padding: screenWidth*0.0375, flexDirection: 'row', alignItems: 'center'}}>

          <TouchableOpacity onPress={pickImageHandler}>

            <Image 
            style={{height: screenHeight*0.1, width: screenHeight*0.1, borderRadius: screenHeight*0.05}}  
            source={{ uri: imageSource ? imageSource : "https://www.bu.edu/disability/files/2019/02/no_profile_photo.jpg" }} />

          </TouchableOpacity>

          { esta_mudando ? texto_mudando : texto_nao_mudando }

        </View>

      </View>

      
      <View style={{backgroundColor: colors.primary, flex: 1}}>
      
      
        <DrawerItems {...props} style={{Colors: colors.secondary}}  />

        <TouchableOpacity style = {styles.itemcontainer} onPress={() => Linking.openURL('https://forms.gle/aZtsrLLHxRDHv6wx5')}>

          <View style={{marginRight: screenWidth*0.1}}>

            <Icon name="note-outline" size={screenWidth*0.0625} color='#a6a6a6' style={styles.icone}/>


          </View>

          <View>
            
            <Text style = {styles.texto}>Processo Seletivo</Text>

          </View>

        </TouchableOpacity>

        <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', position:'absolute', bottom:"2%",top:'90%', left:'70%', height: screenWidth*0.1}} onPress={() => (logout(), props.navigation.navigate('SignedOut'))}  >

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
        <View style = {{width:screenWidth*0.07}}>
        <Icon name="popcorn" size={screenWidth*0.06} color={colors.secondary}  resizeMode = 'contain'/>
        </View>
      )

    },
  },
  AppContainerFavorito: {
    screen: AppContainerFavorito,
    navigationOptions: {
      drawerLabel: "Favoritos",
      drawerIcon: () => (
        <View style = {{width:screenWidth*0.07}}>
        <Icon name="heart" size={screenWidth*0.06} color={colors.secondary} />
        </View>
      )

    },
  },

  Screen3: {
    screen: QRContainer,
    navigationOptions: {
      drawerLabel: "Confirmar Presença",
      drawerIcon: () => (
        <View style = {{width:screenWidth*0.07}}>
        <Icon name="qrcode" size={screenWidth*0.06} color={colors.secondary} />
        </View>
      )
    },
  },

  Screen4: {
    screen: Screen4,
    navigationOptions: {
      drawerLabel: "Créditos",
      drawerIcon: () => (
        <TouchableOpacity style = {{width:screenWidth*0.07}} >
        <Icon name="help-circle-outline" size={screenWidth*0.06} color={colors.secondary} />
        </TouchableOpacity>
      )
    },
  },

  },
  {
    initialRouteName: 'AppContainer',
    contentComponent: props => < CustomDrawer {...props} />,
    drawerWidth: screenWidth*0.8,
    
    contentOptions: {
      labelStyle: {
        color: colors.tertiary,
        fontSize: screenWidth*0.045,
        padding: screenWidth*0.025,
        //fontFamily: fonts.regular,
        textAlign: "justify"

      },
    }
    

    
    
  }

)

export const RouteNav = createAppContainer(Drawer)




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

 


  
  const isSignedIn = async () => {
    const token = await AsyncStorage.getItem('@storage_Key');

    console.log(token)
  
    return (token !== null) ? (setSigned(true), setSignLoaded(true)) : (setSigned(false), setSignLoaded(true));

  };

 

  const [ signed, setSigned ] = useState(null);
  const [ signLoaded, setSignLoaded ] = useState(null)



  useEffect(() => {

    isSignedIn()
 


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
          barStyle="light-content"
                  />

      <RotaPrincipal />
      <FlashMessage position="top"/>
    </>
    
    );
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
    ...Platform.select({
      ios: {
        fontSize: screenHeight*0.0198,
        marginTop: screenHeight*0.0045
      },
      android: {
        fontSize: screenHeight*0.027,
      },
    }),
    fontWeight: "bold",
    //fontFamily: fonts.bold,
    height: screenHeight*0.035,
  },

  itemcontainer: {
    flexDirection: 'row',
    //alignItems: 'center',
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
    textAlign: 'justify',

  },

  botao_username: {
    height:screenHeight*0.08,
    width: screenWidth*0.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: screenWidth*0.02
  },

  placeholder:{
    fontSize: screenWidth*0.03,
    fontFamily: fonts.primary
  },

  botao_sair: {
    flexDirection: 'row',
    alignItems: 'center', 
    marginLeft: screenWidth*0.57, 
    ...Platform.select({
      ios: {
        marginTop: screenWidth*0.6, 
      },
      android: {
        marginTop: screenWidth*0.3, 
      },      
    }),
    height: screenWidth*0.1
  },

  menu_lateral_container: {
    flex: 1,
    backgroundColor: '#DCDCDC',
    ...Platform.select({
      ios: {
        //marginTop: screenWidth*0.6, 
      },
      android: {
      },      
    }),
    },
  
    perfil_container:{
      height: screenHeight*0.187, 
      backgroundColor: '#DCDCDC', 
      ...Platform.select({
        ios: {
          marginTop: screenHeight*0.04,          
        },
        android: {
        },      
      }),
      borderBottomWidth: screenHeight*0.01, 
      borderBottomColor: colors.tertiary,
      justifyContent: 'center'
    }

})

