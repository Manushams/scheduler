export const removeWithSameId = (htmlCollection) => {
    
    const items = htmlCollection

    const array = []
    for(let i=0; i < items.childElementCount; i++){
        const item = items.children.item(i)
    
        if(array.length){
    
            array.forEach(a => {
              if(a !== item.id)  {
                if(item.id){
                    array.push(item.id)
                }
              }else{

                  item.remove()
              }
            })
    
        }else{
            array.push(item.id)
        }
    }
}

export const setWidth = (td) => {
    const width = 100 / td.childElementCount - 4 
    
    for(let i=0; i < td.childElementCount; i++ ){
        var marginLeft = 100 / td.childElementCount - 1
        
        td.children.item(i).style.width = width + '%'
        if(i>=1){
            marginLeft = marginLeft * i
            td.children.item(i).style.marginLeft = marginLeft + '%'  
        } 
    }
}

export const Match2 = (tasks) =>{

    let array = []

    for(let i in tasks){
        const task = tasks[i];

        tasks.map(taskMap => {

            if(task.cellDetails.id !== taskMap.cellDetails.id && task.cellDetails.title === taskMap.cellDetails.title){
                if(Match(taskMap, task)){
                    if(!taskMap.checked || !taskMap.checked){
                    array.push([task, taskMap])
                    taskMap.checked = true
                    taskMap.direction = 'left'
                    task.checked = true
                    task.direction = 'right'
                }
                }
            }

        })
    }

    return(array)
}

export const Match = (task1, task2) => {
    
    const task1Mins = Count(task1);
    const task2Mins = Count(task2);

    const isMatch = task1Mins.filter(t1 => task2Mins.some(t2 => t1 === t2))

    if(isMatch.length){
        return true
    }else{
        return false
    }   
}

const HeighestTask = (tasks, day) => {
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
    for(let i = 0; i < totalMins; i++){
        startMinutes++
        if(startMinutes === 60){
            startMinutes = 0;
            startHour++
        }
        everyMinute.push(`${startHour}:${startMinutes}`)
    }
    return everyMinute
}

