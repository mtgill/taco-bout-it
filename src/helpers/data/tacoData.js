import axios from 'axios';
import firebaseConfig from '../apiKeys.json';

const fbUrl = firebaseConfig.firebaseKeys.databaseURL;

const getTacos = () => new Promise((resolve, reject) => {
  axios.get(`${fbUrl}/tacos.json`)
    .then((res) => {
      const tacos = [];
      Object.keys(res.data).forEach((fbKey) => {
        res.data[fbKey].id = fbKey;
        tacos.push(res.data[fbKey]);
      });
      resolve(tacos);
    })
    .catch(err => reject(err));
});

const getSingleTaco = tacoId => axios.get(`${fbUrl}/tacos/${tacoId}.json`);

const addTaco = newTaco => axios.post(`${fbUrl}/tacos.json`, newTaco);

export default { getTacos, getSingleTaco, addTaco };
