import React from 'react';
import {connect} from 'react-redux';
import Task from './task';
import Modal from './modal';
import { openModal } from '../../store/actions/toggleModalAction';
import { removeWithSameId, setWidth, AdjustWidth,removeChildren } from './multipleTasks'

class Today extends React.Component{

    state = {
        daysOfWeek: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        hours: [],
        day: null,
        cellDetails: {}
    }

    componentDidMount(){            
        this.setHours();
    }

    componentDidUpdate(){
        // this.removeTasks()
        this.displayTasks()
    }

    handleDayChange =(e) => {
        this.setState({
            day: new Date(e.target.value),
            cellDetails: {title: new Date(e.target.value).toString().slice(0,15)}
        })
        removeChildren()
    }

    displayTasks = () => {
        const tds = document.querySelectorAll('td'),
            {tasks} = this.props,
            {day} = this.state,
            date = day ? day : new Date()

        tasks.forEach(task => {
            if(task.cellDetails.title === date.toString().slice(0,15)){
            const hourStart = parseInt(task.timeStart.slice(0,2)),
                hourEnd = parseInt(task.timeEnd.slice(0,2)),
                minuteStart = parseInt(task.timeStart.slice(3,5)),
                minuteEnd = parseInt(task.timeEnd.slice(3,5)),
                startTotalMins = parseInt((hourStart*60 + minuteStart)),
                endTotalMins = parseInt((hourEnd*60 + minuteEnd)),
                totalCells = Math.round(((hourEnd*60 + minuteEnd) - (hourStart*60 + minuteStart)) / 60),
                height = ((endTotalMins - startTotalMins) / 15 ) + 'rem'

                console.log(((hourEnd*60 + minuteEnd) - (hourStart*60 + minuteStart)) / 60)
            
            for(let i = 0; i<=totalCells+1; i++){
                for(let num in tds){
                    let td = tds.item(num),
                        tdTotalMins = parseInt(td.title.slice(0,2))*60 + parseInt(td.title.slice(3,5))
                                               
                    if(startTotalMins >= tdTotalMins && startTotalMins < tdTotalMins + 30){
                        let firstCard = Task(task)[0];
                        firstCard.style.marginTop = ((startTotalMins%30) / 15) + 'rem'
                        firstCard.style.zIndex = '1'
                        firstCard.style.height = height
                        td.style.overflow = 'visible'; 
                        td.appendChild(firstCard)

                    }else if(endTotalMins > tdTotalMins 
                        && endTotalMins < tdTotalMins+30){

                            let lastCard = Task(task)[2]
                            lastCard.style.height = ((endTotalMins%30) / 15) + 'rem'
                            lastCard.style.backgroundColor = 'red'
                            td.appendChild(lastCard)

                    }else if( startTotalMins <= tdTotalMins && endTotalMins > tdTotalMins){
                        td.appendChild(Task(task)[1])
                    }
                    removeWithSameId(td)
                    if (td.childElementCount >= 2) {
                        setWidth(td);
                        AdjustWidth(td.children, setWidth(td))
                    }

                }
            }}
            
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
        const {daysOfWeek, hours, day, cellDetails} = this.state,  
            today = day ? day : new Date(),
            {modalEnable, openModal} = this.props
            

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
                                        <td
                                            onClick={() => this.props.openModal()}
                                        ></td>
                                    </tr>
                                    <tr className='table-row'>
                                        <td
                                            onClick={() => openModal()}
                                        ></td>
                                    </tr>
                                </>
                            )
                        })}

                    </tbody>
                    
                </table>
                {modalEnable ?
                    <Modal
                        cellDetails={day ? cellDetails : {title: new Date().toString().slice(0,15)}}
                    /> : null
                }
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
    return{
        openModal: () => dispatch(openModal())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Today)