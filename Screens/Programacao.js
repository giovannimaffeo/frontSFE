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
  FlatList} from 'react-native';

//novo:
import { useState, useEffect } from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import Error from './Error'






import { screenWidth, screenHeight } from '../Dimensoes/Dimensoes';

import Palestra from './Palestra';
import Header from './Header'



import colors from '../styles/colors'
import fonts from '../styles/fonts';

//novo:
import api from '../services/api'



const date = new Date();





export default function Programacao({ navigation }){

    const [data_parcial, setdata] = useState(null);

    //novo: começa aqui

    const [errorMessage, seterror] = useState(null);

    //const [verificationToken, setVerificationToken] = useState(null);

    //const [PalestraList, setPalestraList] = useState(null)

    const [lista_datas, set_lista_datas] = useState(null)

    const [loading, setloading] = useState(true)

  

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

    

    const data_primeiro_dia = await DefinePalestraList('30-03-2020')
    const data_segundo_dia = await DefinePalestraList('31-03-2020')
    const data_terceiro_dia = await DefinePalestraList('01-04-2020')
    const data_quarto_dia = await DefinePalestraList('02-04-2020')
    const data_quinto_dia = await DefinePalestraList('03-04-2020')

    setdata(data_primeiro_dia)

    setloading(false) 

    set_lista_datas([data_primeiro_dia,data_segundo_dia,data_terceiro_dia,data_quarto_dia,data_quinto_dia])


  };


  // o effect nao muda o estado, ele apenas olha para o valor entre chaves de agora e faz algo. se ele mudar o valor, ele muda.
  //se colocasssemos uma variavel ali, ele iria sempre mudar quando a variavel mudasse, como nao colocamos nada, ele muda quando qualquer variavel muda.


  useEffect( () => {

   // signIn()

    DefineDatas()
    
  }, [])

  //acaba aqui

    return(

        <View style={{flex: 1, backgroundColor: colors.primary }}>

            { !!errorMessage && <Error errorMessage={errorMessage}/> }

            <Spinner visible={loading}/> 
            
            <View style={styles.title}>

            <TouchableOpacity style={styles.botao} onPress = {() => setdata(lista_datas[0])} >
                
                <Text style={styles.textoBotao}>30</Text>

            </TouchableOpacity>



            <TouchableOpacity style={styles.botao} onPress = {() => setdata(lista_datas[1])} >
                
                <Text style={styles.textoBotao}>31</Text>

            </TouchableOpacity>



            <TouchableOpacity style={styles.botao} onPress = {() => setdata(lista_datas[2])} >
                
                <Text style={styles.textoBotao}>01</Text>

            </TouchableOpacity>



            <TouchableOpacity style={styles.botao} onPress = {() => setdata(lista_datas[3])} >
                
                <Text style={styles.textoBotao}>02</Text>

            </TouchableOpacity>



            <TouchableOpacity style={styles.botao} onPress = {() => setdata(lista_datas[4])} >
                
                <Text style={styles.textoBotao}>03</Text>

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

  header:{
      flexDirection: 'row',
      alignItems: 'center',
      height: screenHeight*0.1,
      backgroundColor: colors.tertiary,
      borderBottomWidth: screenHeight*0.01,
      borderBottomColor: colors.quaternary,
      justifyContent: "space-between",
      paddingRight: screenWidth*0.05

      
  },

  textoHeader:{
    fontSize: screenHeight*0.03,
    fontFamily: fonts.bold,
    color: colors.primary

    
  },

  logofluxo:{
    borderRadius: screenWidth*0.0125,
    width: screenWidth*0.1625,
    height: screenWidth*0.1625,

  },


  title:{
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginHorizontal: screenWidth*0.070,
    marginTop: screenHeight*0.04,
    
  },

  botao:{
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.tertiary, ...Platform.select({
      ios: {
        borderRadius: screenHeight*0.025,   
        height: screenHeight*0.05,
        width: screenWidth*0.11
      },
      android: {
        borderRadius: screenWidth*0.05, 
        height: screenHeight*0.06,
        width: screenWidth*0.1

      }     
    }),
    backgroundColor: colors.tertiary,

  },

  textoBotao:{
    color: colors.secondary,
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
}
);
