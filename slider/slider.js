/**
 * Created by sgzzy on 2016/10/21.
 */

function pre() { //上一张动作
  if (slider.style.left) {
    var left = parseInt(slider.style.left);
  } else {
    var left = parseInt(sliderCss.left);
  }
  var disp =  Width.getWidth();
  var init = (new Date()).getTime();
  clearInterval(timer);
  if (count>1) {
    timer = setInterval(function (){
      var instance = (new Date()).getTime() - init;
      if (instance < time) {
        var pos = Math.floor(disp*instance/time);
        var result = left + pos;
        slider.style.left = result + 'px';
      }
    },1);
    setTimeout(function (){
      slider.style.left = -disp*(count-2) + 'px';
      count--;
    },1000);
  } else if(count===1) {
    var last = sliderItem[len-1];
    console.log(last);
    last.style.position = 'fixed';
    last.style.left = -disp + 'px';
    last.style.top = 0 + 'px';
    timer = setInterval(function (){
      var instance = (new Date()).getTime() - init;
      if(instance < time) {
        var pos = Math.floor(disp*instance/time);
        var result = left + pos;
        slider.style.left = result + 'px';
        last.style.left = -disp + pos + 'px';
      }
    },1);
    setTimeout(function (){
      slider.style.left = -disp*5 + 'px';
      last.style.left = 0 + 'px';
      last.style.position = 'static';
      count=6;
      console.log(count);
    },1000);
  }
}
function next (){
  //下一张动作
  if (slider.style.left) {
    var left = parseInt(slider.style.left);
  } else {
    var left = parseInt(sliderCss.left);
  }
  console.log(left);
  var disp =  -Width.getWidth();
  var init = (new Date()).getTime();
  clearInterval(timer);
  if (count<6) {
    timer = setInterval(function (){
      var instance = (new Date()).getTime() - init;
      if (instance < time) {
        var pos = Math.floor(disp*instance/time);
        var result = left + pos;
        slider.style.left = result + 'px';
      }
    },1);
    setTimeout(function (){
      slider.style.left = disp*count + 'px';
      count++;
    },1000);

  } else if(count===6) {
    var first = sliderItem[0];
    console.log(first);
    first.style.position = 'fixed';
    first.style.left = -disp + 'px';
    first.style.top = 0 + 'px';
    slider.style.left = left - disp + 'px';
    timer = setInterval(function (){
      var instance = (new Date()).getTime() - init;
      if(instance < time) {
        var pos = Math.floor(disp*instance/time);
        var result = left - disp + pos;
        slider.style.left = result + 'px';
        first.style.left = -disp + pos + 'px';
      }
    },1);
    setTimeout(function (){
      slider.style.left = 0 + 'px';
      first.style.left = 0 + 'px';
      first.style.position = 'static';
      count=1;
    },1000);
  }
}

window.onload = function (){
  var Width = (function (){
    var Width = 1920;
    var Test = {};
    Test.getWidth = function () {
      return Width;
    };
    return Test;
  })();
  var slider = document.querySelector('.slider-list');
  var pre = document.querySelector('.pre');
  var next = document.querySelector('.next');
  var sliderCss = getComputedStyle(slider,null);
  var time = 1000;
  var timer = null;
  var sliderItem = document.querySelectorAll('.slider-list-item');
  var len = sliderItem.length;
  var count = 1;
  next.onclick = next ();
  pre.onclick = pre();
};