import React from 'react';
import {connect} from 'react-redux';
import { openModal } from '../../store/actions/toggleModalAction';
import { setWidthDay, removeIdenticalDivs, removeTaskDivs, displayTask } from './multipleTasks';

class Week extends React.Component{
    state = {
        day: new Date(),
        daysInWeek: '',
        dateOnMonday: '',
        hours: '',
        weekDaysShort: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    }

    totalDaysInMonth = (month) => {
        return new Date(2020, month, 0).getDate()
    }
    
    componentDidMount(){
        this.setDaysInWeek();
        this.setHours();
        this.displayTasks()
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


    displayTasks = () => {
        const {tasks} = this.props
        const weekdays = Array.from(document.querySelectorAll('.weekday'))            
               
        setTimeout(() => {
            let ths = Array.from(document.querySelectorAll('th')),
                weekdays = Array.from(document.querySelectorAll('.weekday'))

            ths = ths.filter(th => th.id)

            for(let i=0; i < ths.length; i++){
                weekdays[i].style.top = ths[i].getBoundingClientRect().top + 'px';
                weekdays[i].style.left = ths[i].getBoundingClientRect().left + 'px';
                weekdays[i].style.width = ths[i].getBoundingClientRect().width - 8 + 'px';
                console.log(ths[i].getBoundingClientRect())
            }              
        }, 10);

        tasks.forEach(task => {
            const div = document.createElement('div'),
                p = document.createElement('p'),
                dayTask = new Date(task.date).getDay(),
                dayConverted = dayTask === 0 ? 6 : dayTask - 1,
                divWeekday = weekdays[dayConverted]  
            
            p.innerText = task.eventName;
            div.classList.add('task-div');
            div.appendChild(p)

            divWeekday.appendChild(div)
              

        })
    }

    render(){
        const {day, daysInWeek, weekDaysShort, hours} = this.state,
            month = day.toLocaleString('default', {month: 'long'}),
            year = day.getFullYear()
        
            // setTimeout(() => {
            //     const th = document.querySelectorAll('th'),
            //         div = document.querySelector('.div-parent')
            //     console.log(th[4].getBoundingClientRect());
            //     div.style.left = th[4].getBoundingClientRect().left - 120 + 'px'
            //     div.style.top = th[4].getBoundingClientRect().top - 22 + 'px'
            // }, 100);
            
        return(
            <div className="week">
                
                <div className="top-bar">
                    <div>
                        <h3>{month} {daysInWeek && daysInWeek[0].getDate()}-{daysInWeek && daysInWeek[6].getDate()}, {year}</h3>
                        <input id='top-bar-calendar' type="date" onChange={this.dateOnChange} />
                    </div>
                    <ul>
                        <li><a href="/day">Today</a></li>
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

                {weekDaysShort.map(day => 
                    
                    <div
                        className={day +' weekday' }
                    >
                    </div>
                    
                )}

            </div>
        )
    }
}

const mapStateToProps = state => {
    return{
        tasks: state.addTask.tasks,
        modalEnable: state.toggleModal.modalEnable,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        openModal: () => dispatch(openModal())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Week)