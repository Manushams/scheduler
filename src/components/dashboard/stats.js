import React from 'react';
import Chart from 'react-apexcharts'

class Stats extends React.Component{
    
    details = (categ, data) => {
        const categShort = categ && categ.map(c => c.slice(0, 6)),
        chartDetails = {
            option: {
                chart: {id: 'taskStats'},
                xaxis: {categories: categShort},
                title: {
                    text: 'Number of Completed Tasks per Day',
                    align: 'center',
                    margin: 10,
                    style: {
                        fontWeight: 'bold',
                    }
                }
            },
            series: [
                {
                    name: 'Tasks completed',
                    data,
                }
            ]
        }
        return [chartDetails.option, chartDetails.series]
    } 

     chartSeries = () => {
        const {tasks} = this.props;
        let completedTasks = tasks && tasks.filter(task => task.completed === true),
            categories = []

        completedTasks && completedTasks.sort((t1, t2) => 
            Date.parse(t1.date) - Date.parse(t2.date)  
        )

        completedTasks && completedTasks.forEach(task => {
            const date = new Date(task.date),
                day = date.getDate(),
                month = date.toLocaleString('default', {month: 'short'}),
                year = date.getFullYear()
            
            categories.push(`${month} ${day}, ${year}`)
        })
        //remove identical ones
        categories = Array.from(new Set(categories))
        return categories
    }

    chartData = () => {
        const {tasks} = this.props,
            categ = this.chartSeries(),
            data = [];

        const convertToDate = (str) => new Date(str).toString().slice(0, 15);

        tasks && categ && categ.forEach(cat => {
            let matches = 0;
            tasks.forEach(task => {
                if(task.completed && convertToDate(cat) === convertToDate(task.date)){
                    matches++;
                }
            })
            data.push(matches)
        })

        return data;
    }

    render(){
        const {tasks, upcomingTasks} = this.props,
            total = tasks && tasks.length;
        let completed = 0;

        tasks && tasks.forEach(task => {
            if(task.completed)completed++;
        })
        
        let overdue = tasks && upcomingTasks && tasks.length - upcomingTasks.length - completed;

        return(
            <>
                <h3 className='stats-title'>Stats</h3>
                <div className="stats-content">
                    <div className="stats-task">
                        <h3>Tasks</h3>
                        <div className='info-tasks'>
                            <div className="stat">
                                <p>Total</p>
                                <h4>{total ? total : 0}</h4>
                            </div>
                            <div className="stat">
                                <p>Completed</p>
                                <h4>{completed}</h4>
                            </div>
                            <div className="stat">
                                <p>Overdue</p>
                                <h4>{overdue ? overdue : 0}</h4>
                            </div>
                        </div>
                    </div>

                    {tasks ?
                        <Chart
                            options={this.details(this.chartSeries(), this.chartData())[0]}
                            series={this.details(this.chartSeries(), this.chartData())[1]}
                            type="bar"
                            width="100%"
                            className='chart'
                        /> : null                
                    }

                </div>
            </>
        )
    }
}

export default Stats;