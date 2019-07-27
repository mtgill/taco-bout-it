import axios from 'axios';

import zomatoConfig from '../apiKeys.json';

const config = { headers: { 'user-key': `${zomatoConfig.zomatoKeys.apiKey}` } };


const getZomatoLocations = () => axios.get('https://developers.zomato.com/api/v2.1/search?entity_id=1138&entity_type=city&q=Taco', config);


// const getZomatoLocations = () => new Promise((resolve, reject) => {
//   axios.get('https://developers.zomato.com/api/v2.1/search?entity_id=1138&entity_type=city&q=Taco', config)
//     .then((res) => {
//       const zomLocs = [];
//       res.data.forEach((restaurant) => {
//         zomLocs.push(restaurant.name);
//       });
//       resolve(zomLocs);
//     })
//     .catch(err => reject(err));
// });


export default { getZomatoLocations };
