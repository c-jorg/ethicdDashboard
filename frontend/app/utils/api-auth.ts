import axios from 'axios';

const instance = axios.create();
//list of routes that dont need jwt auth token
const EXEMPT_PATHS = [
'/api/flask/auth/login-student',
'/api/flask/auth/register-student',
'/api/flask/auth/register-guest',
'/api/flask/ping',
'/api/flask/auth/validate-token'
];

instance.interceptors.request.use(config => {
    const token = localStorage.getItem('access_token');
    if (token && config.url && !EXEMPT_PATHS.some(path => config.url!.startsWith(path))){
        config.headers = config.headers || {};
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
});
export default instance;