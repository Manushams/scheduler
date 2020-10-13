import React from 'react';

class MonthTable extends React.Component{

    state = { 
        weekDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    }

    daysInMonth = (day) => {
        if(day)return (new Date(day.getYear(), day.getMonth() + 1, 0).getDate())
        if(!day)return (new Date(new Date().getYear(), new Date().getMonth() + 1, 0))
    }

    render(){
        const {weekDays} = this.state,
            today = new Date(),
            dayOfWeek = new Date(today.getFullYear(), today.getMonth(), 1).getDay(),
            td = document.createElement('td')

        return(
            <div className='monthtable'>
                <table className='table fixed'>
                    <thead>
                        <tr>
                            {weekDays.map((weekDay, i) => <th key={i}>{weekDay}</th>)}
                        </tr>
                    </thead>
                </table>
            </div>
        )
    }
}
export default MonthTable
