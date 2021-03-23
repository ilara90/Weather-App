import React, { useEffect, useState } from 'react';
import Info from './components/Info/Info';
import Form from './components/Form/Form';
import WeatherCard from './components/WeatherCard/WeatherCard';
import Time from './components/Time/Time';

const apiKey = 'ab2f418c529ce5ad29ca7c188f2afe2b';

const App = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const dataFromLocalStorage= window.localStorage.getItem('data');
  const [arrayOfCity, setArrayOfCity] = useState (JSON.parse(dataFromLocalStorage) || []);

  useEffect(() => window.localStorage.setItem('data', JSON.stringify(arrayOfCity)), [arrayOfCity]);

  useEffect(() => {
    if(data) {
      const sunset = data.sys.sunset;
      let date = new Date();
      let month = date.getMonth() + 1;
      let timeData = date.getDate()+'.'+month+'.'+date.getFullYear()+' '+ date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
      date.setTime(sunset);
      let sunsetData = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
      
      const  citySearch = arrayOfCity.find(item => item.id === data.id);
      if ( citySearch ) { 
        const arr = [...arrayOfCity];
        const arrayOfCityNew = arr.map(item => (item.id === data.id
        ? {...item, ...{
            id: data.id,
            temp: data.main.temp,
            city: data.name,
            country: data.sys.country,
            wind: data.wind.speed,
            humidity: data.main.humidity,
            pressure: data.main.pressure,
            sunset: sunsetData,
            idForIcon: data.weather[0].id,
            time: timeData
          }
        }
        : item))

        setArrayOfCity(arrayOfCityNew)
      } else {
        setArrayOfCity(array => [...array, {
            id: data.id,
            temp: data.main.temp,
            city: data.name,
            country: data.sys.country,
            wind: data.wind.speed,
            humidity: data.main.humidity,
            pressure: data.main.pressure,
            sunset: sunsetData,
            idForIcon: data.weather[0].id,
            time: timeData,
          }
        ])
      }
    }
  }, [data] )

  const gettingWeather = async ({event, city}) => {
    if(event) event.preventDefault();
      
    if(event || city) {
      try {
        const apiUrl = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${event ? event.target.elements.city.value : city}&appid=${apiKey}&units=metric`);
        const dataFromUrl = await apiUrl.json();
        if (dataFromUrl.cod === '404' || dataFromUrl.cod === '400') {
          throw new Error(dataFromUrl.message);
        } else {
          setError(null);
          setData(dataFromUrl)
        } 
      } catch (err) {
        setError(err.message)
      }
    }
  }

  // Находим max and min температуру
  let arrTemp = [];
  arrayOfCity.map(item => arrTemp.push(item.temp));
  let maxTemp = Math.max.apply(null, arrTemp);
  let minTemp = Math.min.apply(null, arrTemp);
  console.log(maxTemp, minTemp);

  const onRemoveCard = (id) => {
    const deleteCity = arrayOfCity.filter(item => item.id !== id);
    setArrayOfCity(deleteCity)
  }
 
  return (
    <div className="container">
      <Time />
      <Info />
      <Form 
        onClick={e => gettingWeather({event: e})} 
        error={error}
      />
      <div className='container-city'>
        {arrayOfCity.length > 0 && arrayOfCity.map(item => <WeatherCard
          key={item.id}
          {...item} 
          onRemoveCard={id => onRemoveCard(id)} 
          onUpdateData={city => gettingWeather({city})} 
          maxTemp = {maxTemp}
          minTemp = {minTemp}
        />)}
      </div> 
    </div>
  );
}


export default App;
