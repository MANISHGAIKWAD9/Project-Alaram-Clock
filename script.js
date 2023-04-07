// Get the clock element
const clockElement = document.getElementById('clock');

// Function to update the clock
function updateClock() {
  // Get the current time
  const now = new Date();

  // Format the time as hours:minutes:seconds AM/PM
  const timeString = now.toLocaleTimeString('en-US', { hour12: true });

  // Update the clock element
  clockElement.innerHTML = timeString;
}

// Update the clock every second
setInterval(updateClock, 1000);

// Get the alarm form and list elements
const alarmForm = document.getElementById('alarm-form');
const alarmList = document.getElementById('alarm-list');

// Function to add a new alarm to the list
function addAlarm(hour, minute, second, ampm) {
  // Create a new list item for the alarm
  const alarmItem = document.createElement('li');
  alarmItem.classList.add('list-group-item');

  // Format the alarm time as hours:minutes:seconds AM/PM
  const alarmTimeString = `${hour}:${minute.toString().padStart(2, '0')}:${second.toString().padStart(2, '0')} ${ampm}`;

  // Create a text node with the alarm time and add it to the list item
  const alarmText = document.createTextNode(alarmTimeString);
  alarmItem.appendChild(alarmText);

  // Create a delete button for the alarm and add it to the list item
  const deleteButton = document.createElement('button');
  deleteButton.classList.add('btn', 'btn-danger', 'btn-sm', 'float-right', 'ml-2');
  deleteButton.innerHTML = '&times;';
  deleteButton.addEventListener('click', () => {
    // Remove the alarm from the list
    alarmList.removeChild(alarmItem);
  });
  alarmItem.appendChild(deleteButton);

  // Add the new alarm to the list
  alarmList.appendChild(alarmItem);

  // Schedule the alarm to go off
  const now = new Date();
  let alarmTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, minute, second);
  if (ampm === 'PM') {
    alarmTime.setHours(alarmTime.getHours() + 12);
  }
  const timeUntilAlarm = alarmTime.getTime() - now.getTime();
  setTimeout(() => {
    alert(`Alarm for ${alarmTimeString}`);
  }, timeUntilAlarm);
}

// Function to handle the alarm form submission
function handleAlarmFormSubmit(event) {
  event.preventDefault();

  // Get the form input values
  const hour = parseInt(alarmForm['alarm-hour'].value);
  const minute = parseInt(alarmForm['alarm-minute'].value);
  const second = parseInt(alarmForm['alarm-second'].value);
  const ampm = alarmForm['alarm-am-pm'].value;

  // Add the new alarm to the list
  addAlarm(hour, minute, second, ampm);

  // Reset the form
  alarmForm.reset();
}

// Add an event listener for the alarm form submission
alarmForm.addEventListener('submit', handleAlarmFormSubmit);