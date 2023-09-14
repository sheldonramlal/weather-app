import { DateTime } from "luxon";

const API_KEY = "ad3686edab9357e279d9ca76778a5362";
const BASE_URL = "https://api.openweathermap.org/data/2.5";




const getWeatherData = async (infoType, searchParams) => {


    const url = new URL(BASE_URL + "/" + infoType);
    url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });


    return fetch(url)
        .then((res) => res.json())
        
/*
    const response = await fetch(url);
    if (response.status === 404) {
        console.log('location not found');
    } else if (response.status === 500) {
        throw new Error('Server error');
    } else if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
  const data = await response.json();
  return data;*/

  
  /*
  try{
    const response = await fetch(url);
    const data =  response.json();
    return data;
  } catch(error){
    console.log('Error', error);
  }*/


};



const formatCurrentWeather = (data) => {

    const {
        coord: { lat, lon },
        main: { temp, feels_like, temp_min, temp_max, humidity },
        name,
        dt,
        sys: { country, sunrise, sunset },
        weather,
        wind: { speed }
    } = data;

    const { main: description, icon } = weather[0];


    return {
        lat, lon, temp, feels_like, temp_min, temp_max,
        humidity, name, dt, country, sunrise, sunset, description, icon, speed
    }
}


const formatForecastWeather = (data) => {
    let { timezone, daily, hourly } = data;
    daily = daily.slice(1, 6).map(d => {
        return {
            title: formatToLocalTime(d.dt, timezone, 'ccc'),
            temp: d.temp.day,
            icon: d.weather[0].icon
        }
    })

    hourly = hourly.slice(1, 6).map(d => {
        return {
            title: formatToLocalTime(d.dt, timezone, 'hh:mm a'),
            temp: d.temp,
            icon: d.weather[0].icon
        }
    })

    return { timezone, daily, hourly };
}


const formatWeatherQuality = (data) => {
    let index = data.data.current.pollution.aqius;
    return {index};
}

const getFormattedWeatherData = async (searchParams) => {
    const formattedCurrentWeather = await getWeatherData('weather', searchParams).then(formatCurrentWeather);

    const { lat, lon } = formattedCurrentWeather;

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    

    const airQuality = await fetch(`http://api.airvisual.com/v2/nearest_city?lat=${lat}&lon=${lon}&key=5b94a8ac-4678-47eb-9c35-011e4abe11ff`, requestOptions)
        .then(response => response.json())
        .then(formatWeatherQuality)
        .catch(error => console.log('error', error));



    const formattedForecastWeather = await getWeatherData("onecall", {
        lat, lon, exclude: 'current,minutely, alerts', units: searchParams.units,
    }).then(formatForecastWeather)

    return { ...formattedCurrentWeather, ...formattedForecastWeather, ...airQuality };
}

const formatToLocalTime = (
    secs,
    zone,
    format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a") =>
    DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

const iconUrlFromCode = (code) =>
    `http://openweathermap.org/img/wn/${code}@2x.png`;

export default getFormattedWeatherData;

export { formatToLocalTime, iconUrlFromCode };