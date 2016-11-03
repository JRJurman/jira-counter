// background.js

var boxCounter = 0.0;

var c = document.createElement("canvas");
var ctx = c.getContext("2d");

var width = 24;
var height = 24;
c.setAttribute("width", width);
c.setAttribute("height", height)

var arcStart = 1.5*Math.PI;
var minuteFontSize = width*(3/10);
ctx.font = minuteFontSize+"px Silkscreen";

var oldPort;

chrome.runtime.onConnect.addListener(function(port) {
  if(!!oldPort) { oldPort.disconnect(); }
  port.onMessage.addListener(function(boxCounter) {
    var boxMinutes = boxCounter.toString().split(".")[0];
    boxMinutes = boxMinutes.length == 1 ? "0" + boxMinutes : boxMinutes;

    ctx.clearRect(0, 0, c.width, c.height);

    ctx.fillText(boxMinutes, (width/2)-(minuteFontSize/1.8), (height/2)+(minuteFontSize/3));

    ctx.beginPath();
    var arcLength = (boxCounter*2*Math.PI) % (2*Math.PI);
    ctx.arc(width/2, height/2, width/4, arcStart, (2*Math.PI) - (0.5*Math.PI) + arcLength);

    // guidelines
    // ctx.moveTo(width/2,0);
    // ctx.lineTo(width/2,height);
    // ctx.moveTo(0,height/2);
    // ctx.lineTo(width, height/2);

    ctx.stroke();
    chrome.browserAction.setIcon({imageData:ctx.getImageData(0, 0, width, height)});
  });
  oldPort = port;
});
