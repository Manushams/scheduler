import React from 'react';
import PostCard from './postCard'

class Section extends React.Component{

    state = {
        daysInWeek: null
    }

    componentDidMount(){
        this.addDays()
    }

    addDays = () => {
        let days = [],
            today = new Date(),
            date = today.getDate(),
            month = today.getMonth(),
            year = today.getFullYear();

        for(let i = 0; i < 8; i++){
            days.push(new Date(year, month, date+i))
        }

        this.setState({
            daysInWeek: days
        })
    }

    weekDay = (day) => {
        let today = new Date(),
            date = today.getDate(),
            month = today.getMonth(),
            year = today.getFullYear();

        if(day.toString().slice(0,15) === new Date().toString().slice(0,15)){
            return 'Today'
        }else if(day.toString().slice(0,15) === new Date(year, month, date+1).toString().slice(0,15)){
            return 'Tomorrow'
        }else{
            return day.toLocaleString('default', { weekday: 'long' })
        }
    }

    dateToString = (date) => {
        return new Date(date).toString().slice(0, 15)
    }

    render(){
        const {daysInWeek} = this.state,
            {tasks} = this.props
        
        return(
            <>
                {daysInWeek && daysInWeek.map((day, i) => (
                    
                    <div className="section" key = {i}>
                        <div className="post-day">
                            <h3>{this.weekDay(day)}</h3>
                            <p>{day.toLocaleString('default', { month: 'short' })} {day.getDate()}</p>
                        </div>
                        {tasks && tasks.map(task => {
                                                        
                            if(this.dateToString(task.date) === this.dateToString(day)){
                                return(
                                    <PostCard 
                                        task = {task}
                                        key = {task.id}
                                    />
                                )
                            }
                        })}
                   </div>

                ))}
            </>
        )
    }
}
export default Section;