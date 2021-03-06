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

const getAllReviews = tacoId => new Promise((resolve, reject) => {
  axios.get(`${fbUrl}/reviews.json`)
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

const getSingleReview = reviewId => axios.get(`${fbUrl}/reviews/${reviewId}.json`);

const deleteReview = reviewId => axios.delete(`${fbUrl}/reviews/${reviewId}.json`);

const addReview = newReview => axios.post(`${fbUrl}/reviews.json`, newReview);

const updateReview = (updatedReview, reviewId) => axios.put(`${fbUrl}/reviews/${reviewId}.json`, updatedReview);

export default {
  getReviews,
  deleteReview,
  addReview,
  getAllReviews,
  getSingleReview,
  updateReview,
};
