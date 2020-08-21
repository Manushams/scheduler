import React from 'react';
import moment from 'moment';

class Weektable extends React.Component {

    state = {
        hours: []
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

    loop = (i, item) => {
        for (let x = 0; x<i; x++){
            console.log(item)
        }
    }

    componentDidMount() {
        this.hours();
    }

    render() {
        const { hours } = this.state
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
                            <tr className='table-row'>
                                <th rowSpan="2" className='table-dataf'>{hour}</th>
                                {Array.apply(0, Array(7)).map((a, i) => {
                                    return(
                                        <td 
                                            className='table-data'
                                            key = {i}
                                            ></td>                                
                                    )
                                })}
                            </tr>
                            <tr className='table-row'>
                                {Array.apply(0, Array(7)).map((a, i) => {
                                    return(
                                        <td 
                                            className='table-data'
                                            key={i}    
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
            </div>
        )
    }
}

export default Weektable