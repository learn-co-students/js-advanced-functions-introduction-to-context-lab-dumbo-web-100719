// Your code here
let createEmployeeRecord = (array) => {
    return {
        firstName: array[0],
        familyName: array[1], 
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents:[]
    }
}

let createEmployeeRecords = (array) => {
   return array.map((employee) => {
        return createEmployeeRecord(employee)
    })
}

let createTimeInEvent = (employee, event) => {
    let [date, hour] = event.split(" ")
    employee.timeInEvents.push({
        type: 'TimeIn',
        date,
        hour: parseInt(hour)
    })
    return employee
}

let createTimeOutEvent = (employee, event) =>{
    let [date, hour] = event.split(" ")
    employee.timeOutEvents.push({
        type: 'TimeOut',
        date,
        hour: parseInt(hour)
    })
    return employee 
}

let hoursWorkedOnDate = (employee, date) =>{

    let timeIn = employee.timeInEvents.find(function(e){
        return e.date === date
    })

    let timeOut = employee.timeOutEvents.find(function(e){
        return e.date === date
    })

    return (timeOut.hour - timeIn.hour) / 100
}

let wagesEarnedOnDate = (employee, date) => {
    let wagesEarned = hoursWorkedOnDate(employee, date) * employee.payPerHour
    return wagesEarned
}

let allWagesFor = (employee) => {
    let eligibleDates = employee.timeInEvents.map((e) => {
        return e.date
    })

    let payable = eligibleDates.reduce((total, d) => {
        return total + wagesEarnedOnDate(employee, d)
    }, 0)

    return payable
}

let findEmployeeByFirstName = (array, firstName) => {
    let match = array.find((name) => {
        return firstName === name.firstName
    })
    return match
}

let calculatePayroll = (array) => {
    return array.reduce((total, employee) => {
        return total + allWagesFor(employee)
    }, 0)
}