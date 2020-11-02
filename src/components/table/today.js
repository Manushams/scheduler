import React from 'react';
import {connect} from 'react-redux'

class Today extends React.Component{

    state = {
        daysOfWeek: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        hours: []
    }

    componentDidMount(){            
        this.setHours();
    }

    displayTasks = () => {
        const tds = document.querySelectorAll('td'),
            {tasks} = this.props;

        tasks.forEach(task => {
            const hourStart = parseInt(task.timeStart.slice(0,2)),
                hourEnd = parseInt(task.timeEnd.slice(0,2)),
                minuteStart = parseInt(task.timeStart.slice(3,5)),
                minuteEnd = parseInt(task.timeEnd.slice(3,5))
                //totalCells = parseInt(((hourEnd*60 + minuteEnd) - (hourStart*60 + minuteStart)) / 30)

            let hrs = hourStart;
            for(let i = 0; i<=hourEnd-hourStart+1; i++){
                tds.forEach(td => {
                    if(parseInt(td.title.slice(0,2)) === hrs){
                        td.innerText = `${task.timeStart} - ${task.timeEnd}`
                    }
                })


                hrs = hourStart + i
            }
            
        })

    }

    setTdIds = () => {
        const tds = document.querySelectorAll('td')
            
        tds.forEach(td => {
            let innerText = td.parentElement.innerText
            
            if(innerText){
                td.setAttribute('title', innerText)
            }else if(!innerText){
                td.setAttribute('title', td.parentElement.previousSibling.innerText.toString().slice(0,3) + '30')
            }
        })
    }

    setHours = () => {
        let hours = []
        const promise = new Promise((resolve, reject) => {
            
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
        promise.then(res => {
            this.setState({
                hours: res
            })
            this.setTdIds();
            this.displayTasks()
        })
    }

    render(){
        const today = new Date(),
            {daysOfWeek, hours} = this.state  

        return(
            <div className='today'>
                <div className="top-bar">
                    <div>
                        <h3>
                            {today.toLocaleString('default', {month: 'long'})} {today.getDate()}, {today.getFullYear()}
                        </h3>
                        <input 
                            id='top-bar-calendar' 
                            type="date" 
                            onChange={this.handleMonthChange}
                        />
                    </div>
                        <ul>
                            <li><a href="#!">Today</a></li>
                            <li><a href="/">Week</a></li>
                            <li><a href="#!">Work Week</a></li>
                            <li><a href="/month">Month</a></li>
                        </ul>
                </div>
                <table className="table fixed">
                    <tbody>
                        <tr className='table-row'>
                            <th 
                                className='table-heading table-heading-today'>
                            </th>
                            <th 
                                className='table-heading table-heading-today'
                            >
                                {daysOfWeek[today.getDay()]} {today.getDate()}
                            </th>
                        </tr>
                        {hours.map(hr => {
                            return(
                                <>
                                    <tr className='table-row'>
                                        <th 
                                            rowSpan='2' 
                                            className='table-data-h'
                                        >
                                            {hr}
                                        </th>
                                        <td></td>
                                    </tr>
                                    <tr className='table-row'>
                                        <td></td>
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

const mapStateToProps = state => {
    return{
        tasks: state.addTask.tasks,
        modalEnable: state.toggleModal.modalEnable,
    }
}

export default connect(mapStateToProps)(Today)