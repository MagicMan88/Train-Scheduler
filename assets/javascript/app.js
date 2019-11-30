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

  $('#add-train').on('click', function() {
    event.preventDefault();
    // Entering data into database
    name = $('#train-name').val().trim();
    destination = $('#destination').val().trim();
    firstTrain  = $('#first-train').val().trim();
    frequency = $('#frequency').val().trim();

    // Push entered info into database
    database.ref().push({
      name: name,
      destination: destination,
      firstTrain: firstTrain,
      frequency: frequency,
      dataAdded: firebase.database.Servervalue.TIMESTAP
    });

    $('form')[0].reset();

  })