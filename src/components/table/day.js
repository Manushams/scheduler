import React from 'react';
import {connect} from 'react-redux';
import {Height} from './task'

class Day extends React.Component{
    
    state = {
        hours: [],
        day: new Date(),
    };

    componentDidMount(){
        this.setHours();
        this.displayTasks();
    }

    setHours = () => {
        
        const loopHours = new Promise((resolve, reject) => {
            let hours = []
            
            for(let i=0; i<24; i++ ){
                if(i<10){   
                    hours.push(`0${i}:00`)
                }else{
                    hours.push(`${i}:00`)
                }
                
            }
            return resolve(hours)
        } )

        loopHours.then((hours) => {
            this.setState({
                hours: [...hours]
            })
        })

    }
    handleDayChange = (e) => {
        console.log(e.target.value)
        this.setState({
            day: new Date(e.target.value)
        })
    }

    displayTasks = () => {
        const tdParent = document.querySelector('.td-parent'),
            {tasks} = this.props
        


        tasks.forEach(task => {
            const div = document.createElement('div'),
                p = document.createElement('p')
        
             div.classList.add('task-div');
            p.innerText = task.eventName;
            div.style.height = Height(task) + 'rem';
            div.appendChild(p);
            tdParent.appendChild(div)
        })


    }


    render(){
        setTimeout(() => {
            console.log(this.state)
        }, 100);
        const {day, hours} = this.state,
            date = day.getDate(),
            month = day.toLocaleString('default', {month: 'long'}),
            year = day.getFullYear(),
            dayWeek = day.toLocaleString('default', {weekday: 'short'})

        return(
            <div className='day'>
                <div className="top-bar">
                    <div>
                        <h3>
                            {month} {date}, {year}
                        </h3>
                        <input 
                            id='top-bar-calendar' 
                            type="date" 
                            onChange={this.handleDayChange}
                        />
                    </div>
                        <ul>
                            <li><a href="#!">Today</a></li>
                            <li><a href="/">Week</a></li>
                            <li><a href="#!">Work Week</a></li>
                            <li><a href="/month">Month</a></li>
                        </ul>
                </div>

                <table className='table-parent'>
                    <thead>
                        <tr>
                            <td className='td-parent'>
                                <table>
                                    <thead>
                                        <tr>
                                            <th className='table-heading table-heading-today'></th>
                                            <th className='table-heading table-heading-today'>{dayWeek}, {date}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {hours.map(hour => {
                                            return(
                                                <tr>
                                                    <th>{hour}</th>
                                                    <td></td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </thead>
                </table>
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

export default connect(mapStateToProps)(Day);