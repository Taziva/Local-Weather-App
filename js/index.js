function updateClock() {
  var currentTime = new Date();
  var currentHours = currentTime.getHours();
  var currentMinutes = currentTime.getMinutes();
  var currentSeconds = currentTime.getSeconds();

  // Pad the minutes and seconds with leading zeros, if required
  currentMinutes = (currentMinutes < 10 ? "0" : "") + currentMinutes;
  currentSeconds = (currentSeconds < 10 ? "0" : "") + currentSeconds;

  // Choose either "AM" or "PM" as appropriate
  timeOfDay = (currentHours < 12) ? "AM" : "PM";

  // Convert the hours component to 12-hour format if needed
  currentHours = (currentHours > 12) ? currentHours - 12 : currentHours;

  // Convert an hours component of "0" to "12"
  currentHours = (currentHours == 0) ? 12 : currentHours;

  // Compose the string for display
  var currentTimeString = currentHours + ":" + currentMinutes + " " + timeOfDay;

  $("#clock").html(currentTimeString);

}

$(document).ready(function() {
  var timeOfDay;
  setInterval('updateClock()', 1000);
});

$(document).ready(function() {
  var longitude;
  var latitude;
  var city;
  var country;
  var celsius;
  var fahrenheit;
  var url;
  if (navigator.geolocation) {
    console.log("Yes");
  } else console.log("No");
  navigator.geolocation.getCurrentPosition(function(position) {

    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    url = "https://api.wunderground.com/api/26b5f75cab6feca2/conditions/q/" + latitude + "," + longitude + ".json";
    $.ajax({
      url: url,
      dataType: "jsonp",
      async: false,
      contentType: "application/json",
      success: function(data) {
        console.log(data.current_observation.temp_c);
       celsius = data.current_observation.temp_c.toFixed(0); $("#temp").html(celsius);
        fahrenheit = data.current_observation.temp_f;
        $("#currentCity").html(data.current_observation.display_location.full);
        $("#weatherReadings").html(data.current_observation.weather);
        $("#weatherIcon img").attr("src", "http://icons.wxug.com/i/c/v4/" + data.current_observation.icon + ".svg");
        console.log($("#weatherIcon img").attr("src"));

      }
    })
  });
  $('#tempUnitChange').click(function() {
    if ($("#temp").hasClass('celsius')) {
      $("#temp").html(fahrenheit.toFixed(0));
      $("#tempUnitChange").html("&degF");
      $("#temp").removeClass('celsius');
      $("#temp").addClass('fahrenheit')
    } else if ($("#temp").hasClass('fahrenheit')) {
      $("#temp").html(celsius.toFixed(0));
      $("#tempUnitChange").html("&degC");
      $("#temp").removeClass('fahrenheit');
      $("#temp").addClass('celsius');
    }
  })
});