import React from 'react';

class MonthTable extends React.Component{
    daysInMonth = (day) => {
        if(day)return (new Date(day.getYear(), day.getMonth(), 0))
        if(!day)return (new Date(new Date().getYear(), new Date().getMonth(), 0))
    }
    render(){
        const td = document.createElement('td')
        return(
            <div className='monthtable'>
                <table>

                </table>
            </div>
        )
    }
}
export default MonthTable
