import {AsyncStorage} from 'react-native';

export async function _SignIn (token) {
    try {
        await AsyncStorage.setItem("token", token);
    } catch(erro) {
        console.log(erro)
    }
}

export async function _OnSignedIn (key) {
    try {
        let response = await AsyncStorage.getItem(key)
        if(response !== null) {
          return false;
        }
        if(response == null){
            return false;
        }
      } catch(e) {
        // error reading value
      }
    }

   // let response = await AsyncStorage.getItem(key);
   // return response;
