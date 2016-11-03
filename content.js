// content.js

var boxCounter = 0.0;
var clearer;

var timeboxer = chrome.runtime.connect({name:"timeboxer"});

timeboxer.onDisconnect.addListener(() => {
  clearInterval(clearer);
});

clearer = setInterval(function() {
  boxCounter += (10/1200);
  timeboxer.postMessage(boxCounter);
}, 50);
