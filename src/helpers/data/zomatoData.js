import axios from 'axios';

import zomatoConfig from '../apiKeys.json';

const config = { headers: { 'user-key': `${zomatoConfig.zomatoKeys.apiKey}` } };


const getZomatoLocations = () => axios.get('https://developers.zomato.com/api/v2.1/search?entity_id=1138&entity_type=city&start=0&cuisines=997%2C73&establishment_type=285%2C282&category=9%2C10&sort=cost&order=asc', config);
const getZomatoLocationsTwo = () => axios.get('https://developers.zomato.com/api/v2.1/search?entity_id=1138&entity_type=city&start=20&cuisines=997%2C73&establishment_type=285%2C282&category=9%2C10&sort=cost&order=asc', config);
const getZomatoLocationsThree = () => axios.get('https://developers.zomato.com/api/v2.1/search?entity_id=1138&entity_type=city&start=40&cuisines=997%2C73&establishment_type=285%2C282&category=9%2C10&sort=cost&order=asc', config);
const getZomatoLocationsFour = () => axios.get('https://developers.zomato.com/api/v2.1/search?entity_id=1138&entity_type=city&start=60&cuisines=997%2C73&establishment_type=285%2C282&category=9%2C10&sort=cost&order=asc', config);
const getZomatoLocationsFive = () => axios.get('https://developers.zomato.com/api/v2.1/search?entity_id=1138&entity_type=city&start=80&cuisines=997%2C73&establishment_type=285%2C282&category=9%2C10&sort=cost&order=asc', config);


export default {
  getZomatoLocations,
  getZomatoLocationsTwo,
  getZomatoLocationsThree,
  getZomatoLocationsFour,
  getZomatoLocationsFive,
};
