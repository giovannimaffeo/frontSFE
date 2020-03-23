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
  CheckBox
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { useState, useEffect } from 'react';

import { createAppContainer, } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Icon from 'react-native-vector-icons/FontAwesome';
Icon.loadFont();


import Dimensoes, { screenWidth, screenHeight } from '../Dimensoes/Dimensoes';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

//novo
import api from '../services/api'
import Error from './Error'
import { stringify } from 'querystring';



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

    }

];


export default function Informacoes({ navigation }){

    


    //novo

    const [errorMessage, seterror] = useState(null);

    const [color, set_color ] = useState(null);

    const [favorito, set_favorito] = useState(null);


    async function verifica_se_e_favorita(palestra){

        const response = await api.get('/verfavoritos/');

        const lista_favoritos = response.data


        if((lista_favoritos.some(({id}) => id === palestra.id))){

            set_color(colors.tertiary)

            set_favorito(true)

        }

        else{
            
            set_color('#ffffff')

            set_favorito(false)

        }
    };

    async function favoritar_palestra(id){

        try {
    
            const response = await api.get(`/favoritar/${id}`);

            await console.log(response.data.message)

            if(favorito){

                set_color('#ffffff')
                set_favorito(false)

            }

            else{

                set_color(colors.tertiary)
                set_favorito(true)

            }
      

        } catch(err) {
      
            seterror( 'Não foi possível favoritar a palestra' );
     
        }
      
    }

        useEffect( () => {

            verifica_se_e_favorita(navigation.state.params.data)
            
          }, [])

    


    return(
        
        <ScrollView style={{backgroundColor: colors.primary, flex: 1}}>

            { !!errorMessage && <Error errorMessage={errorMessage}/> }


            <View style={{padding: screenWidth*0.05}}>


                <View style={styles.titulo}>


                    <Text style={styles.textoTitulo}> { navigation.state.params.data.tema } </Text>
                    

                </View>


                <View style={styles.informacoesPalestrante}>

                    <View style={{justifyContent: "center"}}>

                        <Image  style={styles.fotoPalestrante}
                                source={{ uri: `http://appsfe.herokuapp.com${navigation.state.params.data.foto_palestrante}` }}/>


                    </View>


                    <View style={styles.descricaoCompletaPalestrante}>

                        <Text> 
                            
                            <Text style={styles.textoPrincipal}>Palestrante:</Text> <Text style={styles.texto}> { navigation.state.params.data.palestrante } </Text> 

                        </Text>

                        <Text>

                            <Text style={styles.textoPrincipal}>Quem sou?</Text> <Text style={styles.texto}> { navigation.state.params.data.descricao_palestrante } </Text>

                        </Text>


                    </View>


                </View>


                <View style={{marginTop: screenHeight*0.06, marginHorizontal: screenWidth*0.01}}>


                    
                    <View>

                        <Text style={styles.textoPrincipal}>Sobre o que é a Palestra?</Text> 

                    </View>

                    <View>

                        <Text style={styles.texto}> { navigation.state.params.data.descricao_palestra }. </Text>

                    </View>


                    


                </View>

                
                <View style={{marginTop: screenHeight*0.06}}>

                    <Text>
                    
                        <Text style={styles.textoPrincipal}>Dia:</Text> <Text style={styles.texto}> { navigation.state.params.data.dia } </Text>

                    </Text>

                    <Text>
                    
                        <Text style={styles.textoPrincipal}>Horário:</Text> <Text style={styles.texto}> { navigation.state.params.data.inicio.slice(0,5) } às { navigation.state.params.data.termino.slice(0,5) } </Text>

                    </Text>

                    <Text>

                        <Text style={styles.textoPrincipal}>Sala:</Text> <Text style={styles.texto}> { navigation.state.params.data.sala } </Text>

                    </Text>


                </View>


                <View style={{marginTop: screenHeight*0.06, flexDirection: "row", alignItems: "center"}}>

                    <TouchableOpacity style = {{width: screenWidth*0.15, height: screenWidth*0.09, alignItems: 'center', justifyContent: 'center'}} onPress = {() => favoritar_palestra(navigation.state.params.data.id) } >

                        <Icon name="heart" size={screenWidth*0.05} color = {color} />

                    </TouchableOpacity>

                    <View>

                        <Text style={styles.texto}>Adicionar aos Favoritos </Text>
                        
                    </View>    

                </View>



            </View>





            









        </ScrollView>
    )
}

Informacoes.navigationOptions = ({ navigation }) => ({
    header: ( 

      <View style={styles.header} >

        <TouchableOpacity style={{width: screenWidth*0.18, height: screenWidth*0.18, alignItems: 'center', justifyContent: 'center'}} onPress={() => navigation.goBack()}>

            <Icon name="chevron-left" size={screenWidth*0.05} color = {colors.secondary} />

        </TouchableOpacity>

        
  
  
      </View>
    )
  })

const styles = StyleSheet.create({

    header:{
        flexDirection: 'row',
        alignItems: 'center',
        height: screenHeight*0.07,
        backgroundColor: colors.tertiary,
        
  
        
    },

    titulo: {
        alignItems: 'center',
        
    },

    textoTitulo: {
        fontSize: screenHeight*0.04,
        color: colors.secondary,
        fontFamily: fonts.bold
        
    },

    informacoesPalestrante:{
        paddingRight: screenWidth*0.05,
        marginTop: screenHeight*0.04,
        flexDirection: "row",
        alignItems: "center"


    },

    fotoPalestrante: {
        borderRadius: screenWidth*0.15,
        width: screenWidth*0.3,
        height: screenWidth*0.3,

    },

    texto:{
        color: 'white',
        fontSize: screenWidth*0.04,
        fontFamily: fonts.regular,
        textAlign: "justify"

    },

    textoPrincipal:{
        color: colors.tertiary,
        fontSize: screenWidth*0.045,
        fontFamily: fonts.bold

    },

    descricaoCompletaPalestrante: {
        marginLeft: screenWidth*0.028,
        marginRight: screenWidth*0.25,
    },

    }
)
  