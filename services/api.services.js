import axios from 'axios';
import { getKeyValue, TOKEN_DICT } from './storage.services.js'


// const getIcon = (icon) => {

// }

const getWeather = async (city) => {
    // let token = ''
    // if (process.env.TOKEN) {
    //     token = process.env.TOKEN
    //     console.log(token, 'from pocess env')
    // } else {
    //     token = await getKeyValue(TOKEN_DICT.token)
    //     console.log(token, 'token from app')
    // }
    const token = process.env.TOKEN ?? await getKeyValue(TOKEN_DICT.token)
    if (!token) {
        throw new Error('Token is not exist')
    }
    const cityData = await axios.get('http://api.openweathermap.org/geo/1.0/direct', {
        params: {
            q: city,
            appid: token
        }
    })
    const weatherData = await axios.get('http://api.openweathermap.org/data/2.5/weather', {
        params: {
            lon: cityData.data[0].lon,
            lat: cityData.data[0].lat,
            appid: token
        }
    })
    // console.log(weatherData.data)
    return weatherData.data
}

export { getWeather }