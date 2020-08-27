const Task = (task) => {
    
    var taskCard = document.createElement('div')
    taskCard.classList.add('task')
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

    return taskCard
}

export default Task

