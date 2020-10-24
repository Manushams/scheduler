import React from 'react';
import {TaskMonth} from './task';
import {connect} from 'react-redux';

class MonthTable extends React.Component{

    state = { 
        weekDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        monthTo: null
    }

    componentDidMount(){
        this.idTds();
        this.setDays();
        this.displayTasks()
    }

    handleMonthChange = (e) => {
        this.setState({
            monthTo: new Date(new Date(e.target.value).getFullYear(), new Date(e.target.value).getMonth())
        })
        setTimeout(() => {
            this.idTds();
            this.setDays();
            this.displayTasks()
        }, 10);
    }

    daysInMonth = (day) => {
        if(day)return (new Date(day.getFullYear(), day.getMonth() + 1, 0).getDate())
        if(!day)return (new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate())
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
            daysPrevMonth = this.daysInMonth(new Date(today.getFullYear(), today.getMonth()-1)),      
            day = 1,
            dayNextMonth = 1;

        if(dayOfWeek === 0){dayOfWeek=7}
        daysPrevMonth = daysPrevMonth-dayOfWeek+2
        tds.forEach(td => {
            
            if(td.id >= dayOfWeek && parseInt(td.id) - dayOfWeek < this.daysInMonth(today)){
                td.innerHTML = `<p class="day-month">${day}</p>`
                td.setAttribute('title',new Date(today.getFullYear(), today.getMonth(), day).toString().slice(0,15))
                day++
            }else if(td.id < dayOfWeek){
                td.innerHTML = `<p class="day-other-month">${daysPrevMonth}</p>`
                td.setAttribute('title',new Date(today.getFullYear(), today.getMonth()-1, daysPrevMonth).toString().slice(0,15));
                daysPrevMonth++
            }else if(parseInt(td.id) - dayOfWeek >= this.daysInMonth(today)){
                td.innerHTML = `<p class="day-other-month">${dayNextMonth}</p>`;
                td.setAttribute('title',new Date(today.getFullYear(), today.getMonth()+1, dayNextMonth).toString().slice(0,15));
                dayNextMonth++
            }

        })    
    }

    displayTasks = () => {
        const tds = document.querySelectorAll('td'),
            {tasks} = this.props;
        
        tds.forEach(td => {
            if(td.childElementCount >= 2){
                tasks.forEach(task => {
                    if(new Date(td.date).toString().slice(0,15) == task.title){
                        console.log('maatch')
                        td.append(TaskMonth(task))
                    }
                })
            }
        })
    }

    render(){
        const {weekDays, monthTo} = this.state,
            today = monthTo ? monthTo : new Date(),
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

const mapStateToProps = state => {
    return {
        tasks: state.addTask.tasks
    }
}

export default connect(mapStateToProps)(MonthTable)
