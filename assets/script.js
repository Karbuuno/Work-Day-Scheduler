var hours = [
  { time: "9:00", event: "" },
  { time: "10:00", event: "" },
  { time: "11:00", event: "" },
  { time: "12:00", event: "" },
  { time: "13:00", event: "" },
  { time: "14:00", event: "" },
  { time: "15:00", event: "" },
  { time: "16:00", event: "" },
  { time: "17:00", event: "" },
];
// grabbing elements from HTML
var currentDay = $("#currentDay");
var today = dayjs().format("DD-MM-YYYY h:mm a");
var timeBlock = $(".time-block");

currentDay.text(today);
// getting from localStorage
var storageTime = JSON.parse(window.localStorage.getItem("hours")) || hours;

$(function () {
  var now = dayjs().format("h");

  storageTime.forEach(function (hour) {
    var condition = getColoTime(hour);
    // creating elements dynamically
    $(
      ".times"
    ).append(`<div id="hour-${hour.time}" class="row time-block ${condition}">
    <div class="col-2 col-md-1 hour text-center py-3 ">${hour.time}</div>
    <textarea class="col-8 col-md-10 description" rows="3">${hour.event}</textarea>
    <button class="btn saveBtn col-2 col-md-1" aria-label="save">
      <i class="fas fa-save" aria-hidden="false"></i>
    </button>
  </div>`);
  });
  // making conditions to add glasses
  function getColoTime(hour) {
    var now = parseInt(dayjs().format("HH:mm"));
    var currentLoopTime = parseInt(hour.time);
    // var condition = "";
    if (now > currentLoopTime) {
      return "past";
    } else if (now == currentLoopTime) {
      return "present";
    } else {
      return "future";
    }
  }
  // saving the value in localStorage
  $(".saveBtn").on("click", function () {
    let inputValue = $(this).prev().val();
    let currentTime = $(this).parent().attr("id").split("-")[1];

    let newTimeValue = storageTime.map(function (storage) {
      if (storage.time == currentTime) {
        storage.event = inputValue;
      }
      return storage;
    });
    storageTime = newTimeValue;
    window.localStorage.setItem("hours", JSON.stringify(storageTime));
  });
});
