document.addEventListener("DOMContentLoaded", function() {
  let appointmentTimes = [];
  let request = new XMLHttpRequest();
  let url = `https://s3.amazonaws.com/wheelhouse-cdn/wheelhouse-www/assets/timeslotdata.json`;

   request.onreadystatechange = function() {
     if (this.readyState === 4 && this.status === 200) {
       let response = JSON.parse(this.responseText);
       getElements(response);
     }
   }

   request.open("GET", url, true);
   request.send();

   getElements = function(response) {
     let timeSlots = response['scheduleDays'][0]['timeSlots'];
     timeSlots.forEach(function(slot) {
       let hours = new Date(slot.slotDateTime).getHours();
       let minutes = new Date(slot.slotDateTime).getMinutes().toString();
       if (minutes === '0') minutes = '00';
       if (hours > 12) {
         hours = (hours % 12) + ":"
         minutes = minutes + "p";
       } else {
         hours = hours + ":";
         minutes = minutes + "a";
       }
       let displayedTime = hours+minutes;
       appointmentTimes.push(displayedTime);
     })
     document.getElementById('addContentHere').innerHTML = `
     <div class='widget-container'>
       <div class='heading-info'>
         <h1 class='widget-title'>Book Online</h1>
         <h4><a class='question-link' href='http://www.wheelhousetesting.net/'>What do we treat?</a><a class='question-link' href='http://www.wheelhousetesting.net/'>How much will it cost?</a></h4>
       </div>
       <h2>Tomorrow</h2>
       <div id='button-container'>
       </div>
     </div>
     `;
     let buttonContainer = document.getElementById('button-container');
     let rowOne = document.createElement('div');
     rowOne.className = 'row';
     let rowTwo = document.createElement('div');
     rowTwo.className = 'row';
     let rowThree = document.createElement('div');
     rowThree.className = 'row';
     buttonContainer.appendChild(rowOne);
     buttonContainer.appendChild(rowTwo);
     buttonContainer.appendChild(rowThree);
     for (let i=0; i<12; i++) {
       if (i < 4) {
         currentRow = rowOne;
       } else if (i < 8){
         currentRow = rowTwo;
       } else if (i < 12) {
         currentRow = rowThree;
       }
       if (i === 11) {
         let columnDiv = document.createElement('div');
         columnDiv.className = 'col-xs-3';
         currentRow.appendChild(columnDiv);
         columnDiv.innerHTML = `
         <div class='time-slot'><button onclick='window.location.href="index.html"' class='time-button'><h4>More</h4></button></div>
         `
       } else {
         let columnDiv = document.createElement('div');
         columnDiv.className = 'col-xs-3';
         currentRow.appendChild(columnDiv);
         columnDiv.innerHTML = `
         <div class='time-slot'><button onclick='window.location.href="index.html"' class='time-button'><h4>${appointmentTimes[i]}</h4></button></div>
         `
       }
     }
   }
});
