
import api from '../services/api'

async function loadColors(){

    try{
        const response = await api.get('/cores/');
        console.log(response.data)

    } catch{
        console.log('Não foi possível carregar as cores')
    }
};

async function getData() {
    const response = await api.get('/cores/')
    
    return await response.data.primaria;
  }
  
  (async () => {
    console.log(await getData())
  })()

export default {
    //#ffffff
    primary: '#FFFFFF',
    //#FFFFFF
    secondary: '#ff9e38',
    //#F4893B
    tertiary: '#56e8b8',
    //#C0C0C0
    dark_tertiary: '#00b588', 
    text_color: 'black',
    //#00b588
    quaternary: '#f2f2f2' 
}