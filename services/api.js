import AsyncStorage from '@react-native-community/async-storage';
import { create } from 'apisauce';

const api = create({
    baseURL: 'http://67.205.161.203:8000'
});

api.addAsyncRequestTransform(request => async() => {

    const token = await AsyncStorage.getItem('@storage_Key');

    if (token)
        request.headers['Authorization'] = `Token ${token}`;

});

api.addResponseTransform(response => {
    if (!response.ok) throw response;
});

export default api;