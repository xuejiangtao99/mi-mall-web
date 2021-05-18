import http from './../util/http';


export default {
    getListApi(url, params) {

        return http.get(url, params)
    },

    postFormApi(url, params) {

        return http.post(url, params)
    },

    put(url, params) {

        return http.put(url, params)
    },

    delete(url, params) {

        return http.put(url, params)
    }

}