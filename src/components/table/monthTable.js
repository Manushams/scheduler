import React from 'react';

class MonthTable extends React.Component{

    state = { 
        weekDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    }

    daysInMonth = (day) => {
        if(day)return (new Date(day.getYear(), day.getMonth() + 1, 0).getDate())
        if(!day)return (new Date(new Date().getYear(), new Date().getMonth() + 1, 0).getDate())
    }

    render(){

        const {weekDays} = this.state,
            today = new Date(),
            dayOfWeek = new Date(today.getFullYear(), today.getMonth(), 1).getDay(),
            //td = document.createElement('td')
            td = () => {
                
                return(
                    <tr className='table-row'>
                        {Array.apply(0, Array(7)).map(() =>
                            <td className='table-data'>asdf</td>
                        )}
                    </tr>
                )
            }
    
        return(
            <div className='monthtable'>
                <table className='table fixed'>
                    
                    <tr className='table-row table-row-heading-month'>
                        {weekDays.map((weekDay, i) => <th className='table-heading th-month' key={i}>{weekDay}</th>)}
                    </tr>
                    
                    <tbody>
                        {td()}
                    </tbody>

                </table>
            </div>
        )
    }
}
export default MonthTable
