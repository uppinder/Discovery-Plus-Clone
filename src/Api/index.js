import axios from 'axios';

const discoveryPlusApi = axios.create({
  baseURL: 'http://localhost:9000',
});

export default discoveryPlusApi;
