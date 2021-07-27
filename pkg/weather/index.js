const fetch = require('node-fetch');
const config = require('../config');

const API_KEY = config.get('weather').api_key;
const API_PREFIX = `http://api.openweathermap.org/data/${config.get('weather').api_version}`

let cityCashe = {};

const forCity = async (city) =>{
    let currentTimestamp = new Date().getTime();
    if(cityCashe[city] && cityCashe[city].timestamp > currentTimestamp) { 
        return cityCashe[city].data
    }

    let result = await fetch(`${API_PREFIX}/weather?q=${city}&appid=${API_KEY}`);
    let data = await result.json();

    cityCashe[city] = {
        data: data,
        timestamp: new Date().getTime() + 60*1000
    }

    return cityCashe[city].data;
};

const forCityState = async (city, state) =>{
    let key = `${city}_${state}`; 

    let currentTimestamp = new Date().getTime();
    if(cityCashe[key] && cityCashe[key].timestamp > currentTimestamp){
        return cityCashe[key].data
    };
    let result = await fetch(`${API_PREFIX}/weather?q=${city},${state}&appid=${API_KEY}`);
    let data = await result.json();

    cityCashe[key] = {
        data: data,
        timestamp: new Date().getTime() + 60*1000
    };

    return cityCashe[key].data;
};

module.exports={
    forCity,
    forCityState
}