import React from 'react';
import styles from './Time.module.css';

class Time extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            time: new Date().toLocaleString(),
            year: new Date().getFullYear(),
            month: new Date().getMonth(),
            data: new Date().getDate(),
            day: new Date().getDay(),
            hour: new Date().getHours(),
            min: new Date().getMinutes(),
            sec: new Date().getSeconds(),
            dayName: "",
            monthName: ""
        };
    }

    componentDidMount() {
        this.intervalID = setInterval(() => this.tick(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.intervalID);
    }

    tick() {
        this.setState({
            time: new Date().toLocaleString(),
            year: new Date().getFullYear(),
            month: new Date().getMonth(),
            data: new Date().getDate(),
            day: new Date().getDay(),
            hour: new Date().getHours(),
            min: new Date().getMinutes(),
            sec: new Date().getSeconds()
        });
    }

    addZero(n) {
        return (parseInt(n, 10) < 10 ? '0' : '') + n;
    }

    showday(dayWeek) {
        switch (dayWeek) {
            case 0:
                this.setState.dayName = 'Воскресенье'
                break;
            case 1:
                this.setState.dayName = 'Понедельник'
              break;
            case 2:
                this.setState.dayName = 'Вторник'
              break;
            case 3:
                this.setState.dayName = 'Среда'
              break;
            case 4:
                this.setState.dayName = 'Четверг'
              break; 
            case 5:
                this.setState.dayName = 'Пятница'
              break;
            case 6:
                this.setState.dayName = 'Суббота'
              break;    
        }

        return this.setState.dayName
    }

    showmonth (month) {
        switch (month) {
            case 0:
                this.setState.monthName = 'Январь'
              break;
            case 1:
                this.setState.monthName = 'Февраль'
              break;
            case 2:
                this.setState.monthName = 'Март'
              break;
            case 3:
                this.setState.monthName = 'Апрель'
              break;
            case 4:
                this.setState.monthName = 'Май'
              break; 
            case 5:
              this.setState.monthName = 'Июнь'
              break;
            case 6:
              this.setState.monthName = 'Июль'
              break;
            case 7:
              this.setState.monthName = 'Август'
              break;
            case 8:
              this.setState.monthName = 'Сентябрь'
              break;
            case 9:
                this.setState.monthName = 'Октябрь'
              break;
            case 10:
              this.setState.monthName = 'Ноябрь'
              break; 
            case 11:
              this.setState.monthName = 'Декабрь'
              break; 
        }
        return this.setState.monthName
    }

    render() {
        return (
            <div className={styles.appClock}>
                <p>
                    Текущая дата: 
                    {this.addZero(this.state.data)}<span> </span>
                    {this.showmonth(this.state.month)}<span> </span>
                    {this.showday(this.state.day)}<span> </span>
                    {this.state.year}
                </p>
                <p>
                    Текущее время: {this.addZero(this.state.hour)}<span>:</span>{this.addZero(this.state.min)}<span>:</span>{this.addZero(this.state.sec)}
                </p>
            </div>
        );
    }
}

export default Time;