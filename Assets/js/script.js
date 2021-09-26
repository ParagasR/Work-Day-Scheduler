var timeblockTableEl = document.querySelector('#timeblock-table');
var currentDayEl = document.querySelector('#currentDay');


var startWorkDay = 9;
// working in military time
var endWorkDay = 17;

currentDayEl.textContent = moment().format('dddd, MMMM Do');

renderTable();





function renderTable() {
    var workHour;

    for (var i = startWorkDay; i <= endWorkDay; i++) {
        if (i > 12) {
            workHour = (i - 12).toString() + " PM";
        } else {
            workHour = i.toString() + " AM";
        }
    
        var trElement = document.createElement('tr');

        var tableHourEl = document.createElement('td');
        tableHourEl.textContent = workHour;
        tableHourEl.classList.add('border-top', 'border-bottom');
        trElement.append(tableHourEl);

        var tableContentEl = document.createElement('td');
        tableContentEl.classList.add('border');
        var tablePContentEl = document.createElement('p');
        tablePContentEl.setAttribute('contenteditable', true);

        if(i < moment().format('H')) {
            tableContentEl.classList.add('bg-secondary');
        } else if (i > moment().format('H')) {
            tableContentEl.classList.add('bg-success');  
        } else {
            tableContentEl.classList.add('bg-danger');
        }


        tableContentEl.append(tablePContentEl);
        trElement.append(tableContentEl);

        var tableSaveEl = document.createElement('td');
        tableSaveEl.classList.add('border', 'px-3');
        tableSaveEl.textContent = 'Save';
        trElement.append(tableSaveEl);
    
        // console.log(trElement);
        timeblockTableEl.append(trElement);
    }
}
