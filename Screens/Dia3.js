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
  Header,
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

import Icon from 'react-native-vector-icons/FontAwesome';





const DATA = 

    [
      {
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


export default function Dia3({ navigation }){
  return(

    <View style={{flex: 1, backgroundColor: '#222222'}}>
        
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

            keyExtractor = { (item, index ) => index }

            />


        </View>

    </View>







  
        
    
      


  );
}

Dia3.navigationOptions = ({ navigation }) => ({
  header: ( /* Your custom header */
    <View style={styles.header} >

      <View style={{width: 30}}>

        <Icon name="bars" size={25} color="white" onPress={() => navigation.openDrawer()} />

      </View>


      <View style={{marginLeft: screenWidth*0.08}}>
        
        <Text style={styles.textoHeader}>SEMANA FLUXO</Text>

      </View>

      <Image style={styles.logofluxo}
        source = {require('../Assets/FluxoSemFundo.png') } />

    
    
    </View>

  )
})

/*const AppDrawerNavigator = createDrawerNavigator({
  Home: HomeScreen,
  Settings: SettingsScreen
})*/


/*const MainDrawer = createDrawerNavigator({
  MainTabs: MainTabs,
  Settings: SettingsStack,
});*/


const styles = StyleSheet.create({

  header:{
      flexDirection: 'row',
      alignItems: 'center',
      height: screenHeight*0.1,
      backgroundColor: '#F4893B',
      borderBottomWidth: screenHeight*0.01,
      borderBottomColor: "#C0C0C0",
      justifyContent: "space-between",
      padding: 20

      
  },

  textoHeader:{
    fontSize: screenHeight*0.03,
    fontFamily: "Gelasio-Bold"

    
  },

  logofluxo:{
    borderRadius:5,
    width: 65,
    height: 65,

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
    backgroundColor: '#F4893B',
    height: screenHeight*0.06,
    width: screenWidth*0.1

  },

  textoBotao:{
    color: 'white',
    fontFamily: "Gelasio-Bold"
  },

  tabela:{
    marginTop: screenHeight*0.04,
    alignSelf: 'center',
    width: screenWidth*0.93,
    height: screenHeight*0.684,
    backgroundColor: 'white',
    borderRadius: screenHeight*0.02
    
    //borderRadius: screenWidth*0.03,
    //borderWidth: screenWidth*0.002,
    //borderColor: "#C0C0C0",
    
    
    
    



  },

  horarios:{
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    borderRightWidth: screenWidth*0.002,
    borderRightColor: "white", 
    marginRight: screenWidth*0.58,

  },

  horario:{
    alignItems: 'center', 
    justifyContent: 'center', 
    height: screenHeight*0.08, 
    borderBottomWidth: screenWidth*0.002, 
    borderBottomColor: 'white'
    

  },

  textoHorario:{
    color: 'white',



  },




  footer:{
    height: screenHeight*0.1,
    backgroundColor: 'white'
  },

  container:{
    
  }

}

);
