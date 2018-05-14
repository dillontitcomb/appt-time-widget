let appointmentTimes = [];
let getAppointmentTimes = () => {
    $.ajax({
      url: `https://s3.amazonaws.com/wheelhouse-cdn/wheelhouse-www/assets/timeslotdata.json`,
      type: 'GET',
      data: {
        format: 'json'
      },
      success: function(response) {
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
        for (i=0; i<12; i++) {
          if (i%4===0) {
            rowNum = i;
            $('.button-container').append("<div class='row widget" + i + "'></div>");
          }
          if (i === 11) {
            $('.row.widget' + rowNum).append("<div class='col-xs-3'><div class='time-slot'><button onclick='window.location.href=\"index.html\"' class='time-button' id='time-button-more'><h4>More</h4></button></div></div>")
          } else {
            $('.row.widget' + rowNum).append("<div class='col-xs-3'><div class='time-slot'><button onclick='window.location.href=\"index.html\"' class='time-button'><h4>" + appointmentTimes[i] + "</h4></button></div></div>")
          }
        }
      },
    error: function(error) {
      $('.button-container').html("Something went wrong. Error message: " + error.message);
    }
  })
}

$(document).ready(function() {
  $('style').append('.widget-container {max-width: 600px; padding: 15px; border: 2px solid lightgrey; margin: 10px;} .row.widget {max-width: 600px; margin: 0 auto;} .time-button {background-color: #0071B2; color: white; border: 0px; border-radius: 4px 4px 4px 4px; min-width: 120px; height: 60px; margin-bottom: 10px;} .time-slot {text-align: center; width: 100%; min-height: 60px} button h4 {font-weight: 300; font-size: 16px;} .question-link {font-family: Georgia, serif; margin-right: 30px;} .heading-info {border-bottom: 4px solid #0071B2; margin-bottom: 5px; padding-bottom: 10px;} h2 {font-weight: normal;} .col-xs-3 {min-width: 122px; padding: 2px;} .widget-title {margin-bottom: 10px; font-weight: 400;} #time-button-more {background-color: white; border: 2px solid gray; color: gray;} #time-button-more h4 {font-weight: 500; }'
);
  $('#addContentHere').html("<div class='widget-container'><div class='heading-info'><h1 class='widget-title'>Book Online</h1><h4><a class='question-link' href='http://www.wheelhousetesting.net/'>What do we treat?</a><a class='question-link' href='http://www.wheelhousetesting.net/'>How much will it cost?</a></h4></div><h2>Tomorrow</h2><div class='button-container'></div></div>");
  getAppointmentTimes();
});
