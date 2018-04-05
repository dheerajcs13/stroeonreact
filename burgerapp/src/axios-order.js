import axios from 'axios';

const inst = axios.create({
  baseURL: 'https://burger-app-fc908.firebaseio.com/'
})

export default inst;
