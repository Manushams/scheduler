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
            tds = document.querySelectorAll('td');
        let dayOfWeek = new Date(today.getFullYear(), today.getMonth(), 1).getDay(),
            daysPrevMonth = this.daysInMonth(new Date(today.getFullYear(), today.getMonth())),      
            day = 1,
            dayNextMonth = 1;

        if(dayOfWeek === 0){dayOfWeek=7}

        daysPrevMonth = daysPrevMonth-dayOfWeek+1
        tds.forEach(td => {
            
            if(td.id >= dayOfWeek && parseInt(td.id) - dayOfWeek < this.daysInMonth()){
                td.innerHTML = `<p class="day-month">${day}</p>`
                day++
            }else if(td.id < dayOfWeek){
                td.innerHTML = `<p class="day-other-month">${daysPrevMonth}</p>`
                daysPrevMonth++
            }else if(parseInt(td.id) - dayOfWeek >= this.daysInMonth()){
                td.innerHTML = `<p class="day-other-month">${dayNextMonth}</p>`;
                dayNextMonth++
            }

        })    
    }

    render(){
        
        const {weekDays} = this.state,
            td = [...Array(6)].map(() => 
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
