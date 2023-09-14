import './App.css';
import UilReact from '@iconscout/react-unicons/icons/uil-react';
import TopButtons from './Components/TopButtons';
import Inputs from './Components/Inputs';
import TimeLocation from './Components/TimeLocation';
import TemperatureDetails from './Components/TemperatureDetails';
import Forecast from './Components/Forecast';
import getFormattedWeatherData from './Services/weatherService';
import { useEffect, useState } from 'react';
import AirQual from './Components/AirQual';


function App() {
const [query, setQuery] = useState({q: 'port-of-spain'})
const [units, setUnits] = useState('metric')
const [weather, setWeather] = useState(null)


  useEffect(() => {
    const fetchweather = async () => {
      await getFormattedWeatherData({ ...query, units}).then(
        (data) => {
         
          setWeather(data);
         
      }
      );
     
    };

    fetchweather();
  },[query, units])


  const formatBackground = () => {
    if(!weather) return "from-cyan-700 to-blue-700";
    const threshold = units === "metric" ? 30 : 60 ;
    if(weather.temp <= threshold) return "from-cyan-700 to-blue-700";

    return "from-yellow-700 to-orange-700"
  };

  const dayOrNight = () => {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    
    

    if( currentHour >=6 && currentHour <= 17) {
    return "from-cyan-700 to-blue-700";
    }else if(currentHour == 18){
      return "from-blue-900 to-pink-300"
    }else{
      return "from-gray-800 to-blue-900"
    }
    
   // if(currentTimestamp < weather.sunset) return "from-blue-500 to-pink-400";
    //"from-blue-500 to-pink-400"
    //"from-gray-800 to-blue-900"
  }

  const currentTime = () => {
    if(weather){
      if(new Date().valueOf() /1000 < weather.sunrise){                         //before sunrise: dark, after sunrise: light, after sunset: dark
          return "from-gray-800 to-blue-900";
      }else if(new Date().valueOf() /1000 > weather.sunset){
          return "from-gray-800 to-blue-900";
      }else{
        return "from-cyan-700 to-blue-700";
      }
    }else{
      return "from-cyan-700 to-blue-700";
    }
}
    
  
  //currentTime();

  return (
    <div className={`sm:mx-auto max-w-screen-md sm:mt-4 py-5 px-8 sm:px-32 bg-gradient-to-br h-fit shadow-xl
     shadow-gray-400 ${currentTime()}`}>
      {/*<TopButtons setQuery={setQuery} />*/}
      <Inputs setQuery={setQuery} units={units} setUnits={setUnits}/>
      {weather && (
       <div>
          <TimeLocation weather={weather}/>
          <TemperatureDetails weather ={weather}/>
          <Forecast title="Hourly forecast" items={weather.hourly} />
          <Forecast title="Daily forecast" items = {weather.daily}/>
          <AirQual  quality = {weather.index}/>
        </div>
      )}
    </div>
  );
}

export default App;
