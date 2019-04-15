import { AsyncStorage } from 'react-native';
import { create } from 'apisauce';

const api = create({
   baseUrl: 'http://localhost:3001',
});

api.addAsyncRequestTransform(request => async () => {
   const token = await AsyncStorage.getItem('@CodeApi: token');
   if(token)
   request.headers['Authorization'] = `Beaser ${token}`;
});

api.addResponseTransform(response => {
   if (!response.ok) throw response;
});

export default api;