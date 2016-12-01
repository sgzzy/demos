/**
 * Created by Administrator on 2016/11/9.
 */
define(function (require){
  var ele = require('./$');
  var Slider =require('./slide');
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