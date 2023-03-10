import Axios from 'axios';
const API_URL = 'https://api.punkapi.com/v2/';
export const apiCall = async () =>{
    const res = await Axios.get(API_URL+'beers?page=1&per_page=10&brewed_before=10-2011').then(response=>response);
    return res;
};