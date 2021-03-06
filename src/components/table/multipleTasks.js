import {openDetailsModal} from '../../store/actions/toggleModalAction';
import {store} from '../../index'

export const removeWithSameId = (htmlCollection) => {

    const items = htmlCollection

    const array = []
    for (let i = 0; i < items.childElementCount; i++) {
        const item = items.children.item(i)

        if (array.length) {
            array.forEach(a => {
                if (a !== item.id) {
                    if (item.id) {
                        array.push(item.id)
                    }
                } else {
                    item.remove()
                }
            })
        } else {
            array.push(item.id)
        }
    }
}

export const setWidth = (td) => {
    const width = 100 / td.childElementCount - 4

    for (let i = 0; i < td.childElementCount; i++) {
        var marginLeft = 100 / td.childElementCount - 1

        td.children.item(i).style.width = width + '%'
        if (i >= 1) {
            marginLeft = marginLeft * i
            td.children.item(i).style.marginLeft = marginLeft + '%'
        }
    }
    console.log(width)
    return width
}

export const Match = (task1, task2) => {

    const task1Mins = Count(task1);
    const task2Mins = Count(task2);

    const isMatch = task1Mins.filter(t1 => task2Mins.some(t2 => t1 === t2))

    if (isMatch.length) {
        return true
    } else {
        return false
    }
}

export const NarrowestWidth = (tasks) => {

    let tasksArray = [];

    for (let task in tasks) {
        if (tasks[task].tagName === 'DIV') {
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

    for (let num in tasks) {
        if (tasks[num].tagName === 'DIV') {
            tasks1.push(tasks[num])
        }
    }

    const lowestObj = tasks1.filter(task => task.id === heighest[0])

    return lowestObj[0].offsetWidth
}

export const AdjustWidth = (divs, width) => {
    
    let idsAll = [];
    let allTaskDivs = []

    for (let num in divs) {
        const div = divs[num]

        if (div.tagName === 'DIV') {
            idsAll.push(div.id)
            allTaskDivs.push({ id: div.id, margin: window.getComputedStyle(div).marginLeft })
        }
    }

    let ids = [...new Set(idsAll)]

    ids.forEach(id => {
        const taskDivs = document.querySelectorAll('#' + CSS.escape(`${id}`))

        taskDivs.forEach(div => {
            div.style.width = width + '%';

            allTaskDivs.forEach(details => {
                if (div.id === details.id) {
                    div.style.marginLeft = details.margin
                }
            })
        })

    })
}

export const WidthAdjust = (divs) => {
    const arrayDivs = []


    for (let div in divs) {
        arrayDivs.push(divs.item(div))
    }

    const width = NarrowestWidth(arrayDivs);
    console.log(divs)
    console.log('width', width)

    divs.forEach(div => {
        div.style.width = width + '%'

    })
}

export const HeighestTask = (tasks, day) => {
    const tasksOnDay = tasks.filter(task => task.cellDetails.title === day)

    let tasksArray = [];

    for (let task in tasksOnDay) {
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
    var startMinutes = parseInt(task.timeStart.toString().slice(3, 5))
    var endMinutes = parseInt(task.timeEnd.toString().slice(3, 5))
    const startTotalMins = startHour * 60 + startMinutes
    const endTotalMins = endHour * 60 + endMinutes
    const totalMins = endTotalMins - startTotalMins
    const everyMinute = []

    startMinutes = startMinutes - 1
    for (let i = 0; i < totalMins; i++) {
        startMinutes++
        if (startMinutes === 60) {
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
        if (td.childElementCount > 0) {
            td.innerHTML = ''
        }
    })
}

export const todayTd = (td) => {
    const width = (100 / td.childElementCount) - 4

    for (let i in td.children) {
        const div = td.children.item(i)
        if (div.tagName === 'DIV') {
            div.style.width = width + '%'
            if (parseInt(i) >= 1) {
                const divWithSameId = document.querySelector('#' + CSS.escape(`${div.id}`)),
                    minMarginLeft = parseInt(divWithSameId.style.marginLeft.toString().slice(0, 2))
                if (!minMarginLeft || minMarginLeft > (width + 3) * parseInt(i)) {
                    const divsWithSameId = document.querySelectorAll('#' + CSS.escape(`${div.id}`))
                    divsWithSameId.forEach(div => {
                        div.style.marginLeft = (width + 3) * parseInt(i) + '%'
                    })
                }
            }
        }
    }

    settignWidth();
}

const settignWidth = () => {

    const taskDivs = document.querySelectorAll('.task');

    let tasksIds = [];

    taskDivs.forEach(taskDiv => {
        if (tasksIds.length === 0 || !tasksIds.find(id => id === taskDiv.id)) {
            tasksIds.push(taskDiv.id)
        }
    })

    tasksIds.forEach(id => {
        let divsOfSameTask = []
        taskDivs.forEach(div => {
            if (div.id === id) {
                divsOfSameTask.push(div);
            }
        })

        divsOfSameTask.sort((a, b) => a.offsetWidth - b.offsetWidth)
        const minWidthDiv = divsOfSameTask[0];
        divsOfSameTask.forEach(div => {
            //const style = div.currentStyle || window.getComputedStyle(div);
            div.style.width = minWidthDiv.offsetWidth + 'px'
        })
    })
}

export const getHours = (task) => {
    return [parseInt(task.timeStart.slice(0, 2)), parseInt(task.timeEnd.slice(0, 2))]
}

export const getMins = (task) => {
    return [parseInt(task.timeStart.slice(3, 5)), parseInt(task.timeEnd.slice(3, 5))]
}

export const totalMins = (task) => {
    return [(getHours(task)[0] * 60 + getMins(task)[0]), (getHours(task)[1] * 60 + getMins(task)[1])]
}

export const setWidthDay = (divWeekday) => {
    const divs = divWeekday ? divWeekday : document.querySelectorAll('.task-div')
    let matchingDivs = [],
        divsArray = []

    for (let num = 0; num < divs.length; num++) {
        const div = divs[num]
        divsArray.push(div)
    }
    divsArray.sort((a, b) => b.offsetHeight - a.offsetHeight)

    divsArray.forEach(div => {
        const time = spanToNum(div.querySelector('span').innerText)

        divsArray.forEach(div2 => {
            const time2 = spanToNum(div2.querySelector('span').innerText)

            if ((time2[0] >= time[0]) &&
                (time2[0] <= time[1])
            ) {
                matchingDivs.push(div2)
                divsArray = divsArray.filter(div3 => div3.id !== div2.id)

            } else if ((time2[1] >= time[0]) && (time2[1] <= time[1])) {
                matchingDivs.push(div2)
                divsArray = divsArray.filter(div3 => div3.id !== div2.id)
            }
        })
        matchingDivs = Array.from(new Set(matchingDivs))

        for (let num in matchingDivs) {
            const div = matchingDivs[num];
            div.style.width = (93 / matchingDivs.length) - 4 + '%';
            div.style.left = ((93 / matchingDivs.length) - 2) * num + '%'
        };
        matchingDivs = []

    })
}

export const spanToNum = (time) => {
    const hrsStart = parseInt(time.slice(0, 2)),
        minsStart = parseInt(time.slice(3, 5)),
        hrsEnd = parseInt(time.slice(6, 8)),
        minsEnd = parseInt(time.slice(9, 11)),
        startTotalMins = hrsStart * 60 + minsStart,
        endTotalMins = hrsEnd * 60 + minsEnd

    return [startTotalMins, endTotalMins, hrsStart, minsStart, hrsEnd, minsEnd]
}

export const removeIdenticalDivs = () => {
    const divs = document.querySelectorAll('.task-div');
    let ids = []

    divs.forEach(div => ids.push(div.id))
    ids = Array.from(new Set(ids));

    ids.forEach(id => {
        const tasks = document.querySelectorAll('#' + CSS.escape(`${id}`));

        if (tasks.length > 1) {
            for (let num in tasks) {
                let task = tasks[num]
                if (parseInt(num) > 0) task.remove()
            }
        }
    })
}

export const removeTaskDivs = (taskDivs) => {
    taskDivs.forEach(task => {
        task.remove()
    })
}

export const displayTask = (task, divParent) => {
    const div = document.createElement('div'),
        p = document.createElement('p'),
        top = totalMins(task)[0] * 2.19 / 60 + 'rem';

    div.classList.add('task-div');
    div.style.height = task.height * 2.175 / 60 + 'rem'
    div.style.top = top;
    div.setAttribute('id', task.id)
    div.setAttribute('data-date', task.date)
    div.setAttribute('data-id', task.id)
    div.setAttribute('data-start', task.timeStart)
    div.setAttribute('data-end', task.timeEnd)
    div.setAttribute('data-name', task.eventName)
    p.innerHTML = `${task.eventName}<br/><span>${task.timeStart}-${task.timeEnd}</span>`
    div.appendChild(p);
    divParent.appendChild(div)
}

export const taskDetails = () => {
    const taskDivs = document.querySelectorAll('.task-div'),
        taskDivsMonth = document.querySelectorAll('.task-month');

    taskDivs.forEach(task  => {
        task.addEventListener('click', () => store.dispatch(openDetailsModal(task.dataset)))
    })

    taskDivsMonth.forEach(task  => {
        task.addEventListener('click', () => store.dispatch(openDetailsModal(task.dataset)))
    })
}
