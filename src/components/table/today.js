import React from 'react'

class Today extends React.Component{

    render(){
        const today = new Date()
        return(
            <div className='today'>
                <div className="top-bar">
                    <div>
                        <h3>
                            {today.toLocaleString('default', {month: 'long'})} {today.getDate()}, {today.getFullYear()}
                        </h3>
                        <input id='top-bar-calendar' type="date" onChange={this.handleMonthChange}/>
                    </div>
                        <ul>
                            <li><a href="#!">Today</a></li>
                            <li><a href="/">Week</a></li>
                            <li><a href="#!">Work Week</a></li>
                            <li><a href="/month">Month</a></li>
                        </ul>
                </div>
                <table className="table fixed">
                    <thead>
                        <tr className='table-row'>
                            <th className='table-heading' colSpan='2'>00:00</th>
                        </tr>
                    </thead>
                    <tr  className='table-row'><td className='table-data'></td></tr>
                    <tr  className='table-row'><td className='table-data'></td></tr>
                </table>
            </div>
        )
    }

}
export default Today;