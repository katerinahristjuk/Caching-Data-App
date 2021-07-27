const express = require('express');
const controller = require('./controllers/weatherController');
const config = require('./pkg/config')

const api = express();

api.use(express.json());

//routes
api.get('/weather/:city', controller.getWeather );
api.get('/weather/:city/:state', controller.getWeatherCityState);

//start
api.listen(config.get('service').port, err=>{
    if(err){
        return console.log(err);
    }
    console.log(`Listening on port ${config.get('service').port} :)`)
})



