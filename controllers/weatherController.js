const weather = require('../pkg/weather');

const getWeather = async (req,res)=>{
    try {
        let data = await weather.forCity(req.params.city);
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send('Internal server error :(');
        console.log(error)
    }
}

const getWeatherCityState = async (req, res)=>{
    try {
        let result = await weather.forCityState(req.params.city, req.params.state);
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send('Internal resver error :(');
        console.log(error);
    }
}

module.exports = {
    getWeather,
    getWeatherCityState
}