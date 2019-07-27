import axios from 'axios';

import zomatoConfig from '../apiKeys.json';

const config = { headers: { 'user-key': `${zomatoConfig.zomatoKeys.apiKey}` } };


const getZomatoLocations = () => axios.get('https://developers.zomato.com/api/v2.1/search?entity_id=1138&entity_type=city&start=0&radius=2000&cuisines=997%2C73&sort=rating&order=desc', config);
const getZomatoLocationsTwo = () => axios.get('https://developers.zomato.com/api/v2.1/search?entity_id=1138&entity_type=city&start=20&radius=2000&cuisines=997%2C73&sort=rating&order=desc', config);
const getZomatoLocationsThree = () => axios.get('https://developers.zomato.com/api/v2.1/search?entity_id=1138&entity_type=city&start=40&radius=2000&cuisines=997%2C73&sort=rating&order=desc', config);
const getZomatoLocationsFour = () => axios.get('https://developers.zomato.com/api/v2.1/search?entity_id=1138&entity_type=city&start=60&radius=2000&cuisines=997%2C73&sort=rating&order=desc', config);
const getZomatoLocationsFive = () => axios.get('https://developers.zomato.com/api/v2.1/search?entity_id=1138&entity_type=city&start=80&radius=2000&cuisines=997%2C73&sort=rating&order=desc', config);


export default {
  getZomatoLocations,
  getZomatoLocationsTwo,
  getZomatoLocationsThree,
  getZomatoLocationsFour,
  getZomatoLocationsFive,
};
