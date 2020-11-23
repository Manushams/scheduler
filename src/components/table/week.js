import { relativeTimeThreshold } from 'moment';
import React from 'react';
import Day from './day'

class Week extends React.Component{
    state = {
        day: new Date(),
        daysInWeek: '',
        dateOnMonday: '',
        hours: ''
    }

    totalDaysInMonth = (month) => {
        return new Date(2020, month, 0).getDate()
    }
    
    componentDidMount(){
        this.setDaysInWeek();
        this.setHours();
    }
    
    setHours = () => {

        let hours = []
        for (let i = 0; i < 24; i++) {
            if (i < 10) {
                hours.push(`0${i}:00`)
            } else {
                hours.push(`${i}:00`)
            }
        }

        this.setState({
            hours: [...hours]
        })
    }

    dateOnChange = (e) => {
        this.setState({
            day: new Date(e.target.value)
        })
        
        setTimeout(() => {
            this.setDaysInWeek()
        }, 10);
    }

    setDaysInWeek = () => {
        const {day} = this.state,
            date = day.getDate(),
            weekDay = day.getDay(),
            month = day.getMonth(),
            year = day.getFullYear()
        let dateOnMonday = weekDay > 0 ? date - weekDay + 1 : date - 6
        if(dateOnMonday < 1){
            if(dateOnMonday === 0){
                dateOnMonday = this.totalDaysInMonth(month)
            }else if(dateOnMonday < 0){
                dateOnMonday = this.totalDaysInMonth(month) + dateOnMonday 
            }
        }         
                
        let daysInWeek = []

        for(let i=0; i<7; i++){
            daysInWeek.push(new Date(year, month, dateOnMonday+i))
        }

        this.setState({
            daysInWeek: [...daysInWeek]
        })         
    }


    render(){
        setTimeout(() => {
            console.log(this.state)
        }, 10);
        const {day, daysInWeek, dateOnMonday, hours} = this.state,
            month = day.toLocaleString('default', {month: 'long'}),
            year = day.getFullYear()
        
        return(
            <div className="week">
                
                <div className="top-bar">
                    <div>
                        <h3>{month} {daysInWeek && daysInWeek[0].getDate()}-{daysInWeek && daysInWeek[6].getDate()}, {year}</h3>
                        <input id='top-bar-calendar' type="date" onChange={this.dateOnChange} />
                    </div>
                    <ul>
                        <li><a href="/today">Today</a></li>
                        <li><a href="#!">Week</a></li>
                        <li><a href="#!">Work Week</a></li>
                        <li><a href="#!">Month</a></li>
                    </ul>
                </div>

                <table>
                    
                    <thead>
                        <tr className='tr-heading'>
                            <th></th>
                            {daysInWeek && daysInWeek.map(day => {
                                return(
                                    <>
                                        <th
                                            id = {day.toString().slice(0, 15)}
                                        >
                                            {day.toLocaleDateString('locale', { weekday: 'short' })}
                                            <br />
                                            {day.getDate()}
                                        </th>
                                    </>
                                )
                            })}
                        </tr>
                    </thead>

                    <tbody>
                        {hours && hours.map(hour => {
                            return(
                                <>
                                    <tr>
                                        <th rowSpan='2'>{hour}</th>
                                        {[...Array(7)].map(() => 
                                            <td></td>
                                        )}
                                    </tr>
                                    <tr>
                                        {[...Array(7)].map(() => 
                                            <td></td>
                                        )}
                                    </tr>
                                </>
                            )
                        })}
                    </tbody>
                </table>


            </div>
        )
    }
}

export default Week;