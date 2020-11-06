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
    console.log(width)
    return width
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

export const NarrowestWidth = (tasks) => {

    let tasksArray = [];

    for(let task in tasks){
        if(tasks[task].tagName === 'DIV'){        
            const div = tasks[task]
            tasksArray.push([
                div['id'],
                div.offsetWidth
            ])
        }
    }

    tasksArray.sort((a, b) => a[1] - b[1])
    
    const heighest = tasksArray[0]
    
    let tasks1 = []

    for(let num in tasks){
        if(tasks[num].tagName === 'DIV'){
            tasks1.push(tasks[num])
        }
    }
    
    const lowestObj = tasks1.filter(task => task.id === heighest[0])

    return lowestObj[0].offsetWidth
}

export const AdjustWidth = (divs, width) => {
    //const width = NarrowestWidth(divs);
    
    let idsAll = [];
    let allTaskDivs = []
    
    for(let num in divs){
        const div = divs[num]

        if(div.tagName === 'DIV'){
            idsAll.push(div.id)
            allTaskDivs.push({id: div.id, margin: window.getComputedStyle(div).marginLeft})
        }
    }    

    let ids = [...new Set(idsAll)]
    
    ids.forEach(id => {
        const taskDivs = document.querySelectorAll('#' + CSS.escape(`${id}`))

        taskDivs.forEach(div => {
            div.style.width = width+'%';
            
            allTaskDivs.map(details => {
                if(div.id === details.id){
                    div.style.marginLeft = details.margin        
                }
            })
        })

    })
}

export const WidthAdjust = (divs) => {
    const arrayDivs = []
    
    
    for(let div in divs){
        arrayDivs.push(divs.item(div))
    }

    const width = NarrowestWidth(arrayDivs);
    console.log(divs)
    console.log('width',width)

    divs.forEach(div => {
        div.style.width = width+'%'
        
    })
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

export const removeChildren = () => {
    const tdAll = document.querySelectorAll('td');

    tdAll.forEach(td => {
        if (td.childElementCount > 0){
            td.innerHTML = ''
        }
    })
}

export const todayTd = (td) => {
    const width = (100 / td.childElementCount ) - 4 

    for(let i in td.children){
        const div = td.children.item(i)
        if(div.tagName === 'DIV'){
            div.style.width = width + '%'
            // if(parseInt(i) >= 1){
            //     div.style.marginLeft = width*parseInt(i) + 3 + '%'
            // }
        }
    } 
    
   settignWidth()
}

const settignWidth = () => {

    const taskDivs = document.querySelectorAll('.task');

    let tasksIds = [];

    taskDivs.forEach(taskDiv => {
        if(tasksIds.length===0 || !tasksIds.find(id => id === taskDiv.id)){
            tasksIds.push(taskDiv.id)
        }
    })

    tasksIds.forEach(id => {
        let divsOfSameTask = []
        taskDivs.forEach(div => {
            if(div.id === id){
                divsOfSameTask.push(div);
            }
        })

        //divsOfSameTask.forEach(div => console.log(div.offsetWidth))
        divsOfSameTask.sort((a, b) => a.offsetWidth - b.offsetWidth)
        const minWidthDiv = divsOfSameTask[0];
        divsOfSameTask.forEach(div => {
            const style = div.currentStyle || window.getComputedStyle(div);
            div.style.width = minWidthDiv.offsetWidth +'px'
            //div.style.marginLeft =( (minWidthDiv.offsetWidth + 10) * i) + 'px'
            
        })
        
        
    })

}