import Axios from 'axios';
const API_URL = 'https://api.punkapi.com/v2/';


export const apiCall = async (text?: string, period?: string, yeast?:string, abvGt?:string, abvLt?:string, pageNumber=1)  =>{
    try{
    const res = await Axios.get(API_URL+`beers?page=${pageNumber}&per_page=20&${text}&${period}&${yeast}&${abvGt}&${abvLt}`).then(response=>response.data);
    return res;
}
    catch (error: any){
        console.log(error.response);
        return error.response;
    }
};