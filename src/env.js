let baseURL;

switch (process.env.NODE_ENV) {

    case 'development':
        baseURL = 'http://127.0.0.1:8088/api/'
        break;
    case 'production':
        baseURL = 'www.xjt.mi.com:8008/api/'
        break;
    default :
        baseURL = 'www.xjt.mi.com:8008/api/'
        break;
}

export default baseURL;