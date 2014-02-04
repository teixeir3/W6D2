var readline = require('readline');
var READER = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

//
// function Clock(){
//   var time;
//   this.run = function(){
//     time = Date.now();
//     var tick = function() {
//       time += 5000;
//       console.log(new Date(time).toUTCString());
//     }
//     setInterval(tick, 5000);
//   }
// }
//
//
// var addNumbers = function(callback){
//   var sum = 0;
//   READER.question("Enter first no:", function(numString1){
//     var num1 = parseInt(numString1);
//     sum += num1;
//     callback(sum);
//
//     READER.question("Enter second no:", function(numString2){
//       var num2 = parseInt(numString2);
//       sum += num2;
//       callback(sum);
//
//       READER.question("Enter third no:", function(numString3){
//         var num3 = parseInt(numString3);
//         sum += num3;
//         callback(sum);
//
//         READER.question("Enter fourth no:", function(numString4){
//           var num4 = parseInt(numString4);
//           sum += num4;
//           callback(sum);
//         });
//       });
//     });
//   });
// }

// addNumbers(function(sum) {
//   console.log("The sum is: " + sum);
// });


var askLessThan = function(el1, el2, callback){

  READER.question("Is "+ el1 + " less than " + el2 + " ? (type 'yes', or 'no')", function(response){

    if (response === "yes"){
      callback(true);
    } else {
      callback(false);
    }
  });

}

var performSortPass = function(arr, i, madeSwaps, callback){

  if (i < arr.length -1){
    // don't overwrite madeSwaps here; that's the job of
    // the function calls

    askLessThan(arr[i], arr[i+1], function(yesOrNo){

      if (!yesOrNo){
        var tmp = arr[i];
        arr[i] = arr[i+1];
        arr[i+1] = tmp;
        performSortPass(arr, i+1, true, callback);
      } else {
        // never finishes without this line
        // because doesn't know what to do
        performSortPass(arr, i+1, false, callback);
      }
    });

  } else if (i == (arr.length-1)){
    callback(madeSwaps);
    // don't reset madeSwaps here either;
    // will send to completioncallback too early,
    // or won't ever finish
  }
}

var crazyBubbleSort = function(arr, sortCompletionCallback){
  // var madeSwaps = true;

  var sortPassCallback = function(madeSwaps){
    if (madeSwaps){
      performSortPass(arr, 0, false, sortPassCallback);

    } else {
      sortCompletionCallback(arr);
    }
  };

  sortPassCallback(true);
}

crazyBubbleSort([3, 2, 1], function (arr) { console.log(arr) });