import { create } from 'apisauce';

const api = create({
   baseUrl: 'http://localhost:3001',
});

api.addResponseTransform(response => {
   if (!response.ok) throw response;
});

export default api;