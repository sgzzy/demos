/**
 * Created by Administrator on 2016/11/9.
 */
require.config({
  paths: {
    "$": "$",
    "node": "node",
    "css": "css",
    "util": "util",
    "Slider": "slide"
  }
});
require(["$", "node", "css", "util", "Slider"], function (ele, node, css, util, Slider){
  var slider = ele.$$('slider-list')[0];
  var prev = ele.$$('pre')[0];
  var next = ele.$$('next')[0];
  var banner = ele.$$("slider-content")[0];
  var sliderItem = ele.$$('slider-list-item');
  var index = sliderItem.length;
  var slide =  {
    "banner" : banner,
    "slider" : slider,
    "sliderItem" : sliderItem,
    "index" : index,
    "isTrigger" : true,
    "direction" : false,
    "loop" : true
  };
  var obj = new Slider(slide);
  obj.trigger();
  prev.onclick = function (){
    obj.pause();
    obj.prev();
  };
  next.onclick = function (){
    obj.pause();
    obj.next();
  }
});

/*function Slider(banner, slider, sliderItem, direction, index,trigger){
 this.banner = banner;
 this.slider = slider;
 this.autoPlay = false;
 this.isTrigger = trigger;
 this.sliderItem = sliderItem;
 this.direction = direction; //true为水平，false为垂直
 this.timer = null;
 this.index = index;
 this.loop = true;
 }

 Slider.prototype = {
 move: function (iTarget){
 var pro = this.pro();
 var oThis = this.slider;
 if(this.isTrigger) {
 var index = -iTarget/this.unit().unit;
 var triggers = document.getElementsByClassName("trigger-item");
 triggers[index].className += "active";
 }
 function start(){
 var value = css(oThis, pro);
 var iSpeed = (iTarget - value) / 10;
 iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
 css(oThis, pro, (value + iSpeed));
 if (css(oThis, pro) != iTarget) {
 var timer = requestAnimationFrame(start);
 } else if (css(oThis, pro) == iTarget) {
 cancelAnimationFrame(timer);
 }
 }
 requestAnimationFrame(start);
 },
 pro: function (){
 var pro;
 if (this.direction) {
 pro = "left";
 } else {
 pro = "top";
 }
 return pro;
 },
 unit: function (){
 var unit,init;
 if (this.direction) {
 console.log(this);
 unit = css(this.sliderItem[0], "width");
 init = css(this.slider, "left");
 return {
 unit: unit,
 init: init
 };
 } else {
 unit = css(this.sliderItem[0], "height");
 init = css(this.slider, "top");
 return {
 unit: unit,
 init: init
 };
 }
 },
 next: function (){
 var pro = this.pro();
 var unit = -this.unit().unit;
 var init = this.unit().init;
 console.log(Math.ceil(init/unit));
 init = Math.ceil(init/unit) * unit;
 var iTarget = init + unit;
 if (this.loop) {
 if (iTarget == this.index*unit) {
 css(slider,"width", -(this.index+1)*unit);
 var item = document.createElement("li");
 item = sliderItem[0].cloneNode(true);
 slider.appendChild(item);
 }
 if (iTarget == (this.index + 1) * unit) {
 css(slider, pro, 0);
 iTarget = unit;
 slider.removeChild(sliderItem[this.index]);
 }
 }
 console.log(iTarget);
 this.move(iTarget);
 },
 prev: function (){
 var pro = this.pro();
 var unit = this.unit().unit;
 var init = this.unit().init;
 init = Math.ceil(init/unit) * unit;
 var iTarget = init + unit;
 if (this.loop) {
 if (iTarget == unit) {
 iTarget = 0;
 css(slider,"width", (this.index+1)*unit);
 var item = document.createElement("li");
 item = sliderItem[this.index-1].cloneNode(true);
 slider.insertBefore(item, sliderItem[0]);
 css(slider,"left", -unit);
 }
 if (iTarget == (this.index + 1) * unit) {
 css(slider, pro, -(this.index-1)*unit);
 iTarget = unit;
 slider.removeChild(sliderItem[0]);
 }
 }
 this.move(iTarget);
 },
 play: function (){
 var oThis = this;
 setInterval(oThis.next.bind(oThis), 3000);
 },
 pause: function (){
 clearInterval(this.timer);
 },
 auto: function (flag){
 this.autopaly = flag;
 if (this.autopaly) {
 this.play();
 }
 },
 trigger: function (){
 if(this.isTrigger) {
 var trigger = document.createElement("ul");
 var triggerItem;
 trigger.className = "slider-trigger";
 for (var i=0; i < this.index; i++) {
 triggerItem = document.createElement("li");
 triggerItem.className = "trigger-item";
 trigger.appendChild(triggerItem);
 }
 this.banner.appendChild(trigger);
 }
 }
 };*/