const Filter = (tasks, day) => {
    const tasksOnDay = tasks.filter(task => task.cellDetails.title === day)

    let tasksArray = [];

    for(let task in tasksOnDay){
        tasksArray.push([
            tasksOnDay[task]['cellDetails']['id'],
            tasksOnDay[task]['height']
         ])
    }

    tasksArray.sort((a, b) => b[1] - a[1])
    
    const heighest = tasksArray[0]

    const heighestObj = tasksOnDay.filter(task => task.cellDetails.id === heighest[0])
    return heighestObj
}

const Count = (task) => {
    var startHour = parseInt(task.timeStart)
    var endHour = parseInt(task.timeEnd)
    var startMinutes = parseInt(task.timeStart.toString().slice(3,5))
    var endMinutes = parseInt(task.timeEnd.toString().slice(3,5))
    const startTotalMins = startHour * 60 + startMinutes
    const endTotalMins = endHour * 60 + endMinutes
    const totalMins = endTotalMins - startTotalMins
    const everyMinute = []

    startMinutes = startMinutes - 1
    for(let i = 0; i <= totalMins; i++){
        startMinutes++
        console.log(startMinutes)
        if(startMinutes === 60){
            startMinutes = 0;
            startHour++
        }
        everyMinute.push(`${startHour}:${startMinutes}`)
    }
    return everyMinute
}

const Match = (task1, task2) => {
    const task1Mins = Count(task1);
    const task2Mins = Count(task2);

    const isMatch = task1Mins.filter(t1 => task2Mins.some(t2 => t1 === t2))
    console.log(isMatch)
    if(isMatch.length){
        return true
    }else{
        return false
    }

}
