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

import Icon from 'react-native-vector-icons/MaterialIcons';
Icon.loadFont();


import Dimensoes, { screenWidth, screenHeight } from '../Dimensoes/Dimensoes';

import fonts from '../styles/fonts';

//novo
import api from '../services/api'
import Error from './Error'
import { stringify } from 'querystring';

//Redux
import { useSelector } from 'react-redux';
import BackHeader from './BackHeader';
//Redux


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

    //Redux
    //permite que usarmos os estados que está armazenado na store
    const colorsList = useSelector(state => state.data);
    //Redux


    //novo

    const [errorMessage, seterror] = useState(null);

    const [favorito, set_favorito] = useState(null);

    const [loading, setLoading] = useState(true)


    const [icon, setIcon] = useState('')


    async function verifica_se_e_favorita(palestra){

        const response = await api.get('/verfavoritos/');

        const lista_favoritos = response.data


        if((lista_favoritos.some(({id}) => id === palestra.id))){

            setIcon("favorite")

            set_favorito(true)

            setLoading(false)

        }

        else{

            setIcon("favorite-border")

            set_favorito(false)

            setLoading(false)

        }
    };

    async function favoritar_palestra(id){

        try {


            if(favorito){

                setIcon('favorite-border')
                set_favorito(false)

            }

            else{

                setIcon('favorite')
                set_favorito(true)

            }
    
            const response = await api.get(`/favoritar/${id}/`);

            await console.log(response.data.message)

        } catch(err) {
      
            seterror( 'Não foi possível favoritar a palestra' );
     
        }
      
    }

        useEffect( () => {

            verifica_se_e_favorita(navigation.state.params.data)

          }, )

    


    return(
        
        <ScrollView style={{backgroundColor: colorsList.primaria, flex: 1}}>

            { !!errorMessage && <Error errorMessage={errorMessage}/> }


            <View style={{padding: screenWidth*0.05}}>


                <View style={styles.titulo}>


                    <Text style={[styles.textoTitulo, {color: colorsList.secundaria}]}> { navigation.state.params.data.tema } </Text>
                    

                </View>


                <View style={styles.informacoesPalestrante}>

                    <View style={{justifyContent: "center"}}>

                        <Image  style={styles.fotoPalestrante}
                                source={{ uri: `http://67.205.161.203:8000${navigation.state.params.data.foto_palestrante}` }}/>


                    </View>


                    <View style={styles.descricaoCompletaPalestrante}>

                        <Text> 
                            
                            <Text style={[styles.textoPrincipal, {color: colorsList.dark_terciaria}]}>Palestrante:</Text> <Text style={[styles.texto, {color: colorsList.texto}]}> { navigation.state.params.data.palestrante } </Text> 

                        </Text>

                        <Text style={{textAlign: 'justify'}}>

                            <Text style={[styles.textoPrincipal, {color: colorsList.dark_terciaria}]}>Quem sou?</Text> <Text style={[styles.texto, {color: colorsList.texto}]}> { navigation.state.params.data.descricao_palestrante } </Text>

                        </Text>


                    </View>


                </View>


                <View style={{marginTop: screenHeight*0.06, marginHorizontal: screenWidth*0.01}}>


                    
                    <View>

                        <Text style={[styles.textoPrincipal, {color: colorsList.dark_terciaria}]}>Sobre o que é a Palestra?</Text> 

                    </View>

                    <View>

                        <Text style={[styles.texto, {color: colorsList.texto}]}> { navigation.state.params.data.descricao_palestra }. </Text>

                    </View>


                    


                </View>

                
                <View style={{marginTop: screenHeight*0.06}}>

                    <Text>
                    
                        <Text style={[styles.textoPrincipal, {color: colorsList.dark_terciaria}]}>Dia:</Text> <Text style={[styles.texto, {color: colorsList.texto}]}> { navigation.state.params.data.dia } </Text>

                    </Text>

                    <Text>
                    
                        <Text style={[styles.textoPrincipal, {color: colorsList.dark_terciaria}]}>Horário:</Text> <Text style={[styles.texto, {color: colorsList.texto}]}> { navigation.state.params.data.inicio.slice(0,5) } às { navigation.state.params.data.termino.slice(0,5) } </Text>

                    </Text>

                    <Text>

                        <Text style={[styles.textoPrincipal, {color: colorsList.dark_terciaria}]}>Sala:</Text> <Text style={[styles.texto, {color: colorsList.texto}]}> { navigation.state.params.data.sala } </Text>

                    </Text>


                </View>


                <View style={{marginTop: screenHeight*0.06, flexDirection: "row", alignItems: "center"}}>

                    <TouchableOpacity style = {{width: screenWidth*0.1, height: screenWidth*0.09, alignItems: 'center', justifyContent: 'center'}} onPress = {() => favoritar_palestra(navigation.state.params.data.id) } >

                        { !(loading) ? <Icon name={icon} size={screenWidth*0.059} color = {colorsList.terciaria} /> : <Image source={require('../assets/LogoInfluencia.gif')} style={styles.imagefluxo} resizeMode='cover' regular /> }

                    </TouchableOpacity> 

                    <View> 

                        <Text style={[styles.texto, {color: colorsList.texto}]}>Adicionar aos Favoritos </Text>
                        
                    </View>    

                </View>



            </View>





            









        </ScrollView>
    )
}

Informacoes.navigationOptions = ({ navigation }) => ({
    header:(
        <BackHeader navigation={navigation}/>
    )
  });


const styles = StyleSheet.create({

    header:{
        flexDirection: 'row',
        alignItems: 'center',
        ...Platform.select({
            ios: {
                height: screenHeight*0.1,
            },
            android: {
                height: screenHeight*0.07,
            },      
          }),
    },

    titulo: {
        alignItems: 'center',
        
    },

    textoTitulo: {
        fontSize: screenHeight*0.04,
        fontFamily: fonts.bold,
        textAlign: 'center'
        
    },

    informacoesPalestrante:{
        paddingRight: screenWidth*0.05,
        marginTop: screenHeight*0.04,
        flexDirection: "row",
        alignItems: "center",


    },

    fotoPalestrante: {
        borderRadius: screenWidth*0.15,
        width: screenWidth*0.3,
        height: screenWidth*0.3,

    },

    texto:{
        fontSize: screenWidth*0.04,
        fontFamily: fonts.regular,
        textAlign: "justify"

    },

    textoPrincipal:{
        fontSize: screenWidth*0.045,
        fontFamily: fonts.bold

    },

    descricaoCompletaPalestrante: {
        marginLeft: screenWidth*0.028,
        marginRight: screenWidth*0.25,
    },

    imagefluxo: {
        width: screenWidth * 0.075, 
        height: screenHeight * 0.04,
    },

    }
)
  