
import api from '../services/api';
import store from '../redux/store';

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

const state = store.getState();

export default {
    //#ffffff
    primary: state.data.primaria,
    //#FFFFFF
    secondary: state.data.secundaria,
    //#F4893B
    tertiary: 'pink',
    //#C0C0C0
    dark_tertiary: 'pink', 
    text_color: 'pink',
    //#00b588
    quaternary: 'pink' 
}