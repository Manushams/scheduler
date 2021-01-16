import React from 'react';
import Chart from 'react-apexcharts'

class Stats extends React.Component{
    
    details = (categ, data) => {
        const chartDetails = {
            option: {
                chart: {id: 'taskStats'},
                xaxis: {categories: categ}
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
        const {tasks} = this.props,
            categories = []
        let completedTasks = tasks && tasks.filter(task => task.completed === true);

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
                if(convertToDate(cat) === convertToDate(task.date)){
                    matches++;
                }
            })
            data.push(matches)

        })

        return data
    }

    render(){
        const {tasks, upcomingTasks} = this.props,
            overdue = tasks && upcomingTasks && tasks.length - upcomingTasks.length,
            total = tasks && tasks.length;
        let completed = 0;

        upcomingTasks && upcomingTasks.forEach(task => {
            if(task.completed)completed++;
        })

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
                </div>
                
                {tasks ?
                    <Chart
                        options={this.details(this.chartSeries(), this.chartData())[0]}
                        series={this.details(this.chartSeries(), this.chartData())[1]}
                        type="bar"
                        width="400"
                        className='chart'
                    /> : null                
                }
            </>
        )
    }
}

export default Stats;