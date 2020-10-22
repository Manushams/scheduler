import React from 'react';

class MonthTable extends React.Component{

    state = { 
        weekDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    }

    componentDidMount(){
        this.idTds();
        this.settingDays()
    }


    daysInMonth = (day) => {
        if(day)return (new Date(day.getYear(), day.getMonth() + 1, 0).getDate())
        if(!day)return (new Date(new Date().getYear(), new Date().getMonth() + 1, 0).getDate())
    }
    
    idTds = () => {
        const tds = document.querySelectorAll('td');
        let i = 0;
        tds.forEach(td => {
            i++
            td.setAttribute('id', i)
        });
    }

    settingDays = () => {
        const today = new Date(),
            dayOfWeek = new Date(today.getFullYear(), today.getMonth(), 1).getDay(),
            tds = document.querySelectorAll('td');        
        
        let i = 1
        tds.forEach(td => {
            console.log(typeof(dayOfWeek))
            if(td.id >= dayOfWeek && parseInt(td.id) - dayOfWeek < this.daysInMonth()){
                td.innerHTML = `<p className="day-month">${i}</p>`
                i++
            }                
        })    
    }

    render(){
        
        const {weekDays} = this.state,
            td = [...Array(5)].map(() => 
                <tr key={Math.random()} className='table-row'>
                    {[...Array(7)].map(() =>
                        <td key={Math.random()} className='table-data'></td>
                    )}
                </tr>
            )                                  
    
        return(
            <div className='monthtable'>
                <table className='table fixed'>
                    <thead>
                        <tr className='table-row table-row-heading-month'>
                            {weekDays.map((weekDay, i) => <th className='table-heading th-month' key={i}>{weekDay}</th>)}
                        </tr>

                    </thead>
                    
                    <tbody id='month-tbody'>
                        {td}
                    </tbody>

                </table>
            </div>
        )
    }
}
export default MonthTable
