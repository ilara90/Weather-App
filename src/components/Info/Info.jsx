import React from 'react';
import styles from './Info.module.css';

const Info = () => {
    const date = new Date()
    const hours = date.getHours()
    let timeOfDay, name
    
    if (hours > 5 && hours < 11) {
        timeOfDay = "Доброе утро"
    } else if (hours > 11 && hours < 17) {
        timeOfDay = "Добрый день"
    }else if (hours > 17 && hours < 23)  {
        timeOfDay = "Добрый вечер"
    } else {
        timeOfDay = "Доброй ночи"
    }

    return (
        <div className={styles.info}>
            <h1>{timeOfDay}!</h1>
            
            <p>Узнайте погоду в Вашем городе</p>
        </div>
    );
}

export default Info;