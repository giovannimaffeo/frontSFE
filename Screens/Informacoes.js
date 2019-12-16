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

import { useState } from 'react';

import { createAppContainer, } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Icon from 'react-native-vector-icons/FontAwesome';

import Dimensoes, { screenWidth, screenHeight } from '../Dimensoes/Dimensoes';

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

    const favorito = DATA[0].favorito

    function escolhe_cor_inicial(favorito){

        if(favorito == "False"){
            return "#FFF"
        }

        else{
            return "#F4893B"
        }

    }

    const [color, setColor] = useState(escolhe_cor_inicial(favorito));

    
    function muda_cor(color){

        if (color == "#FFF"){
            setColor('#F4893B')
            DATA[0].favorito = "True"
        }

        else{
            setColor("#FFF")
            DATA[0].favorito = "False"
        }
    }
    


    return(
        
        <ScrollView style={{backgroundColor: '#222222', flex: 1}}>

            <View style={{padding: screenWidth*0.05}}>


                <View style={styles.titulo}>


                    <Text style={styles.textoTitulo}> {DATA[0].tema} </Text>
                    

                </View>


                <View style={styles.informacoesPalestrante}>

                    <View style={{justifyContent: "center"}}>


                        <Image  style={styles.fotoPalestrante}
                                source={{ uri: DATA[0].foto_palestrante}}/>


                    </View>


                    <View style={styles.descricaoCompletaPalestrante}>

                        <Text> 
                            
                            <Text style={styles.textoPrincipal}>Palestrante:</Text> <Text style={styles.texto}> {DATA[0].palestrante} </Text> 

                        </Text>

                        <Text>

                            <Text style={styles.textoPrincipal}>Quem sou?</Text> <Text style={styles.texto}> {DATA[0].descricao_palestrante} </Text>

                        </Text>


                    </View>


                </View>


                <View style={{marginTop: screenHeight*0.06, marginHorizontal: screenWidth*0.01}}>


                    
                    <View>

                        <Text style={styles.textoPrincipal}>Sobre o que é a Palestra?</Text> 

                    </View>

                    <View>

                        <Text style={styles.texto}> {DATA[0].descricao_palestra}. </Text>

                    </View>


                    


                </View>

                
                <View style={{marginTop: screenHeight*0.06}}>

                    <Text>
                    
                        <Text style={styles.textoPrincipal}>Dia:</Text> <Text style={styles.texto}> {DATA[0].dia} </Text>

                    </Text>

                    <Text>
                    
                        <Text style={styles.textoPrincipal}>Horário:</Text> <Text style={styles.texto}> {DATA[0].horario} </Text>

                    </Text>

                    <Text>

                        <Text style={styles.textoPrincipal}>Sala:</Text> <Text style={styles.texto}> {DATA[0].sala} </Text>

                    </Text>


                </View>


                <View style={{marginTop: screenHeight*0.06, flexDirection: "row", alignItems: "center"}}>

                    <TouchableOpacity onPress = {() => muda_cor(color) } >

                        <Icon name="heart" size={20} color = {color} />

                    </TouchableOpacity>

                    <Text style={styles.texto}>   Adicionar aos Favoritos </Text>
                        
                </View>



            </View>





            









        </ScrollView>
    )
}

Informacoes.navigationOptions = ({ navigation }) => ({
    header: ( 

      <View style={styles.header} >

        <TouchableOpacity style={{marginLeft: screenWidth*0.03}} onPress={() => navigation.goBack()}>

            <Icon name="chevron-left" size={20} color = "white" />

        </TouchableOpacity>

        
  
  
      </View>
    )
  })

const styles = StyleSheet.create({

    header:{
        flexDirection: 'row',
        alignItems: 'center',
        height: screenHeight*0.07,
        backgroundColor: '#F4893B',
        
  
        
    },

    titulo: {
        alignItems: 'center',
        
    },

    textoTitulo: {
        fontSize: screenHeight*0.04,
        color: 'white',
        fontFamily: "Gelasio-Bold"
        
    },

    informacoesPalestrante:{
        paddingRight: screenWidth*0.05,
        marginTop: screenHeight*0.04,
        flexDirection: "row",
        alignItems: "center"


    },

    fotoPalestrante: {
        borderRadius:60,
        width: 120,
        height: 120,

    },

    texto:{
        color: "white",
        fontSize: 16,
        fontFamily: "Gelasio-Regular",
        textAlign: "justify"

    },

    textoPrincipal:{
        color: '#F4893B',
        fontSize: 18,
        fontFamily: "Gelasio-Bold"

    },

    descricaoCompletaPalestrante: {
        marginLeft: screenWidth*0.028,
        marginRight: screenWidth*0.25,
    },

    }
)
  