import axios from 'axios';

const api = axios.create({
    baseURL: 'https://deltacorp.co.ao/wp-json/wc/v3',
    auth:{
        username: 'ck_82598ce206e6b9c1fc203a8b66cc5cd0d86b98a6',
        password: 'cs_0fed7978ae595b800f7ed50b100c42d23d23ab91'
    }
});

export default api;