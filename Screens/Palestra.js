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
  TouchableWithoutFeedback
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { createAppContainer, } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';


import Dimensoes, { screenWidth, screenHeight } from '../Dimensoes/Dimensoes';

import fonts from '../styles/fonts';


//Redux
import { useSelector } from 'react-redux';
//Redux





export default function Palestra( props ){
  
  //Redux
  //permite que usarmos os estados que está armazenado na store
  const colorsList = useSelector(state => state.data);
  //Redux

  const data = props.data

  const index = props.index

  const lastindex = props.lastindex

  const length = props.length


  if(length == 1){

    return(

      <TouchableWithoutFeedback>
      <View style={[styles.background, {borderColor: colorsList.terciaria}]}>

      <TouchableOpacity style={styles.container_length_igual_1} onPress = {() => props.navigation.navigate('Informacoes', { data } )} >
        
          
          <View style={[styles.containerImagem, {borderColor: colorsList.primaria}]}>

              <Image  style={styles.fotoPalestrante}
              source={{ uri: `http://67.205.161.203:8000${props.data.foto_palestrante}`}}/>

          </View>

          <View style={styles.programacao} onPress = {() => props.navigation.navigate('Informacoes')}>

                  <View>

                    {(props.favorite) ? <View style={{width: screenWidth*0.68, alignItems: 'flex-end', height: screenWidth*0.05}}>
                      <Text style={{color: colorsList.dark_terciaria, fontFamily: fonts.regular, fontSize: screenWidth*0.032}}>{props.data.dia}</Text>
                    </View> : null}

                    <View>

                      <Text>

                        <Text style={[styles.texto_padrao, {color: colorsList.secundaria}]}>Tema:</Text> <Text style={[styles.texto_variavel, {color: colorsList.texto}]}>{props.data.tema.length > 26 ? `${props.data.tema.slice(0,24)}...` : props.data.tema}</Text>

                      </Text>

                    </View>


                    <View>

                      <Text>

                        <Text style={[styles.texto_padrao, {color: colorsList.secundaria}]}>Palestrante: </Text> <Text style={[styles.texto_variavel, {color: colorsList.texto}]}>{props.data.palestrante.length > 20 ? `${props.data.palestrante.slice(0,16)}...` : props.data.palestrante}</Text>

                      </Text>

                    </View>

                    <View style={{marginLeft: screenWidth*0.3}}>

                      <Text style={[styles.horario, {color: colorsList.dark_terciaria}]}>{props.data.inicio.slice(0,5)} até {props.data.termino.slice(0,5)}</Text>

                    </View>
                    

                  
                  </View>


          </View>

      </TouchableOpacity >
      </View>

      </TouchableWithoutFeedback>

    );
  }

  if (index == 0){

    return(

      <View style={[styles.background, {borderColor: colorsList.terciaria}]}>
      <TouchableOpacity style={styles.container_index_0} onPress = {() => props.navigation.navigate('Informacoes', { data } )} >

        
        <View style={[styles.containerImagem, {borderColor: colorsList.primaria}]}>

            <Image  style={styles.fotoPalestrante}
            source={{ uri: `http://67.205.161.203:8000${props.data.foto_palestrante}`}}/>

        </View>

        <View style={styles.programacao} onPress = {() => props.navigation.navigate('Informacoes')}>

                <View>

                  {(props.favorite) ? <View style={{width: screenWidth*0.68, alignItems: 'flex-end', height: screenWidth*0.05}}>
                    <Text style={{color: colorsList.dark_terciaria, fontFamily: fonts.regular,fontSize: screenWidth*0.032}}>{props.data.dia}</Text>
                  </View> : null}

                  <View>

                    <Text>

                      <Text style={[styles.texto_padrao, {color: colorsList.secundaria}]}>Tema:</Text> <Text style={[styles.texto_variavel, {color: colorsList.texto}]}>{props.data.tema.length > 26 ? `${props.data.tema.slice(0,24)}...` : props.data.tema}</Text>

                    </Text>

                  </View>


                  <View>

                    <Text>

                    <Text style={[styles.texto_padrao, {color: colorsList.secundaria}]}>Palestrante:</Text> <Text style={[styles.texto_variavel, {color: colorsList.texto}]}>{props.data.palestrante.length > 20 ? `${props.data.palestrante.slice(0,16)}...` : props.data.palestrante}</Text>

                    </Text>

                  </View>

                  <View style={{marginLeft: screenWidth*0.3}}>

                    <Text style={[styles.horario, {color: colorsList.dark_terciaria}]}>{props.data.inicio.slice(0,5)} até {props.data.termino.slice(0,5)}</Text>

                  </View>
                  

                
                </View>


        </View>

    </TouchableOpacity >
    </View>
  )
}

  
if(index == lastindex){

  return(

    <View style={[styles.background, {borderColor: colorsList.terciaria}]}>
    <TouchableOpacity style={styles.container_index_menos1} onPress = {() => props.navigation.navigate('Informacoes', { data } )} >
        
        <View style={[styles.containerImagem, {borderColor: colorsList.primaria}]}>

            <Image  style={styles.fotoPalestrante}
            source={{ uri: `http://67.205.161.203:8000${props.data.foto_palestrante}`}}/>

        </View>

        <View style={styles.programacao} onPress = {() => props.navigation.navigate('Informacoes')}>

                <View>

                  {(props.favorite) ? <View style={{width: screenWidth*0.68, alignItems: 'flex-end', height: screenWidth*0.05}}>
                    <Text style={{color: colorsList.dark_terciaria, fontFamily: fonts.regular,fontSize: screenWidth*0.032}}>{props.data.dia}</Text>
                  </View> : null}

                  <View>

                    <Text>

                      <Text style={[styles.texto_padrao, {color: colorsList.secundaria}]}>Tema:</Text> <Text style={[styles.texto_variavel, {color: colorsList.texto}]}>{props.data.tema.length > 26 ? `${props.data.tema.slice(0,24)}...` : props.data.tema}</Text>

                    </Text>

                  </View>


                  <View>

                    <Text>

                      <Text style={[styles.texto_padrao, {color: colorsList.secundaria}]}>Palestrante: </Text> <Text style={[styles.texto_variavel, {color: colorsList.texto}]}>{props.data.palestrante.length > 20 ? `${props.data.palestrante.slice(0,16)}...` : props.data.palestrante}</Text>

                    </Text>

                  </View>

                  <View style={{marginLeft: screenWidth*0.3}}>

                    <Text style={[styles.horario, {color: colorsList.dark_terciaria}]}>{props.data.inicio.slice(0,5)} até {props.data.termino.slice(0,5)}</Text>

                  </View>
                  

                
                </View>


        </View>

    </TouchableOpacity >
    </View>

  );
}

else{

  return(

    <View style={[styles.background, {borderColor: colorsList.terciaria}]}>

    <TouchableOpacity style={styles.container} onPress = {() => props.navigation.navigate('Informacoes', { data } )} >
        
        <View style={[styles.containerImagem, {borderColor: colorsList.primaria}]}>

            <Image  style={styles.fotoPalestrante}
            source={{ uri: `http://67.205.161.203:8000${props.data.foto_palestrante}`}}/>

        </View>

        <View style={styles.programacao} onPress = {() => props.navigation.navigate('Informacoes')}>

                <View>

                  {(props.favorite) ? <View style={{width: screenWidth*0.68, alignItems: 'flex-end', height: screenWidth*0.05}}>
                    <Text style={{color: colorsList.dark_terciaria, fontFamily: fonts.regular,fontSize: screenWidth*0.032}}>{props.data.dia}</Text>
                  </View> : null}

                  <View>

                    <Text>

                      <Text style={[styles.texto_padrao, {color: colorsList.secundaria}]}>Tema:</Text> <Text style={[styles.texto_variavel, {color: colorsList.texto}]}>{props.data.tema.length > 26 ? `${props.data.tema.slice(0,24)}...` : props.data.tema}</Text>

                    </Text>

                  </View>


                  <View>

                    <Text>

                      <Text style={[styles.texto_padrao, {color: colorsList.secundaria}]}>Palestrante: </Text> <Text style={[styles.texto_variavel, {color: colorsList.texto}]}>{props.data.palestrante.length > 20 ? `${props.data.palestrante.slice(0,16)}...` : props.data.palestrante}</Text>

                    </Text>

                  </View>

                  <View style={{marginLeft: screenWidth*0.3}}>

                    <Text style={[styles.horario, {color: colorsList.dark_terciaria}]}>{props.data.inicio.slice(0,5)} até {props.data.termino.slice(0,5)}</Text>

                  </View>
                  

                
                </View>


        </View>

    </TouchableOpacity >
    </View>
  );
}
}
const styles = StyleSheet.create({ //d9d9d9

  container_index_0:{
    flexDirection: 'row',
    height: screenHeight*0.137,
    borderRadius: screenWidth*0.03, 
    width: screenWidth*0.98,
    alignSelf: "center",
    marginBottom: screenHeight*0.005,
    marginTop: screenHeight*0.005,
    // borderBottomWidth: screenHeight*0.003,
    // borderTopStartRadius: screenWidth*0.05,
    // borderTopEndRadius: screenWidth*0.05,

  },

  container_index_menos1:{
    flexDirection: 'row',
    height: screenHeight*0.137,
    borderRadius: screenWidth*0.03, 
    width: screenWidth*0.98,
    alignSelf: "center",
    marginBottom: screenHeight*0.005,
    marginTop: screenHeight*0.005,
    // borderBottomStartRadius: screenWidth*0.05,
    // borderBottomEndRadius: screenWidth*0.05,
  },

  container_length_igual_1:{
    flexDirection: 'row',
    height: screenHeight*0.137,

   // borderRadius: screenWidth*0.05,

    borderRadius: screenWidth*0.03, 
    width: screenWidth*0.98,
    alignSelf: "center",
    marginBottom: screenHeight*0.005,
    marginTop: screenHeight*0.005,

  },

  container:{
    flexDirection: 'row',
    height: screenHeight*0.137,

    // borderBottomWidth: screenHeight*0.003,

    borderRadius: screenWidth*0.03, 
    width: screenWidth*0.98,
    alignSelf: "center",
    marginBottom: screenHeight*0.005,
    marginTop: screenHeight*0.005,

    
  },

  containerImagem:{
    width: screenWidth*0.25,
    alignItems: 'center',
    justifyContent: 'center',
  },

  fotoPalestrante: {
    borderRadius: screenWidth*0.095,
    width: screenWidth*0.19,  
    height: screenWidth*0.19, 
    
  },

  programacao:{
    alignItems: 'center',
    justifyContent: 'center',

  },

  texto_padrao:{
    fontFamily: fonts.bold,
    fontSize: screenHeight*0.023
  },

  texto_variavel:{
    fontFamily: fonts.semi_bold,
    fontSize: screenWidth*0.034

  },

  horario:{
    fontFamily: fonts.bold,
    fontSize: screenHeight*0.0215,
    
    

  },

  background:{
    borderWidth: screenWidth*0.005,
    marginTop: screenHeight*0.005,
    borderRadius: screenWidth*0.03,
    width: screenWidth*0.986,
    height: screenHeight*0.141,
    alignSelf: "center",
    justifyContent: "center"


  }



}
)

