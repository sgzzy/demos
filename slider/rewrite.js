/**
 * Created by Administrator on 2016/11/9.
 */
require.config({
  paths: {
    "$": "$",
    "node": "node",
    "css": "css",
    "util": "util"
  }
});
require(["$", "node", "css", "util"], function (ele, node, css, util){
  var slider = ele.$$('slider-list')[0];
  var nav = ele.$$('slider-trigger');
  var prev = ele.$$('pre')[0];
  var next = ele.$$('next')[0];
  var autoslide = null;
  var sliderItem = ele.$$('slider-list-item');
  var index = sliderItem.length;

  function Slider(slider, sliderItem, direction, index){
    this.slider = slider;
    this.autoPlay = false;
    this.isTrigger = false;
    this.sliderItem = sliderItem;
    this.direction = direction; //true为水平，false为垂直
    this.timer = null;
    this.index = index;
  }

  Slider.prototype = {
    move: function (iTarget){
      var pro;
      if (this.direction) {
        pro = "left";
      } else {
        pro = "top";
      }
      var oThis = this.slider;

      function start(){
        var value = css(oThis, pro);
        var iSpeed = (iTarget - value) / 10;
        iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
        css(oThis, pro, (value + iSpeed));
        console.log(css(oThis, pro));
        if (css(oThis, pro) != iTarget) {
          var timer = requestAnimationFrame(start);
        } else if (css(oThis, pro) == iTarget) {
          cancelAnimationFrame(timer);
        }
      }

      requestAnimationFrame(start);
    },
    unit: function (){
      var unit, init;
      if (this.direction) {
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
      var unit = -this.unit().unit;
      var init = this.unit().init;
      // this.pause();
      this.move(init + unit);
      var i = 0;
      console.log(++i);
    },
    prev: function (){
      var unit = this.unit().unit;
      var init = this.unit().init;
      // this.pause();
      this.move(init + unit);
    },
    play: function (){
      var oThis = this;
      setInterval(oThis.next(),1000);
    },/*
    pause: function (){
        clearInterval(this.timer);
    },*/
    auto : function (flag){
      this.autopaly = flag;
      if (this.autopaly) {
        this.play();
      }
    }
  };
  var direction = true;
  var slide = new Slider(slider, sliderItem, direction, index);
  slide.auto(true);
});