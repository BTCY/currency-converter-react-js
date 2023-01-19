import axios from 'axios';
import { getServerError } from './error-service';


const apikey = 'q11PIF3wrH0X1U9blJ2uYK8lr3mu9DwX';

// axios.interceptors.response.use(
//     response => response,
//     error => {
//         // const { status } = error.response;
//         throw error;
//     }
// );

axios.defaults.headers.common = {
    'apikey': apikey,
};


export const getConvert = (to: string, from: string, amount: number,) =>
    axios.get(
        `https://api.apilayer.com/exchangerates_data/convert`,
        { params: { to, from, amount } }
    )
        // axios.get<{ accessToken: string }>(`/api/${adminSlug}/country/${countryId}/pass-group`)
        .then((response: any) => {
            return response.data;
        })
        .catch((error) => {
            throw getServerError(error);
        });