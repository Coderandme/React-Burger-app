import axios from 'axios';

const instance= axios.create({

    baseURL: 'https://burger-builder-59e80.firebaseio.com/'

});

export default instance;
