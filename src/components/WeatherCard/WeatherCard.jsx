import React from 'react';
import '../../css/owfont-regular.css'
import styles from './WeatherCard.module.css'

const WeatherCard = ({id, temp, city, country, wind, humidity, pressure, sunset, idForIcon, time, onRemoveCard, onUpdateData, maxTemp, minTemp}) => (
    
    <div key={id} className={styles.city}> 
        <li className={styles.cityList}>
            <p><strong>Местоположение: {city}, {country}</strong></p>
            <i className={"owf owf-"+ idForIcon +" owf-5x icon-style"}></i>
            <ul className={styles.listContainer}>
                {minTemp === temp && <span className={styles.minTemp}>В этом городе минимальная температура</span>}
                {maxTemp === temp && <span className={styles.maxTemp}>В этом городе максимальная температура</span>}
                <li>Температура: {temp} °C</li>
                <li>Скорость ветра: {wind} м/с</li>
                <li>Влажность: {humidity} г/м³</li>
                <li>Давление: {pressure} Па</li>
                <li>Заход солнца: {sunset}</li>
                <li>Дата обновления данных: {time}</li>
            </ul>
            <button type='submit' className="floating-button color-green" onClick={() => onUpdateData(city)}>Обновить</button>
            <button type='submit' className="floating-button color-red" onClick={() => onRemoveCard(id)}>Удалить</button>
        </li>
    </div>  
    
)

export default WeatherCard;