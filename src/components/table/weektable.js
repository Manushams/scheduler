import React from 'react';
import moment from 'moment';
import Modal from './modal'

class Weektable extends React.Component {

    state = {
        hours: [],
        modalEnable: false,
        startTime: '',
        endtime: '',
        day: ''
    }

    componentDidMount() {
        this.hours();
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

    onClickHandle = (e) => {
        this.setState({
            startTime: e.target.parentElement.id
        })
        console.log(e.target.parentElement.parentElement)
        const tbody = e.target.parentElement.parentElement
        var th = tbody.querySelectorAll('.table-heading')

        var columnNum = e.target.cellIndex

        if(e.target.parentElement.rowIndex % 2 === 0){
            columnNum = e.target.cellIndex + 1
        }

        const day = th[columnNum].innerHTML.slice(8,)
        console.log('day' , day)

        console.log(document.querySelector('.top-bar h3').innerHTML.slice(14,))



    }

    render() {
        const { hours, startTime } = this.state
        const today = new Date()
        const dateToday = today.getDate();
        const dayWeek = today.getDay()
        const year = today.getFullYear()
        const month = today.getMonth() 
        const weekDate = [dateToday - dayWeek +1,dateToday + dayWeek -1 ] 
        
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
                                <th rowSpan="2" className='table-dataf'>{hour}</th>
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


        return (
            <div className="weektable">

                <div className="top-bar">
                    <h3>{moment.months()[month]} {weekDate[0]}-{weekDate[1]}, {year}</h3>
                    <ul>
                        <li><a href="#!">Today</a></li>
                        <li><a href="#!">Week</a></li>
                        <li><a href="#!">Work Week</a></li>
                        <li><a href="#!">Month</a></li>
                    </ul>
                </div>

                <table className='table'>
                    <tbody>

                        <tr className='table-row table-row-heading '>
                        <th className='table-heading table-heading-first'></th>
                            {[0,1,2,3,4,5,6].map((a, i) => {
                                return(
                                    <th 
                                        className='table-heading'
                                        key={i}    
                                    >
                                        {weekDays[a]} <br />{weekDate[0] + a}
                                    </th>
                                )
                            })}
                            
                            
                        </tr>
                        {tableRow}
                    </tbody>
                </table>
                <Modal startTime = {startTime}/>
            </div>
        )
    }
}

export default Weektable