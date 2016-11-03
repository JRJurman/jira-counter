// background.js

var boxCounter = 0.0;

var c = document.createElement("canvas");
var ctx = c.getContext("2d");

var width = 24;
var height = 24;
c.setAttribute("width", width);
c.setAttribute("height", height)

var fontSize = height;
ctx.font = fontSize+"px Sans-Serif";

var oldPort;

chrome.runtime.onConnect.addListener(function(port) {
  if(!!oldPort) { oldPort.disconnect(); }
  port.onMessage.addListener(function(boxCounter) {
    // clear canvas
    ctx.clearRect(0, 0, c.width, c.height);

    // set timeout color
    var color = (boxCounter < 9) ? "green" : "red";

    // Create gradient for number
    var gradient = ctx.createLinearGradient(0, fontSize*0.3, 0, c.height);
    gradient.addColorStop("0", "gray");
    gradient.addColorStop(Math.abs(0.99 - (boxCounter % 1)), "gray");
    gradient.addColorStop(        (1.00 - (boxCounter % 1)) , color);
    gradient.addColorStop("1.0", color);

    // Fill with gradient
    ctx.fillStyle = gradient;
    ctx.fillText(Math.ceil(boxCounter), 0, c.height);

    // set icon
    chrome.browserAction.setIcon({imageData:ctx.getImageData(0, 0, c.width, c.height)});
  });
  oldPort = port;
});
