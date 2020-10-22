import React from 'react';

class MonthTable extends React.Component{

    state = { 
        weekDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        monthTo: null
    }

    componentDidMount(){
        this.idTds();
        this.setDays();
    }

    componentDidUpdate(){
        this.idTds();
        this.setDays();
    }

    handleMonthChange = (e) => {
        this.setState({
            monthTo: new Date(new Date(e.target.value).getFullYear(), new Date(e.target.value).getMonth())
        })
    }

    daysInMonth = (day) => {
        if(day)return (new Date(day.getYear(), day.getMonth() + 1, 0).getDate())
        if(!day)return (new Date(new Date().getYear(), new Date().getMonth() + 1, 0).getDate())
    }
    
    idTds = () => {
        const tds = document.querySelectorAll('td');
        let i = 0;
        tds.forEach(td => {
            i++
            td.setAttribute('id', i)
        });
    }

    setDays = () => {
        const {monthTo} = this.state,
            today = monthTo ? monthTo : new Date(),
            tds = document.querySelectorAll('td');
        let dayOfWeek = new Date(today.getFullYear(), today.getMonth(), 1).getDay(),
            daysPrevMonth = this.daysInMonth(new Date(today.getFullYear(), today.getMonth())),      
            day = 1,
            dayNextMonth = 1;

        if(dayOfWeek === 0){dayOfWeek=7}
        console.log(today)
        daysPrevMonth = daysPrevMonth-dayOfWeek+1
        tds.forEach(td => {
            
            if(td.id >= dayOfWeek && parseInt(td.id) - dayOfWeek < this.daysInMonth()){
                td.innerHTML = `<p class="day-month">${day}</p>`
                day++
            }else if(td.id < dayOfWeek){
                td.innerHTML = `<p class="day-other-month">${daysPrevMonth}</p>`
                daysPrevMonth++
            }else if(parseInt(td.id) - dayOfWeek >= this.daysInMonth()){
                td.innerHTML = `<p class="day-other-month">${dayNextMonth}</p>`;
                dayNextMonth++
            }

        })    
    }

    render(){
        const {weekDays} = this.state,
            today = new Date(),
            td = [...Array(6)].map(() => 
                <tr key={Math.random()} className='table-row'>
                    {[...Array(7)].map(() =>
                        <td key={Math.random()} className='table-data'></td>
                    )}
                </tr>
            )                                  
    
        return(
            <div className='monthtable'>
                <div className="top-bar">
                    <div>
                        <h3>
                            {today.toLocaleString('default', {month: 'long'})}, {today.getFullYear()}
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
                <table className='table fixed'>
                    <thead>
                        <tr className='table-row table-row-heading-month'>
                            {weekDays.map((weekDay, i) => <th className='table-heading th-month' key={i}>{weekDay}</th>)}
                        </tr>

                    </thead>
                    
                    <tbody id='month-tbody'>
                        {td}
                    </tbody>

                </table>
            </div>
        )
    }
}
export default MonthTable
