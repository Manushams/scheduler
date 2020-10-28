import React from 'react'

class Today extends React.Component{

    state = {
        daysOfWeek: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        hours: null
    }

    setHours = () => {
        const promise = new Promise((resolve, reject) => {
            let hours = []
            
            for(let i = 0; i<24;i++){
                if(i < 10){
                    hours.push(`0${i}:00`)
                }else{
                    hours.push(`${i}:00`)
                }
            }

            if(hours.length === 24){
                return resolve(hours)
            }            
        })
        let hrs  
        promise.then((hours) => {
            hours = hrs
        })
        this.setState({
            hours: hrs
        })
    }

    render(){
        const today = new Date(),
            {daysOfWeek} = this.state
        this.setHours()
        setTimeout(()=> {
            console.log(this.state)
        }, 1000)
        return(
            <div className='today'>
                <div className="top-bar">
                    <div>
                        <h3>
                            {today.toLocaleString('default', {month: 'long'})} {today.getDate()}, {today.getFullYear()}
                        </h3>
                        <input id='top-bar-calendar' type="date" onChange={this.handleMonthChange}/>
                    </div>
                        <ul>
                            <li><a href="#!">Today</a></li>
                            <li><a href="/">Week</a></li>
                            <li><a href="#!">Work Week</a></li>
                            <li><a href="/month">Month</a></li>
                        </ul>
                </div>
                <table className="table fixed">
                    <thead>
                        <tr className='table-row'>
                            <th className='table-heading table-heading-today-empty'></th>
                            <th className='table-heading table-heading-today'>{daysOfWeek[today.getDay()]} {today.getDate()}</th>
                        </tr>
                    </thead>
                    <tr className='table-row'><th>00:00</th><td></td></tr>
                    <tr className='table-row'><th></th></tr>
                </table>
            </div>
        )
    }

}
export default Today;