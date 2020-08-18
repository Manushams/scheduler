import React from 'react';

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

    render() {
        this.hours();

        const { hours } = this.state

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
                    <h3>August 17-23, 2020</h3>
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
                            <th className='table-heading'>Mon <br />17</th>
                            <th className='table-heading'>Tue <br />18 </th>
                            <th className='table-heading'>Wed <br />19</th>
                            <th className='table-heading'>Thu <br />20</th>
                            <th className='table-heading'>Fri <br />21</th>
                            <th className='table-heading'>Sat <br />22 </th>
                            <th className='table-heading'>Sun <br />23</th>
                        </tr>
                        {tableRow}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Weektable