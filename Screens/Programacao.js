/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  Keyboard} from 'react-native';

//novo:
import { useState, useEffect } from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import Error from './Error'

import LottieView from 'lottie-react-native';


//Redux
import { useSelector } from 'react-redux';
//Redux




import { screenWidth, screenHeight } from '../Dimensoes/Dimensoes';

import Palestra from './Palestra';
import Header from './Header'



import fonts from '../styles/fonts';

//novo:
import api from '../services/api'




const date = new Date();





export default function Programacao({ navigation }){

  //Redux
  //permite que usarmos os estados que está armazenado na store
  const colorsList = useSelector(state => state.data);
  //Redux

  const [data_parcial, setdata] = useState(null);

  //novo: começa aqui

  const [errorMessage, seterror] = useState(null);

  //const [verificationToken, setVerificationToken] = useState(null);

  //const [PalestraList, setPalestraList] = useState(null)

  const [lista_datas, set_lista_datas] = useState(null)

  const [loading, setloading] = useState(true)

  const [daysList, setDaysList] = useState({})

  const [colorList, setColorList] = useState([colorsList.secundaria , colorsList.terciaria, colorsList.terciaria, colorsList.terciaria, colorsList.terciaria]);
  function changeColorList(indexButtonToChange){

    const newList = [colorsList.terciaria, colorsList.terciaria, colorsList.terciaria, colorsList.terciaria, colorsList.terciaria];

    newList[indexButtonToChange] = colorsList.secundaria;

    setColorList(newList)
    
  }


  async function DefinePalestraList(data) {

    try {

      //  const token = await AsyncStorage.getItem('@storage_Key');

      const response = await api.get(`/p/${data}/`);

        
      /*, {
        headers: {
          'Authorization': `Token ${token}`,
        }
      });*/

      //console.log(response.data)

      const palestra = response.data
      return palestra
    
    } catch(err) {

      seterror( 'Não foi possível carregar as palestras' );



    }

  };

  async function DefineDatas() {

    
    try{

      const response = await api.get('/dias/')
      const daysList = response.data
      setDaysList(daysList)

      const data_primeiro_dia = await DefinePalestraList(daysList.pri)
      const data_segundo_dia = await DefinePalestraList(daysList.seg)
      const data_terceiro_dia = await DefinePalestraList(daysList.ter)
      const data_quarto_dia = await DefinePalestraList(daysList.qua)
      const data_quinto_dia = await DefinePalestraList(daysList.qui)

      setdata(data_primeiro_dia)

      setloading(false) 

      set_lista_datas([data_primeiro_dia,data_segundo_dia,data_terceiro_dia,data_quarto_dia,data_quinto_dia])
    
    } catch {


    }

  };

  
  // o effect nao muda o estado, ele apenas olha para o valor entre chaves de agora e faz algo. se ele mudar o valor, ele muda.
  //se colocasssemos uma variavel ali, ele iria sempre mudar quando a variavel mudasse, como nao colocamos nada, ele muda quando qualquer variavel muda.
  useEffect( () => {

   // signIn()
    DefineDatas()
  }, [])


  if (loading){
    return(
    <View style={{flex: 1, backgroundColor: colorsList.primaria}}>
      <View style={{zIndex: 5, flex: 1, marginTop: screenHeight*0.11, height: screenHeight*0.6, width: screenWidth, justifyContent: 'center', alignItems: 'center', position: 'absolute'}}>
        <Image source={require('../assets/LogoSingularidade.gif')} style={styles.imagefluxo} resizeMode='cover'/>
      </View>
    </View>
    );
  }

  //acaba aqui
  return(

        <View style={{flex: 1, backgroundColor: colors.primary}} pointerEvents={loading ? 'none' : 'auto'}>

          { !!errorMessage && <Error errorMessage={errorMessage}/> }

          {/*<View style={{zIndex: 5}}> 
            <LottieView style={styles.imagefluxo} resizeMode='cover' autoPlay loop source={require("../assets/LogoSingularidade")} /> 
          </View>*/}


          {/*<Spinner visible={loading}/>*/ }
          
          <View style={styles.title}>

          <TouchableOpacity style={[styles.botao, {backgroundColor: colorList[0]}]} onPress = {() => { setdata(lista_datas[0]); changeColorList(0); }}>

              <Text style={[styles.textoBotao, {color: colorsList.primaria}]}>{daysList.pri.slice(0,2)}</Text>
    
          </TouchableOpacity>



          <TouchableOpacity style={[styles.botao, {backgroundColor: colorList[1]}]} onPress = {() => { setdata(lista_datas[1]); changeColorList(1); }} >
              
              <Text style={[styles.textoBotao, {color: colorsList.primaria}]}>{daysList.seg.slice(0,2)}</Text>

          </TouchableOpacity>



          <TouchableOpacity style={[styles.botao, {backgroundColor: colorList[2]}]} onPress = {() => { setdata(lista_datas[2]); changeColorList(2); }} >
              
              <Text style={[styles.textoBotao, {color: colorsList.primaria} ]}>{daysList.ter.slice(0,2)}</Text>

          </TouchableOpacity>



          <TouchableOpacity style={[styles.botao, {backgroundColor: colorList[3]}]} onPress = {() => { setdata(lista_datas[3]); changeColorList(3); }} >
              
              <Text style={[styles.textoBotao, {color: colorsList.primaria} ]}>{daysList.qua.slice(0,2)}</Text>

          </TouchableOpacity>



          <TouchableOpacity style={[styles.botao, {backgroundColor: colorList[4]}]} onPress = {() => { setdata(lista_datas[4]); changeColorList(4); }} >
              
              <Text style={[styles.textoBotao, {color: colorsList.primaria} ]}>{daysList.qui.slice(0,2)}</Text>

          </TouchableOpacity>

          </View>


          <View style={styles.tabela}>

          <FlatList 

            data = {data_parcial}

            renderItem = { ({item}) =>  < Palestra length={data_parcial.length} index = {data_parcial.indexOf(item)} lastindex = {data_parcial.length - 1} data = { item } navigation = {navigation} /> }

            keyExtractor={ (item) => item.id.toString() }

          />

          </View>

      </View>


  );
}

Programacao.navigationOptions = ({ navigation }) => ({
  header: ( /* Your custom header */
    
    <Header navigation = {navigation} />

  )
})

const styles = StyleSheet.create({

  title:{
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginHorizontal: screenWidth*0.070,
    marginTop: screenHeight*0.04,
    
  },

  botao:{
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        borderRadius: screenHeight*0.025,   
        height: screenHeight*0.05,
        width: screenWidth*0.11
      },
      android: {
        borderRadius: screenWidth*0.525, 
        height: screenWidth*0.105,
        width: screenWidth*0.105

      }     
    }),

  },

  textoBotao:{
    fontFamily: fonts.bold,
    fontSize: screenWidth*0.039
  },

  tabela:{
    marginTop: screenHeight*0.04,
    alignSelf: 'center',
    width: screenWidth,//*0.93,
    height: screenHeight*0.684,
    //backgroundColor: colors.secondary,
    //borderRadius: screenHeight*0.02

    
  },

  imagefluxo: {
    width: screenWidth * 0.33, 
    height: screenHeight * 0.18,
    //backgroundColor: 'pink'
    },
}
);
