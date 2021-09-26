var timeblockTableEl = document.querySelector('#timeblock-table');
var currentDayEl = document.querySelector('#currentDay');

//the time of the day that work will start for most users. can be changed so that the user can adjust their days
var startWorkDay = 9;
// working in military time. time of the work day that will end
var endWorkDay = 17;
var storedContent = [];

setInterval(function(){
    //will update the moment() every second. just to keep a running clock
    currentDayEl.textContent = moment().format('dddd, MMMM Do hh:mm:ss');
}, 1000)

//this statement will check to see if the local storage is empty so that we don't run into null error pulls later in the code
if (localStorage.getItem('storedContent') != null) {
    storedContent = JSON.parse(localStorage.getItem('storedContent'));
}


for (var i = startWorkDay; i <= endWorkDay; i++) {
    //need a variable that will keep track for the index of the storedContent array
    let index = i - startWorkDay;
    let workHour;

    //creates the string that will be used to anotate the work hour of the day, after being converted from military time to standard time
    if (i > 12) {
        workHour = (i - 12).toString() + " PM";
    } else {
        workHour = i.toString() + " AM";
    }

    let trElement = document.createElement('tr');
    let tableHourEl = document.createElement('td');
    let tableContentEl = document.createElement('td');
    let tableSaveEl = document.createElement('td');

    //1st column, time of the block
    tableHourEl.textContent = workHour;
    tableHourEl.classList.add('border-top', 'border-bottom', 'pr-3');
    tableHourEl.setAttribute('id', index);
    
    //2nd column, editable content that the user can enter data
    tableContentEl.classList.add('border', 'cw-1', 'pl-3');
    tableContentEl.setAttribute('id', 'table-content');
    console.log(storedContent[i])
    if (storedContent[index] != null) {
        //this will skip any elements that are null
        tableContentEl.textContent = storedContent[index];
    }
    tableContentEl.setAttribute('contenteditable', true);
    
    //3rd column, save button
    tableSaveEl.setAttribute('id', 'save-button');
    tableSaveEl.classList.add('border', 'px-3','bg-primary', 'fas', 'fa-save', 'fa-3x', 'cw-2', 'd-flex', 'justify-content-center', 'align-items-center');

    //condition statement that checks whether or not the time has passed the current block or not
    if(i < moment().format('H')) {
        tableContentEl.classList.add('bg-secondary');
        //stops the user from editting the past content
        tableContentEl.setAttribute('contenteditable', false)
        tableSaveEl.removeAttribute('id');
    } else if (i > moment().format('H')) {
        tableContentEl.classList.add('bg-success');  
    } else {
        tableContentEl.classList.add('bg-danger');
    }

    //append all the <td>s to the <tr>
    //then append the <tr> to the <table>
    trElement.append(tableHourEl);
    trElement.append(tableContentEl);
    trElement.append(tableSaveEl);
    timeblockTableEl.append(trElement);
}

timeblockTableEl.addEventListener('click', function(event) {
    if (event.target.getAttribute('id') == 'save-button') {
            let childrenArray = event.target.parentNode.childNodes;
            //gets the siblings of the buttons rather than just a generic id call that can accidentally referecence another element that i dont want to access
            let savedContent = childrenArray[1].textContent;
            let index = childrenArray[0].getAttribute('id');
            storedContent[index] = savedContent;
            console.log(savedContent)
            setContent();
    }
})

function setContent() {
    localStorage.setItem('storedContent', JSON.stringify(storedContent));
}