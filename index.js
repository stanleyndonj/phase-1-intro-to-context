// Function to create an employee record
function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
    return {
      firstName: firstName,
      familyName: familyName,
      title: title,
      payPerHour: payPerHour,
      timeInEvents: [],
      timeOutEvents: []
    };
  }
  
  // Function to create multiple employee records
  function createEmployeeRecords(employeeData) {
    return employeeData.map(data => createEmployeeRecord(data));
  }
  
  // Function to add a "TimeIn" event to an employee record
  function createTimeInEvent(employee, dateStamp) {
    let [date, hour] = dateStamp.split(' ');
    employee.timeInEvents.push({
      type: "TimeIn",
      hour: parseInt(hour, 10),
      date: date
    });
    return employee;
  }
  
  // Function to add a "TimeOut" event to an employee record
  function createTimeOutEvent(employee, dateStamp) {
    let [date, hour] = dateStamp.split(' ');
    employee.timeOutEvents.push({
      type: "TimeOut",
      hour: parseInt(hour, 10),
      date: date
    });
    return employee;
  }
  
  // Function to calculate hours worked on a specific date
  function hoursWorkedOnDate(employee, date) {
    let timeInEvent = employee.timeInEvents.find(event => event.date === date);
    let timeOutEvent = employee.timeOutEvents.find(event => event.date === date);
    return (timeOutEvent.hour - timeInEvent.hour) / 100;
  }
  
  // Function to calculate wages earned on a specific date
  function wagesEarnedOnDate(employee, date) {
    let hours = hoursWorkedOnDate(employee, date);
    return hours * employee.payPerHour;
  }
  
  // Function to calculate total wages for an employee
  function allWagesFor(employee) {
    let dates = employee.timeInEvents.map(event => event.date);
    let totalWages = dates.reduce((total, date) => {
      return total + wagesEarnedOnDate(employee, date);
    }, 0);
    return totalWages;
  }
  
  // Function to calculate payroll for all employees
  function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce((total, employee) => {
      return total + allWagesFor(employee);
    }, 0);
  }
  
  // Example usage
  let employees = [
    ["Gray", "Worm", "Security", 1],
    ["Daenerys", "Targaryen", "CEO", 10]
  ];
  
  let employeeRecords = createEmployeeRecords(employees);
  
  createTimeInEvent(employeeRecords[0], "2024-07-30 0900");
  createTimeOutEvent(employeeRecords[0], "2024-07-30 1700");
  createTimeInEvent(employeeRecords[1], "2024-07-30 0900");
  createTimeOutEvent(employeeRecords[1], "2024-07-30 1700");
  
  console.log(calculatePayroll(employeeRecords)); // Output will be the total payroll
  
