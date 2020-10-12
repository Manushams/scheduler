import React from 'react';

class MonthTable extends React.Component{

    daysInMonth = (day) => {
        if(day)return (new Date(day.getYear(), day.getMonth() + 1, 0).getDate())
        if(!day)return (new Date(new Date().getYear(), new Date().getMonth() + 1, 0))
    }

    render(){
        const td = document.createElement('td')
        const today = new Date();
        const dayOfWeek = new Date(today.getFullYear(), today.getMonth(), 1).getDay()
        
        return(
            <div className='monthtable'>
                <table>

                </table>
            </div>
        )
    }
}
export default MonthTable
