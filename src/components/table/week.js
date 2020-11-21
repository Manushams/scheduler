import React from 'react';

class Week extends React.Component{
    state = {
        day: new Date(),
        daysInWeek: '',
        dateOnMonday: ''
    }

    totalDaysInMonth = (month) => {
        return new Date(2020, month, 0).getDate()
    }
    
    componentDidMount(){
        this.setDaysInWeek()
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
        const {day, daysInWeek, dateOnMonday} = this.state,
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


            </div>
        )
    }
}

export default Week;