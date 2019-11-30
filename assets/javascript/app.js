// Main Processes

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCPkQWxhEy1WYRewFrqqQr5gMrqNIkwz5w",
  authDomain: "train-scheduler-5b429.firebaseapp.com",
  databaseURL: "https://train-scheduler-5b429.firebaseio.com",
  projectId: "train-scheduler-5b429",
  storageBucket: "train-scheduler-5b429.appspot.com",
  messagingSenderId: "1099509239125",
  appId: "1:1099509239125:web:8d28ca819dccc03a09b3dc"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Reference the database
var database = firebase.database();

// Onclick variables
var name;
var destination;
var firstTrain;
var frequency = 0;

$('#add-train').on('click', function () {
  event.preventDefault();
  // Entering data into database
  name = $('#train-name').val().trim();
  destination = $('#destination').val().trim();
  firstTrain = $('#first-train').val().trim();
  frequency = $('#frequency').val().trim();

  // Push entered info into database
  database.ref().push({
    name: name,
    destination: destination,
    firstTrain: firstTrain,
    frequency: frequency,
    dataAdded: firebase.database.Servervalue.TIMESTAP
  });

  // Function to clear and reset the form
  $('form')[0].reset();

});

// Moment logic and appending entered info to the page
database.ref().on('child_added', function (childSnapshot) {
  var nextArr;
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
  $('#add-row').append('<tr><td>' + childSnapshot.val().name +
    '</td><td>' + childSnapshot.val().destination +
    '</td><td>' + childSnapshot.val().frequency + 
    '</td><td>' + nextTrainTime + 
    '</td><td>' + minAway + '</td></td>');

    // Error Handling
}, function(errorObject) {
    console.log('Errors handled: ' + errorObject.code);
    )
});