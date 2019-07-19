import axios from 'axios';
import firebaseConfig from '../apiKeys.json';

const fbUrl = firebaseConfig.firebaseKeys.databaseURL;

const getLocations = () => new Promise((resolve, reject) => {
  axios.get(`${fbUrl}/locations.json`)
    .then((res) => {
      const locations = [];
      Object.keys(res.data).forEach((fbKey) => {
        res.data[fbKey].id = fbKey;
        locations.push(res.data[fbKey]);
      });
      resolve(locations);
    })
    .catch(err => reject(err));
});

export default { getLocations };
