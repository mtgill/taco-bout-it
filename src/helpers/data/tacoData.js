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

export default { getTacos };
