window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
var start = null;
var d = document.getElementById('SomeElementYouWantToAnimate');
function step(timestamp) {
  if (start === null) start = timestamp;
  var progress = timestamp - start;
  d.style.left = Math.min(progress/10, 200) + "px";
  if (progress < 2000) {
    requestAnimationFrame(step);
  }
}
requestAnimationFrame(step);

var EventUtil = {
  addHadler: function (element, type, handler){
    if (element.addEventListener) {
      element.addEventListener(type, handler, false);
    } else if (element.attachEvent) {
      element.attachEvent("on" + type, handler);
    } else {
      element["on" + type] = handler;
    }
  },
  removeHandler: function (element, type, handler){
    if (element.removeEventListener) {
      element.removeEventListener(type, handler, false);
    } else if (element.detachEvent) {
      element.detach("on" + type, handler);
    } else {
      element["on" + type] = null;
    }
  },
  getEvent: function (event){
    return event ? event : window.event;
  },
  getTarget: function (event){
    return event.target || event.srcElement;
  }
};
function handleVisibilityChange(){
  var output = document.getElementById("output"),
      msg;
  if (document.hidden || document.msHidden || document.webkitHidden) {
    msg = "Page is now hidden. " + (new Date()) + "<br />";
  } else  {
    msg = "Page is now visible. " + (new Date()) + "<br />"
  }
  output.innerHTML += msg;
}
EventUtil.addHandler(document, "msvisibilitychange", handleVisibilityChange);
EventUtil.addHandler(document, "webkitVisibilitychange", handleVisibilityChange);