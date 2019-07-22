import axios from 'axios';
import firebaseConfig from '../apiKeys.json';

const fbUrl = firebaseConfig.firebaseKeys.databaseURL;

const getReviews = tacoId => new Promise((resolve, reject) => {
  axios.get(`${fbUrl}/reviews.json?orderBy="tacoId"&equalTo="${tacoId}"`)
    .then((res) => {
      const reviews = [];
      Object.keys(res.data).forEach((fbKey) => {
        res.data[fbKey].id = fbKey;
        reviews.push(res.data[fbKey]);
      });
      resolve(reviews);
    })
    .catch(err => reject(err));
});
export default { getReviews };
