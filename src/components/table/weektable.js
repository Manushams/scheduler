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
        
        
        const tableRow =
            <>
                {hours && hours.map((hour) => {
                    return (
                        <>
                            <tr className='table-row'>
                                <th rowSpan="2" className='table-dataf'>{hour}</th>
                                <td className='table-data'></td>
                                <td className='table-data'></td>
                                <td className='table-data'></td>
                                <td className='table-data'></td>
                                <td className='table-data'></td>
                                <td className='table-data'></td>
                                <td className='table-data'></td>
                            </tr>
                            <tr className='table-row'>
                                <td className='table-data'></td>
                                <td className='table-data'></td>
                                <td className='table-data'></td>
                                <td className='table-data'></td>
                                <td className='table-data'></td>
                                <td className='table-data'></td>
                                <td className='table-data'></td>
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
                            <th className='table-heading'>Mon <br />{weekDate[0]}</th>
                            <th className='table-heading'>Tue <br />{weekDate[0] + 1} </th>
                            <th className='table-heading'>Wed <br />{weekDate[0] + 2}</th>
                            <th className='table-heading'>Thu <br />{weekDate[0] + 3}</th>
                            <th className='table-heading'>Fri <br />{weekDate[0] + 4}</th>
                            <th className='table-heading'>Sat <br />{weekDate[0] + 5} </th>
                            <th className='table-heading'>Sun <br />{weekDate[0] + 6}</th>
                        </tr>
                        {tableRow}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Weektable