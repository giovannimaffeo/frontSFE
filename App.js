

import React, { useState, useEffect } from "react";

import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  Image,
  Linking,
  TextInput,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  Alert
} from 'react-native';


import ImagePicker from 'react-native-image-picker';

import { createAppContainer, createSwitchNavigator, SafeAreaView } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator, DrawerItems, dangerouslyGetParent } from 'react-navigation-drawer';

import FlashMessage from 'react-native-flash-message';

import Programacao from './Screens/Programacao'


import QrCode from './Screens/QrCode'
import Creditos from './Screens/Creditos'

import Informacoes from './Screens/Informacoes'
import { screenWidth, screenHeight } from './Dimensoes/Dimensoes';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
Icon.loadFont();


import TelaFavorito from './Screens/TelaFavorito';


import fonts from './styles/fonts';


import AsyncStorage from '@react-native-community/async-storage';

import Login from './Screens/Login'

//Redux

//disponibiliza a store de forma global pra aplicação
import { Provider } from 'react-redux';
//para pegar informações da store

import api from './services/api';

//Redux
import { useDispatch, useSelector } from 'react-redux';
//Redux

import store from './redux/store';

//Redux

import DrawerIcon from './Screens/DrawerIcon';
import Drawerlabel from './Screens/DrawerLabel';
import TelaCreditos from "./Screens/Creditos";

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
      screen: QrCode
    }
  },
  {
    initialRouteName:'QRcode'
  }
)

const StackCredits = createStackNavigator(
  {
    Creditos:{
      screen: Creditos
    },
  },
  {
    initialRouteName: 'Creditos'
  }
)

const AppContainerFavorito = createAppContainer(StackFavorito);

const QRContainer = createAppContainer(StackQR);

const CreditsContainer = createAppContainer(StackCredits);

const CustomDrawer = (props) => {

  //Redux
  const colorsList = useSelector(state => state.data)
  //Redux

  const [ contador, set_contador ] = useState(null)

  const [ numero, set_numero ] = useState(20)

  const [ esta_mudando, set_esta_mudando ] = useState(false)

  const [ username, set_username ] = useState('')

  const [token, setToken] = useState('')

  const [ imageSource, setImageSource ] = useState("https://www.bu.edu/disability/files/2019/02/no_profile_photo.jpg");

  const options = {
    title: "Escolha uma Foto Irada!",
    maxWidth: 800, 
    maxHeight: 600,
    takePhotoButtonTitle: 'Tirar foto agora...',
    chooseFromLibraryButtonTitle: 'Escolher da biblioteca...',
    cancelButtonTitle: 'Cancelar',
    allowsEditing: 'true'
    
  };




    pickImageHandler = () => {
    ImagePicker.showImagePicker(options, res => {
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
  const texto_username = <Text style={[styles.texto_username, {color: colorsList.dark_terciaria}]}>{username}</Text>

  const texto_mudando =

    <View>

      <View style={{flexDirection:'row', alignItems: 'center', width: screenWidth*0.5, justifyContent: 'space-evenly', marginLeft: screenWidth*0.03}}>

        <TextInput 
        placeholder="Coloque seu nome aqui"
        placeholderTextColor='rgba(0, 0, 0, 0.25)'
        onChangeText={(text) => { text != null ? set_numero(20 - text.length) : set_contador(20) ; set_username(text); } }
        value={username}
        maxLength = {20}
        autoCorrect = {false}
        textContentType = "name"
        style={{fontSize: screenWidth*0.035, color: 'rgba(0, 0, 0, 0.25)', fontWeight: 'bold', flex: 1, height: screenWidth*0.12}} 
        />

        <Text style={{color:  'rgba(0, 0, 0, 0.25)', fontSize: screenWidth*0.033}}>{numero}</Text>

      </View>

      <View style={{alignItems: 'flex-end'}}>  

        <TouchableOpacity onPress={() => { set_esta_mudando(false); armazena_username(username); armazena_numero(numero)}} style={{alignItems: 'flex-end', width: screenWidth*0.35, justifyContent: 'center', height: screenWidth*0.07}}>

          <Text style={{fontSize: screenWidth*0.033}}>Confirmar</Text>

        </TouchableOpacity>

      </View>

    </View>

  const texto_nao_mudando = 

    <View style={{height: screenWidth*0.3, width: screenWidth*0.58 }}>

      <TouchableOpacity style={[styles.botao_username, {marginTop: screenWidth*0.08}]} onPress={() => set_esta_mudando(true)}>

        { username == null || username == '' ? texto_inicial : texto_username }

      </TouchableOpacity>

      <TouchableOpacity onPress={showToken} style={{height: screenWidth*0.08,flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', marginRight: screenWidth*0.03}}>

        <Text style={{color: colorsList.secundaria, fontFamily: fonts.bold, fontSize: screenWidth*0.035}}> N° de inscrição  </Text>

        <Icon name="lead-pencil" size={screenWidth*0.04} color={colorsList.secundaria} style={styles.icone}/>

      </TouchableOpacity>


    </View>

    

  async function armazena_username(username){

    await AsyncStorage.setItem('@AppSFE:username', username)

  }

  async function armazena_foto_perfil(foto_perfil){

    await AsyncStorage.setItem('@AppSFE:foto_perfil', foto_perfil)

  }

  async function armazena_numero(numero){

    await AsyncStorage.setItem('@AppSFE:contador', String(numero))

    

  }


  async function reset_dados(){

    var username_armazenado = await AsyncStorage.getItem('@AppSFE:username')

    var foto_perfil_armazenada = await AsyncStorage.getItem('@AppSFE:foto_perfil')

    //var numero_armazenado = Number(await AsyncStorage.getItem('@AppSFE:contador'))

    var password = await AsyncStorage.getItem('@AppSFE:password')


    set_username(username_armazenado)
    setImageSource(foto_perfil_armazenada)
    username_armazenado ? set_numero(20 - username_armazenado.length) : set_numero(20)
    setToken(password)

  }

  function showToken(){

    Alert.alert('Número de Inscrição da Semana',
    (username) ? `Eaí ${username}, o seu número é:  ${token}` :
    `O seu número é:  ${token}`,[ {text: 'Beleza!'} ])

  }

   
  useEffect( () => {
 
    props.navigation.state.isDrawerOpen ? null : (Keyboard.dismiss(), set_esta_mudando(false))
    reset_dados()

  },[props.navigation.state.isDrawerOpen] )


  return (

    <TouchableWithoutFeedback onPress = {Keyboard.dismiss}>
    <View style={styles.menu_lateral_container}>

      <View style={[styles.perfil_container, {backgroundColor: colorsList.quaternaria, borderBottomColor: colorsList.terciaria}]}>

        <View style={{paddingLeft: screenWidth*0.03,flexDirection: 'row', alignItems: 'center'}}>

          <TouchableOpacity onPress={pickImageHandler}>

            <Image 
            style={{height: screenHeight*0.1, width: screenHeight*0.1, borderRadius: screenHeight*0.05}}  
            source={{ uri: imageSource ? imageSource : "https://www.bu.edu/disability/files/2019/02/no_profile_photo.jpg" }} />

          </TouchableOpacity>

          { esta_mudando ? texto_mudando : texto_nao_mudando }

        </View>

      </View>

      
      <View style={{backgroundColor: colorsList.primaria, flex: 1}}>
      
      
        <DrawerItems {...props} />

        <TouchableOpacity style = {styles.itemcontainer} onPress={() => Linking.openURL('https://forms.gle/aZtsrLLHxRDHv6wx5')}>

          <View style={{...Platform.select({
                ios: {
                  marginRight: screenWidth*0.11
                },
                android: {
                  marginRight: screenWidth*0.1
                },
              }),}}>

            <Icon name="note-outline" size={screenWidth*0.0625} color={colorsList.secundaria} style={styles.icone}/>


          </View>

          <View>
            
            <Text style = {[styles.texto, {color: colorsList.terciaria}]}>Processo Seletivo</Text>

          </View>

        </TouchableOpacity>

        <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', position:'absolute', bottom:"2%",top:'90%', left:'70%', height: screenWidth*0.1}} onPress={() => (logout(), props.navigation.navigate('SignedOut'))}  >

          <View >

            <Icon name="logout" size={screenWidth*0.0625} color={colorsList.secundaria} style={styles.icone}/>

          </View>

          <View style={{marginLeft: screenWidth*0.02}}>

            <Text style={{color: colorsList.secundaria, fontSize: screenWidth*0.05, fontFamily: fonts.bold}}>Sair</Text>


          </View>

        </TouchableOpacity>

      </View>

    </View>
    </TouchableWithoutFeedback>



    
  );
};


const Drawer = () => {

  const state = store.getState();
  console.log(state.data.primaria)
  const cor = state.data.primaria;

  return createDrawerNavigator(
  {
  AppContainer: {
    screen: AppContainer,
    navigationOptions: {
      drawerLabel: (<Drawerlabel labelName={"Programação"}/>),
      drawerIcon: (<DrawerIcon iconName={"popcorn"} />)
    },
  },
  AppContainerFavorito: {
    screen: AppContainerFavorito,
    navigationOptions: {
      drawerLabel: (<Drawerlabel labelName={"Favoritos"}/>),
      drawerIcon: (<DrawerIcon iconName={"heart"} />)
    },
  },

  QRcode: {
    screen: QRContainer,
    navigationOptions: {
      drawerLabel: (<Drawerlabel labelName={"Confirmar Presença"}/>),
      drawerIcon: (<DrawerIcon iconName={"qrcode"} />)
    },
  },

  Creditos: {
    screen: CreditsContainer,
    navigationOptions: {
      drawerLabel: (<Drawerlabel labelName={"Créditos"}/>),
      drawerIcon: (<DrawerIcon iconName={"help-circle-outline"} />)
    },
  },

  },
  {
    initialRouteName: 'AppContainer',
    contentComponent: props => < CustomDrawer {...props} />,
    keyboardDismissMode: 'on-drag',
    drawerWidth: screenWidth*0.8,
    
    
    contentOptions: {
      labelStyle: {
        //color: () => <View><Text color={'blue'}>oi</Text></View>,
        fontSize: screenWidth*0.045,
        padding: screenWidth*0.025,
        //fontFamily: fonts.regular,
        textAlign: "justify"

      },
    }
    

    
    
  }

)}


const RouteNav = Drawer();



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

  //Redux

  //estado das cores no componente
  const [colorsList, setColorsList] = useState(false);
  const [loadingColors, setLoadingColors] = useState(true);

  //nos permite realizar uma action
  const dispatch = useDispatch();

  //carregando cores do back
  async function loadColors(){
    try{
      const response = await api.get('/cores/');
      console.log(response.data)
      setColorsList(response.data);
      //parar de exibir a splash screen
      setLoadingColors(false)
    }
    catch{
      console.log('Não foi possível carregar as cores');
    }
  }

  //realiza a action
  function addColors(){
    (colorsList) ? dispatch({ type: 'ADD_COLORS', colors: colorsList }) : null
  }

  //Redux

  useEffect(() => {

    loadColors()
    //addColors()
    isSignedIn() 


  }, [])

  if (loadingColors){
    addColors()
    return null
  }

  if (!signLoaded) {
      return null;
  }

  const Layout = createRootNavigator(signed);
  const RotaPrincipal = createAppContainer(Layout)
    return (

    <Provider store={store}>
      <StatusBar
          backgroundColor={colorsList.terciaria}
          barStyle="light-content"
                  />
      
      <RotaPrincipal />
      <FlashMessage position="top"/>
    </Provider>
    
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
  texto: {
    ...Platform.select({
      ios: {
        fontSize: screenHeight*0.026,
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
    color: 'rgba(0, 0, 0, 0.25)', 
    fontSize: screenWidth*0.031, 
    fontFamily: fonts.bold, 
    textAlign: "justify"

  },

  texto_username: {
    fontSize: screenWidth*0.045, 
    fontFamily: fonts.bold, 
    textAlign: 'center',
    

  },

  botao_username: {
    height:screenHeight*0.08,
    width: screenWidth*0.56,
    justifyContent: 'center',
    alignItems: 'center', 
    marginLeft: screenWidth*0.012
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
      ...Platform.select({
        ios: {
          marginTop: screenHeight*0.04,          
        },
        android: {
        },      
      }),
      borderBottomWidth: screenHeight*0.01, 
      justifyContent: 'center'
    }

})

