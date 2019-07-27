import axios from 'axios';

import zomatoConfig from '../apiKeys.json';

const config = { headers: { 'user-key': `${zomatoConfig.zomatoKeys.apiKey}` } };


const getZomatoLocations = () => axios.get('https://developers.zomato.com/api/v2.1/search?entity_id=1138&entity_type=city&q=Taco&start=0&radius=3000', config);
const getZomatoLocationsTwo = () => axios.get('https://developers.zomato.com/api/v2.1/search?entity_id=1138&entity_type=city&q=Taco&start=20&radius=3000', config);
const getZomatoLocationsThree = () => axios.get('https://developers.zomato.com/api/v2.1/search?entity_id=1138&entity_type=city&q=Taco&start=40&radius=3000', config);
const getZomatoLocationsFour = () => axios.get('https://developers.zomato.com/api/v2.1/search?entity_id=1138&entity_type=city&q=Taco&start=60&radius=3000', config);
const getZomatoLocationsFive = () => axios.get('https://developers.zomato.com/api/v2.1/search?entity_id=1138&entity_type=city&q=Taco&start=80&radius=3000', config);


export default {
  getZomatoLocations,
  getZomatoLocationsTwo,
  getZomatoLocationsThree,
  getZomatoLocationsFour,
  getZomatoLocationsFive,
};
