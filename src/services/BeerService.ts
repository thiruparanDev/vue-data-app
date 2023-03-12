import Axios from 'axios';
const API_URL = 'https://api.punkapi.com/v2/';

export const apiCall = async (text?: string, period?: string, yeast?:string, abvGt?:string, pageNumber=1)  =>{
    // const text="beer_name=a";
    console.log(API_URL+`beers?page=1&per_page=10&${text}&${period}&${yeast}&${abvGt}`);
    const res = await Axios.get(API_URL+`beers?page=${pageNumber}&per_page=10&${text}&${period}&${yeast}&${abvGt}`).then(response=>response.data);
    return res;
};