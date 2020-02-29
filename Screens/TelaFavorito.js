/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  AppRegistry,
  Image,
  FlatList,
} from 'react-native';

import {
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { createAppContainer, } from 'react-navigation';
import { createStackNavigator, Assets } from 'react-navigation-stack';


import Dimensoes, { screenWidth, screenHeight } from '../Dimensoes/Dimensoes';

import palestra from './Palestra'
import Header from './Header'

import Icon from 'react-native-vector-icons/FontAwesome';

import Animation from 'lottie-react-native';

import LottieView from 'lottie-react-native';

import Palestra from '../Screens/Palestra'

import colors from '../styles/colors';
import fonts from '../styles/fonts';

//novo
import api from '../services/api'
import { useState, useEffect } from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import Error from './Error'

/*const DATA = 

    [
      {
        key: "k1",
        horario: "10 até 12 horas",
        tema: "A Evolução da Ciência",
        palestrante: "Richard Rasmussen",
        descricao_palestra: "Apresenta um panorama da Ciência da Informação em três momentos. Inicialmente, seu surgimento e consolidação na década de 1960, como confluência de vários fatos: a distinção em relação à Arquivologia, à Biblioteconomia e à Museologia; a relação com a Documentação; a ocupação do espaço institucional da Biblioteconomia; as atividades dos primeiros cientistas da informação; as tecnologias da informação; e o uso da Teoria Matemática. Com o objetivo de Analisar a ampliação vivida nas décadas seguintes com o desenvolvimento de subáreas, das caracterizações do campo e da evolução do conceito de informação",
        descricao_palestrante: "Richard Rasmussen foi um cientista, físico, biólogo, astrônomo, astrofísico, cosmólogo, escritor, divulgador científico e ativista norte-americano",
        foto_palestrante: "https://abrilsuperinteressante.files.wordpress.com/2018/10/carlsagan.png",
        dia: "27 de junho de 2020",
        sala: "Sala 201 do Bloco A do CT",
        favorito: "False"

    },

    

    {
      key: "k2",
      horario: "10 até 12 horas",
      tema: "A Evolução da Ciência",
      palestrante: "Richard Rasmussen",
      descricao_palestra: "Apresenta um panorama da Ciência da Informação em três momentos. Inicialmente, seu surgimento e consolidação na década de 1960, como confluência de vários fatos: a distinção em relação à Arquivologia, à Biblioteconomia e à Museologia; a relação com a Documentação; a ocupação do espaço institucional da Biblioteconomia; as atividades dos primeiros cientistas da informação; as tecnologias da informação; e o uso da Teoria Matemática. Com o objetivo de Analisar a ampliação vivida nas décadas seguintes com o desenvolvimento de subáreas, das caracterizações do campo e da evolução do conceito de informação",
      descricao_palestrante: "Richard Rasmussen foi um cientista, físico, biólogo, astrônomo, astrofísico, cosmólogo, escritor, divulgador científico e ativista norte-americano",
      foto_palestrante: "https://abrilsuperinteressante.files.wordpress.com/2018/10/carlsagan.png",
      dia: "27 de junho de 2020",
      sala: "Sala 201 do Bloco A do CT",
      favorito: "False"

  },

    
  {
    key: "k3",
    horario: "10 até 12 horas",
    tema: "A Evolução da Ciência",
    palestrante: "Richard Rasmussen",
    descricao_palestra: "Apresenta um panorama da Ciência da Informação em três momentos. Inicialmente, seu surgimento e consolidação na década de 1960, como confluência de vários fatos: a distinção em relação à Arquivologia, à Biblioteconomia e à Museologia; a relação com a Documentação; a ocupação do espaço institucional da Biblioteconomia; as atividades dos primeiros cientistas da informação; as tecnologias da informação; e o uso da Teoria Matemática. Com o objetivo de Analisar a ampliação vivida nas décadas seguintes com o desenvolvimento de subáreas, das caracterizações do campo e da evolução do conceito de informação",
    descricao_palestrante: "Richard Rasmussen foi um cientista, físico, biólogo, astrônomo, astrofísico, cosmólogo, escritor, divulgador científico e ativista norte-americano",
    foto_palestrante: "https://abrilsuperinteressante.files.wordpress.com/2018/10/carlsagan.png",
    dia: "27 de junho de 2020",
    sala: "Sala 201 do Bloco A do CT",
    favorito: "False"

  },

  {
    key: "k4",
    horario: "10 até 12 horas",
    tema: "A Evolução da Ciência",
    palestrante: "Richard Rasmussen",
    descricao_palestra: "Apresenta um panorama da Ciência da Informação em três momentos. Inicialmente, seu surgimento e consolidação na década de 1960, como confluência de vários fatos: a distinção em relação à Arquivologia, à Biblioteconomia e à Museologia; a relação com a Documentação; a ocupação do espaço institucional da Biblioteconomia; as atividades dos primeiros cientistas da informação; as tecnologias da informação; e o uso da Teoria Matemática. Com o objetivo de Analisar a ampliação vivida nas décadas seguintes com o desenvolvimento de subáreas, das caracterizações do campo e da evolução do conceito de informação",
    descricao_palestrante: "Richard Rasmussen foi um cientista, físico, biólogo, astrônomo, astrofísico, cosmólogo, escritor, divulgador científico e ativista norte-americano",
    foto_palestrante: "https://abrilsuperinteressante.files.wordpress.com/2018/10/carlsagan.png",
    dia: "27 de junho de 2020",
    sala: "Sala 201 do Bloco A do CT",
    favorito: "False"

  },

  {
    key: "k5",
    horario: "10 até 12 horas",
    tema: "A Evolução da Ciência",
    palestrante: "Richard Rasmussen",
    descricao_palestra: "Apresenta um panorama da Ciência da Informação em três momentos. Inicialmente, seu surgimento e consolidação na década de 1960, como confluência de vários fatos: a distinção em relação à Arquivologia, à Biblioteconomia e à Museologia; a relação com a Documentação; a ocupação do espaço institucional da Biblioteconomia; as atividades dos primeiros cientistas da informação; as tecnologias da informação; e o uso da Teoria Matemática. Com o objetivo de Analisar a ampliação vivida nas décadas seguintes com o desenvolvimento de subáreas, das caracterizações do campo e da evolução do conceito de informação",
    descricao_palestrante: "Richard Rasmussen foi um cientista, físico, biólogo, astrônomo, astrofísico, cosmólogo, escritor, divulgador científico e ativista norte-americano",
    foto_palestrante: "https://abrilsuperinteressante.files.wordpress.com/2018/10/carlsagan.png",
    dia: "27 de junho de 2020",
    sala: "Sala 201 do Bloco A do CT",
    favorito: "False"

  },

  


];*/










export default function TelaFavorito({ navigation }){

  //puxando do back comecando aqui

  const [lista_favoritos, set_lista_favoritos] = useState(null);

  const [errorMessage, seterror] = useState(null);

  const [loading, setloading] = useState(true)

  async function DefineListaFavoritos() {

    try {

      const response = await api.get('/verfavoritos/');

      const favoritos = response.data

      set_lista_favoritos(favoritos)

      setloading(false)
    
    } catch(err) {

      seterror( 'Não foi possível carregar os favoritos' );

      setloading(false)

    }

  };

  useEffect( () => {

    DefineListaFavoritos()
    
  }, [])




  return(
    
    <View style={styles.container}>

      <Spinner visible={loading}/>

      { !!errorMessage && <Error errorMessage={errorMessage}/> }

      <View style={styles.titleContainer}>

        <View style={{marginTop: screenHeight*0.02}}>

          <Text style={styles.title}>Palestras Favoritas</Text>

        </View>

        <View>

          <LottieView 
            source={require('../Assets/coracao_laranja_maior')} 
            autoPlay 
            loop 
            style={{height: screenHeight*0.0719}}/>

        </View>

      </View>

      <View style={styles.bodyContainer}>

        <FlatList 

        data = {lista_favoritos}

        renderItem = { ({item}) =>  < Palestra data = {item} length={lista_favoritos.length} index = {lista_favoritos.indexOf(item)} lastindex = {lista_favoritos.length - 1} navigation = {navigation}  /> }

        keyExtractor={ (item) => item.id.toString() }

        />

      </View>

      

      


        



    </View>

  );
}


TelaFavorito.navigationOptions = ({ navigation }) => ({
  header: (  
    
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
    padding: 20

    
},

textoHeader:{
  fontSize: screenHeight*0.03,
  fontFamily: fonts.bold

  
},


  logofluxo:{
    borderRadius: screenWidth*0.0125,
    width: screenWidth*0.1625,
    height: screenWidth*0.1625,

  },


  container: {
    backgroundColor: colors.primary,
    flex: 1,
  
    
  },

  titleContainer: {
    height: screenHeight*0.1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',


  },
  title:{
    color: colors.tertiary,
    fontFamily: fonts.bold,
    fontSize: screenWidth*0.075
  },

  bodyContainer:{
    marginTop: screenHeight*0.018,
    borderTopWidth: screenHeight*0.003,
    borderBottomColor: colors.quaternary,
    backgroundColor: colors.secondary,
    borderRadius: screenHeight*0.015,
  }


}
)



