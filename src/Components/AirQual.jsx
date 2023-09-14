import React from 'react'

function AirQual(props) {

    let airQuality = props.quality;
    let description;
    let concernLevel;

    if(airQuality <=50){
        concernLevel = "Good";
        description = <p>Air quality is satisfactory, and air pollution poses little or no risk.</p>
    }else if(airQuality >50 && airQuality<= 100){
        concernLevel = "Moderate";
        description = <p>Air quality is acceptable. However, there may be a risk for some people, particularly those who are unusually sensitive to air pollution.</p>
    }else if(airQuality > 100 && airQuality <=150){
        concernLevel = "Unhealthy for Sensitive Groups";
        description = <p>Members of sensitive groups may experience health effects. The general public is less likely to be affected.</p>
    }else if(airQuality > 151 && airQuality <=200){
        concernLevel = "Unhealthy";
        description = <p>Some members of the general public may experience health effects; members of sensitive groups may experience more serious health effects.</p>
    }else if(airQuality > 200 && airQuality <=300){
        concernLevel = "Very Unhealthy";
        description = <p>Health alert: The risk of health effects is increased for everyone.</p>
    }else if(airQuality > 300){
        concernLevel = "Hazardous";
        description = <p>Health warning of emergency conditions: everyone is more likely to be affected.</p>
    }

  return (
    <div className="mt-10 grid place-items-center">

        
        <div className="max-w-sm p-6 bg-opacity-40 rounded-lg shadow bg-gray-800 dark:border-gray-700 ">
           
            <h5 className="mb-2 text-xl font-normal tracking-tight text-center text-gray-900 dark:text-white">Air Quality Index</h5>
            
            <p className="mb-3 font-normal text-center text-white">{airQuality} - {concernLevel}</p>

            <div className="mb-3 font-normal text-center text-white">
            {description}
            </div>
            

           
        </div>



    </div>
  )
}

export default AirQual