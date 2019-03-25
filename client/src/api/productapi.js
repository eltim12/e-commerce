import axios from 'axios';

export default axios.create({

baseURL: 'https://dotapi-production.herokuapp.com/heroes',
});

