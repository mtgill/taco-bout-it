import axios from 'axios';

import zomatoConfig from '../apiKeys.json';


const config = { headers: { 'user-key': `${zomatoConfig.zomatoKeys.apiKey}` } };

const offsetValues = [0, 20];


const getZomatoLocations = () => new Promise((resolve, reject) => {
  const zLocs = [];
  offsetValues.forEach((value) => {
    axios.get(`https://developers.zomato.com/api/v2.1/search?entity_id=1138&entity_type=city&start=${value}&cuisines=997%2C73&establishment_type=285%2C282&category=9%2C10&sort=cost&order=asc`, config)
      .then((res) => {
        console.error('zomato data', res);
        (res.data.restaurants).forEach((restaurant) => {
          zLocs.push(restaurant.restaurant);
        });
        resolve(zLocs);
      })
      .catch(err => reject(err));
  });
});

export default {
  getZomatoLocations,
};
