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
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';


import Dimensoes, { screenWidth, screenHeight } from '../Dimensoes/Dimensoes';

import Palestra from './Palestra';
import Header from './Header'


import Icon from 'react-native-vector-icons/FontAwesome';

import colors from '../styles/colors'
import fonts from '../styles/fonts';
import { tsPropertySignature } from '@babel/types';





const DATA = 

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
      tema: "A História do Futebol",
      palestrante: "Neymar Jr",
      descricao_palestra: "Apresenta um panorama da Ciência da Informação em três momentos. Inicialmente, seu surgimento e consolidação na década de 1960, como confluência de vários fatos: a distinção em relação à Arquivologia, à Biblioteconomia e à Museologia; a relação com a Documentação; a ocupação do espaço institucional da Biblioteconomia; as atividades dos primeiros cientistas da informação; as tecnologias da informação; e o uso da Teoria Matemática. Com o objetivo de Analisar a ampliação vivida nas décadas seguintes com o desenvolvimento de subáreas, das caracterizações do campo e da evolução do conceito de informação",
      descricao_palestrante: "Richard Rasmussen foi um cientista, físico, biólogo, astrônomo, astrofísico, cosmólogo, escritor, divulgador científico e ativista norte-americano",
      foto_palestrante: "https://pbs.twimg.com/profile_images/1195070652346241024/TY83Cwxb_400x400.jpg",
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


];


export default function Dia2({ navigation }){
  return(

    <View style={{flex: 1, backgroundColor: colors.primary }}>
        
        <View style={styles.title}>

          <TouchableOpacity style={styles.botao} onPress = {() => navigation.navigate('Dia1')} >
            
            <Text style={styles.textoBotao}>23</Text>

          </TouchableOpacity>



          <TouchableOpacity style={styles.botao} onPress = {() => navigation.navigate('Dia2')} >
            
            <Text style={styles.textoBotao}>24</Text>

          </TouchableOpacity>



          <TouchableOpacity style={styles.botao} onPress = {() => navigation.navigate('Dia3')} >
            
            <Text style={styles.textoBotao}>25</Text>

          </TouchableOpacity>



          <TouchableOpacity style={styles.botao} onPress = {() => navigation.navigate('Dia4')} >
            
            <Text style={styles.textoBotao}>26</Text>

          </TouchableOpacity>



          <TouchableOpacity style={styles.botao} onPress = {() => navigation.navigate('Dia5')} >
            
            <Text style={styles.textoBotao}>27</Text>

          </TouchableOpacity>

        </View>


        <View style={styles.tabela}>

          <FlatList 

            data = {DATA}

            renderItem = { ({item}) =>  < Palestra data = { item } navigation = {navigation} /> }


          />


        </View>

    </View>







  
        
    
      


  );
}

Dia2.navigationOptions = ({ navigation }) => ({
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
    borderRadius: screenWidth*0.05,
    backgroundColor: colors.tertiary,
    height: screenHeight*0.06,
    width: screenWidth*0.1

  },

  textoBotao:{
    color: colors.secondary,
    fontFamily: fonts.bold,
    fontSize: screenWidth*0.039
  },

  tabela:{
    marginTop: screenHeight*0.04,
    alignSelf: 'center',
    //width: screenWidth*0.93,
    width: screenWidth,
    height: screenHeight*0.684,
    backgroundColor: colors.secondary,
    borderRadius: screenHeight*0.02
    
  },
}
);