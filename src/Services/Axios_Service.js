import axios from 'axios';

export default class AxiosService {
    post = (url, data, isHeaderRequired = false) => {
        return axios.post(url, data, isHeaderRequired)
    }
    get = (url, isHeaderRequired = false) => {
        return axios.get(url, isHeaderRequired)
    }
    delete = (url, isHeaderRequired = false) => {
        return axios.delete(url, isHeaderRequired)

    }
    put = (url, data, isHeaderRequired = false) => {
        return axios.put(url, data, isHeaderRequired)
    }
}