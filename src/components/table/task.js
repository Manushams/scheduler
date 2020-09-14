export const Height = (task) => {
    //calculating the height of the card
    const startHour = parseInt(task.timeStart)
    const endHour = parseInt(task.timeEnd)
    const startMinutes = parseInt(task.timeStart.toString().slice(3,5))
    const endMinutes = parseInt(task.timeEnd.toString().slice(3,5))
    const startTotalMins = startHour * 60 + startMinutes
    const endTotalMins = endHour * 60 + endMinutes
    const heightTask = (endTotalMins - startTotalMins ) * (2/15)
    return heightTask
}

const Task = (task, numberOfTasks) => {
    const colors = [
        '#22D1EE',
        '#FC5185',
        '#5D5D5A',
        '#17B978'
    ]
    const randomColor = colors[Math.floor(Math.random()*10 % 4)]
    const height = Height(task)
    
    if(height > 0){
        var taskCard = document.createElement('div')
        var Card = document.createElement('div')
        
        Card.classList.add('task')
        Card.style.height = height + 'rem'
        Card.style.backgroundColor = '#17B978'
        Card.style.borderRadius = '0';
        Card.setAttribute('id', task.id)
        
        taskCard.classList.add('task')
        taskCard.setAttribute('id', task.id)
        taskCard.style.height = height + 'rem'
        taskCard.style.backgroundColor = '#17B978'
        var taskTitle = document.createElement('div')
        taskTitle.classList.add('task-title')
        var taskContent = document.createElement('div')
        taskContent.classList.add('task-content')

        var h3 = document.createElement('h3')
        h3.innerText = task.eventName

        var p = document.createElement('p')
        p.innerText = task.timeStart + '-' + task.timeEnd

        taskTitle.appendChild(h3)
        taskContent.appendChild(p)

        taskCard.appendChild(taskTitle)
        taskCard.appendChild(taskContent)

        return [taskCard, Card]
    }
    else if(height < 0){
        const modal = document.querySelector('.modal');
        let p = document.createElement('p')
        p.innerText = 'Wrong time input'
        p.classList.add('time-input-error')
        if(modal) {modal.appendChild(p)}

        return 'negative height'
    }
}

export default Task

