import React from 'react';
import {connect} from 'react-redux';

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
        tasks.sort((task1, task2) => task2.height - task1.height)

        tasks.forEach(task => {
            const timeStart = parseInt(task.timeStart.slice(0,2))*60 + parseInt(task.timeStart.slice(3,5)),
                timeEnd = parseInt(task.timeEnd.slice(0,2))*60 + parseInt(task.timeEnd.slice(3,5))
            let matchedTasks = [task]
            tasks.forEach(taskMap => {
                    const timeStartMap = parseInt(taskMap.timeStart.slice(0,2))*60 + parseInt(taskMap.timeStart.slice(3,5))
                    if( (task.id !== taskMap.id) && 
                        (timeStartMap >= timeStart) &&
                        (timeStartMap < timeEnd)
                    ){return matchedTasks.push(taskMap)}
                
                })
                console.log('matched',matchedTasks)
        })        



        // tasks.forEach(task => {
        //     const div = document.createElement('div'),
        //         p = document.createElement('p'),
        //         hrsStart = parseInt(task.timeStart.slice(0,2)),
        //         minsStart = parseInt(task.timeStart.slice(3,5)),
        //         hrsEnd = parseInt(task.timeEnd.slice(0,2)),
        //         minsEnd = parseInt(task.timeEnd.slice(3,5)),
        //         top = (hrsStart + minsStart/60) * 2.1875 + 1.5 + 'rem',
        //         height = ((hrsEnd*60 + minsEnd) - (hrsStart*60 + minsStart)) * 2.1875/60 +'rem' 
                      
        //     div.classList.add('task-div');
        //     p.innerText = task.eventName;
        //     div.style.height = height;
        //     div.style.top = top
        //     div.appendChild(p);
        //     tdParent.appendChild(div)
        // })


    }


    render(){
        setTimeout(() => {
            console.log(this.state, this.props.tasks)           
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
                                        {hours.map((hour, i) => {
                                            return(
                                                <tr key = {i}>
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