// Steps to complete:

// 1. Create Firebase link
// 2. Create initial train data in database
// 3. Create button for adding new trains - then update the html + update the database
// 4. Create a way to retrieve trains from the trainlist.
// 5. Create a way to calculate the time way. Using difference between start and current time.
//    Then take the difference and modulus by frequency. (This step can be completed in either 3 or 4)

// Initialize Firebase
var firebaseConfig = {
  apiKey: "AIzaSyCPkQWxhEy1WYRewFrqqQr5gMrqNIkwz5w",
  authDomain: "train-scheduler-5b429.firebaseapp.com",
  databaseURL: "https://train-scheduler-5b429.firebaseio.com",
  projectId: "train-scheduler-5b429",
  storageBucket: "train-scheduler-5b429.appspot.com",
  messagingSenderId: "1099509239125",
  appId: "1:1099509239125:web:8d28ca819dccc03a09b3dc"
};

firebase.initializeApp(firebaseConfig);

// Reference the database
var database = firebase.database();

// Onclick variables
var name;
var destination;
var firstTrain;
var frequency = 0;

// Button for adding trains
$('#add-train').on('click', function () {
  // Prevent the default form submit
  event.preventDefault();

  // Grabbing the user input
  name = $('#train-name')
    .val()
    .trim();
  destination = $('#destination')
    .val()
    .trim();
  firstTrain = $('#first-train')
    .val()
    .trim();
  frequency = $('#frequency')
    .val()
    .trim();

  // Push entered info into database
  var newTrainInfo = {
    name: name,
    destination: destination,
    firstTrain: firstTrain,
    frequency: frequency
  };

  // Uploads train info to the database
  database.ref().push(newTrainInfo);

  // Log everything to the console
  console.log(newTrainInfo.name);
  console.log(newTrainInfo.destination);
  console.log(newTrainInfo.firstTrain);
  console.log(newTrainInfo.frequency);

   // Alert
   alert("Train successfully added");

   // Clears all of the text-boxes
   $("#train-name").val("");
   $("#destination").val("");
   $("#first-train").val("");
   $("#frequency").val("");
 
});

// Moment logic and appending entered info to the page
database.ref().on('child_added', function (childSnapshot) {
  console.log(childSnapshot.val());

  // Storing everything in variables
  var minAway;
  // Make the first train come before now by changing the year
  var NewFirstTrain = moment(childSnapshot.val().firstTrain, "hh:mm").subtract(1, 'years');
  // Difference between first and current the first train
  var diffTime = moment().diff(moment(NewFirstTrain), 'minutes');
  var remainder = diffTime % childSnapshot.val().frequency;
  //Minutes until next train arrives
  var minAway = childSnapshot.val().frequency - remainder;
  // Next train time
  var nextTrainTime = moment().add(minAway, 'minutes');
  nextTrainTime = moment(nextTrainTime).format('hh:mm');

  // Appending info to the page
  var newRow = $('<tr>').append(
    $('<td>').text(name),
    $('<td>').text(destination),
    $('<td>').text(firstTrain),
    $('<td>').text(frequency),
    $('<td>').text(minAway)
  );

  // Append the row to the table
  $('#add-row').append(newRow);

  // Error Handling
}, function (errorObject) {
  console.log('Errors handled: ' + errorObject.code);
});