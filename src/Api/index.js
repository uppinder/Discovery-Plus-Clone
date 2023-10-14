import axios from 'axios';

const discoveryPlusApi = axios.create({
  baseURL: 'https://discovery-plus-clone-backend.onrender.com/',
});

// const discoveryPlusApi = axios.create({
//     baseURL: 'http://localhost:9000',
//   });

export default discoveryPlusApi;
