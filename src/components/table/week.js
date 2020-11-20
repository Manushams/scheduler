import React from 'react';

class Week extends React.Component{
    state = {
        day: new Date('2020-11-1'),
        daysInWeek: null
    }

    totalDaysInMonth = (month) => {
        return new Date(2020, month, 0).getDate()
    }
    
    componentDidMount(){
        this.setDaysInWeek()
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

        const daysArray = new Promise((resolve, reject) => {
            let daysInWeek = []

            for(let i=0; i<7; i++){
                daysInWeek.push(new Date(year, month, dateOnMonday+i))
                console.log(i)
            }

            return resolve(daysInWeek)
        })

        daysArray.then(daysInWeek => {
            this.setState({
                daysInWeek: [...daysInWeek]
            })
        })         
    }


    render(){
        
        // console.log(this.state)
        return(
            <div className="week">
                <div className="top-bar">
                    <div>
                        <h3>today</h3>
                        <input id='top-bar-calendar' type="date" onChange={this.dateOnChange} />
                    </div>
                    <ul>
                        <li><a href="#!">Today</a></li>
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