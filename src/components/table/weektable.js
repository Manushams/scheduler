import React from 'react';
import moment from 'moment';
import Modal from './modal'
import {connect} from 'react-redux'
import Task from './task'
import {openModal} from '../../store/actions/toggleModalAction'


class Weektable extends React.Component {

    state = {
        hours: [],
        modalEnable: false,
        startTime: '',
        endtime: '',
        day: '',
        weekDays: {0: 7},
        cellDetails: ''
    }

    componentDidMount() {
        this.hours();
        
        setTimeout(() => {
            this.setClassNames();
        },100)
    }

    componentDidUpdate(){
        setTimeout(() => {
            this.displayTask()
        },100)
    }

    setClassNames = () => {
        const tdAll = document.querySelectorAll('.table-data');

        tdAll.forEach(td => {
            const tbody = td.parentElement.parentElement
            var th = tbody.querySelectorAll('.table-heading')

            var columnNum = td.cellIndex

            if(td.parentElement.rowIndex % 2 === 0){
                columnNum = td.cellIndex + 1
            }
            
            const day = th[columnNum].innerHTML.slice(8,)
            td.setAttribute('title', this.futureDay(parseInt(day)).toString().slice(0,15))
            td.setAttribute('id', Math.random())
        })
    }

    hours = () => {
        var array = []
        for (let i = 0; i < 25; i++) {
            if (i < 10) {
                var num = '0' + i + ':00';
                array.push(num)
            } else {
                var number = i + ':00';
                array.push(number)
            }
        }
        setTimeout(() => {
            this.setState({
                hours: array
            })
        })
    }

    lastDay = (year, month) => {
        return new Date(year, month +1, 0).getDate()
    }

    futureDay = (day) => {
        const newDate = new Date()
        const currentYear = newDate.getFullYear()
        const currentMonth = newDate.getMonth()
        let today = newDate.getDate();
        let diff = day - today;

        if(diff < -21){
            diff = day; today = this.lastDay(currentYear, currentMonth)
        }else if(diff > 21) {
            return new Date(currentYear, currentMonth - 1, day)
        }
    
        return new Date(currentYear, currentMonth, today + diff )
    }

    displayTask = () => {
        const tdAll = document.querySelectorAll('td')

        tdAll.forEach(td => {
            this.props.tasks.forEach(task => {
                if(task.cellDetails.id === td.id){
                    if(!td.childElementCount){
                        var taskNew = {...task, position: this.state.cellDetails.position}
                        td.appendChild(Task(taskNew))                        
                    }
                }else{
                    console.log('nothing')
                }
            })
        }) 

    }

    onClickHandle = (e) => {
        this.props.openModal()
        const target = e.target
        console.log('title', target.title)
        this.setState({
            startTime: target.parentElement.id,
            cellDetails: {
                id:target.id, 
                title: target.title, 
            }
        })
    }

    render() {
        const { hours, startTime, cellDetails } = this.state
        const {modalEnable} = this.props

        const today = new Date()
        const dateToday = today.getDate();
        const dayWeek = today.getDay() === 0 ? this.state.weekDays[today.getDay() ] : today.getDay()
        const year = today.getFullYear()
        const month = today.getMonth() 
        var weekDate = [dateToday - dayWeek +1, dateToday - dayWeek + 7] 
        var startEndWeek = [
            parseInt(moment().startOf('week').toString().slice(8,10)) +1,
            parseInt(moment().endOf('week').toString().slice(8,10))+ 1 
        ] 
        
        if(weekDate[1] > this.lastDay(year, month)){
            const endWeek = weekDate[1] - this.lastDay(year, month)
            weekDate[1] = endWeek
        }
        
        // console.log('today',today)
        // console.log('dateToday',dateToday)
        // console.log('dayWeek',dayWeek)
        // console.log('year',year)
        // console.log('month',month)
        // console.log('weekDate',weekDate)

        // console.log('this.props',this.props)
        
        const weekDays = moment.weekdaysShort()
        weekDays.splice(0, 1);
        weekDays.push('Sun')   

        const tableRow =
            <>
                {hours && hours.map((hour) => {
                    return (
                        <>
                            <tr 
                                className='table-row'
                                id = {hour}    
                            >
                                <th rowSpan="2" className='table-data-h'>{hour}</th>
                                {Array.apply(0, Array(7)).map((a, i) => {
                                    return(
                                        <td 
                                            className='table-data' 
                                            key = {i}
                                            onClick = {this.onClickHandle}
                                        ></td>                                
                                    )
                                })}
                            </tr>
                            <tr 
                                className='table-row'
                                id = {hour.slice(0,3) + '30'}
                            >
                                {Array.apply(0, Array(7)).map((a, i) => {
                                    return(
                                        <td 
                                            className='table-data'
                                            key={i}    
                                            onClick = {this.onClickHandle}
                                        ></td>                                
                                    )
                                })}
                            </tr>
                        </>
                    )
                })}
            </>

        const weekDatesDisplay = startEndWeek[0] - startEndWeek[1] < 0 ? moment.months()[month] 
            : moment.months()[month -1].slice(0,3) + '-' + moment.months()[month].slice(0,3)

        return (
            <div className="weektable">

                <div className="top-bar">
                    <h3>{weekDatesDisplay} {startEndWeek[0]}-{startEndWeek[1]}, {year}</h3>
                    <ul>
                        <li><a href="#!">Today</a></li>
                        <li><a href="#!">Week</a></li>
                        <li><a href="#!">Work Week</a></li>
                        <li><a href="#!">Month</a></li>
                    </ul>
                </div>

                <table className='table fixed'>
                    <tbody>

                        <tr className='table-row table-row-heading '>
                        <th className='table-heading table-heading-first'></th>
                            {[0,1,2,3,4,5,6].map((a, i) => {
                                return(
                                    <th 
                                        className='table-heading'
                                        key={i}    
                                    >
                                        {weekDays[a]} <br />{this.futureDay(weekDate[0] + a).toString().slice(8,10)}
                                    </th>
                                )
                            })}
                            
                            
                        </tr>
                        {tableRow}
                    </tbody>
                </table>
                {modalEnable ? 
                    <Modal 
                        startTime = {startTime}  
                        cellDetails = {cellDetails}
                    /> : null
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state)
    return{
        modalEnable: state.toggleModal.modalEnable,
        tasks: state.addTask.tasks,
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        openModal: () => dispatch(openModal())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Weektable);