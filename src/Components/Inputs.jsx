import React, { useState } from 'react'
import { UilSearch, UilLocationPoint } from '@iconscout/react-unicons';

function Inputs({setQuery, units, setUnits}) {
    

    const [city, setCity] = useState("");
    
    const handleClick = () => {
        if(city !== '') {
            setQuery({q: city});
            setCity('');
        }

    }


    const handleUnitsChange = (e) => {
        const selectedUnit = e.currentTarget.name;
        if(units !== selectedUnit) setUnits(selectedUnit)
    }


    const handleLocation = () => {
        if( navigator.geolocation){
            navigator.geolocation.getCurrentPosition((position) => {
                let lat = position.coords.latitude;
                let lon = position.coords.longitude;

                setQuery({
                    lat,
                    lon
                });
            });
        }
    }

    const input = (e) =>{     
        if(e.key === 'Enter'){
                handleClick()
            }
        }
    


  return (

    <div className="flex flex-col sm:flex-row justify-center my-6 ">
        <div className='flex flex-row w-full sm:w-3/4 items-center justify-center space-x-4'>
            <input 
            value={city}
            onChange = {(e) => setCity(e.currentTarget.value)}
            onKeyDown={input}
            type="text" 
            className='text-xl font-light p-2 w-full shadow-xl focus:outline-none capitalize placeholder:lowercase ' 
            placeholder='Search for city'
            />

            <UilSearch size={25} className='text-white cursor-pointer transition ease-out hover:scale-125' onClick={handleClick}/>
            <UilLocationPoint size={25} className='text-white cursor-pointer transition ease-out hover:scale-125' onClick={handleLocation}/>
        </div>

        <div className='flex flex-row w-full sm:w-1/4 mt-5 sm:mt-0 items-center justify-center'>
            <button name='metric' className='text-xl text-white font-light hover:scale-125 transition ease-out' onClick={handleUnitsChange}>
                °C
            </button>
            <p className='text-xl text-white mx-1'>|</p>
            <button name='imperial' className='text-xl text-white font-light hover:scale-125 transition ease-out' onClick={handleUnitsChange}>
                °F
            </button>
        </div>

    </div>
  )
}

export default Inputs