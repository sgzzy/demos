/**
 * Created by Administrator on 2016/11/9.
 */
var slider = document.querySelector('.slider-list'),
  sliderItem = document.querySelectorAll('.slider-list-item'),
  pre = document.querySelector('.pre'),
  next = document.querySelector('.next'),
  autoPlay = false;

function Slider(slide){

}
var prevTimer = null,
  slider,
  runtime = 1000,
  nextTimer = null,
  distance = 1920,
  left = 0;
function slide(prevTimer, slider, runtime, nextTimer, distance, left){
  clearTimeout(nextTimer);
  clearTimeout(prevTimer);
  var init = (new Date()).getTime();
  prevTimer = setTimeout(function (){
    var instance = (new Date()).getTime() - init;
    console.log("instance: " + instance);
    var pos = Math.floor(-distance * instance / runtime);
    slider.style.left = pos + left + 'px';
    if (instance < runtime) {
      setTimeout(arguments.callee, 100);
    } else {
      slider.style.left = left - distance + 'px';
    }
  }, 100);
}
var count = 0, len = 6;
function prevSlide(){
  distance = -distance;
  if (count < len) {
    slide();
  } else if(count == len) {

  }

}
function nextSlide(){
  slide();
}
