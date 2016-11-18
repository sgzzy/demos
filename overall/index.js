/**
 * Created by Administrator on 2016/11/18.
 */
function css (elem, attr, value){
    var css, ret, style;
    style = elem.style;
    var rnumpx = /^-?\d+(?:px)?$/i,
      rnum = /^-?\d/;
    if (window.getComputedStyle) {
      css = getComputedStyle(elem, null);
      ret = css[attr];
    } else if (document.documentElement.currentStyle) {
      css = this.node.currentStyle;
      ret = css[attr];
    }

    if (!rnumpx.test(ret) && rnum.test(ret)) {
      var left = style.left;
      style.left = attr === "fontSize" ? "lem" : (ret || 0);
      ret = parseInt(style.pixelLeft + 'px');
      style.left = left;
    }
    if(rnum.test(ret)) {
      ret = parseInt(ret);
    }
    if (arguments.length === 2) {
      console.log(ret);
      return ret;
    }
    if (arguments.length == 3) {
      if(rnum.test(value)) {
        value = value + 'px';
      }
      elem.style.cssText += "; " + attr + " : " + value;
    }
  }
(function() {
  var lastTime = 0;
  var vendors = ['ms', 'moz', 'webkit', 'o'];
  for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
    window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
  }
  if (!window.requestAnimationFrame) window.requestAnimationFrame = function(callback, element) {
    var currTime = new Date().getTime();
    var timeToCall = Math.max(0, 16 - (currTime - lastTime));
    var id = window.setTimeout(function() {
      callback(currTime + timeToCall);
    }, timeToCall);
    lastTime = currTime + timeToCall;
    return id;
  };
  if (!window.cancelAnimationFrame) window.cancelAnimationFrame = function(id) {
    clearTimeout(id);
  };
}());
function startMove(iTarget,timer)
{
  var oThis = this;
  clearInterval(timer);
  timer = setInterval(function ()
  {
    doMove.call(oThis,iTarget,timer)
  }, 30);
  requestAnimationFrame(doMove);
}
function doMove (iTarget,timer)
{
  var left = css(this, 'left');
  var iSpeed = (iTarget - left) / 10;
  iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
  left == iTarget ? clearInterval(timer) : css(this,"left",(left+iSpeed));
}
var timer = null;
var btn = document.getElementById('btn');
var demo = document.getElementsByClassName('demo')[0];
btn.onclick = function (){
  move.call(demo,500);
};
function move (iTarget){
  var oThis = this;
  function start() {
    var left = css(oThis,'left');
    var iSpeed = (iTarget - left) / 10;
    iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
    css(oThis, "left", (left + iSpeed));
    if (left < iTarget) {
      var timer = requestAnimationFrame(start);
    } else if (left == iTarget) {
      cancelAnimationFrame(timer);
    }
  }
  requestAnimationFrame(start);
}