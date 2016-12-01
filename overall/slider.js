window.onload = function (){
  var Width = (function (){
    var width = 1920;
    var Test = {};
    Test.getWidth = function (){
      return width;
    };
    return Test;
  })();
  var slider = document.querySelector('.slider-list');
  var nav = document.querySelectorAll('.slider-trigger');
  var pre = document.querySelector('.pre');
  var next = document.querySelector('.next');
  var sliderCss = getComputedStyle(slider, null) || slider.currentStyle; //获取滑块元素css属性
  var time = 500; //动画时间
  var timer = null;
  var autoslide = null;
  var sliderItem = document.querySelectorAll('.slider-list-item');
  var len = sliderItem.length;
  var count = 1;
  var i;
  nav[count - 1].setAttribute('class', "slider-trigger active");
  next.onclick = function (){ //下一张动作
    if (slider.style.left) { //获取ul的left值
      var left = parseInt(slider.style.left);
    } else {
      var left = parseInt(sliderCss.left);
    }
    var disp = -Width.getWidth();//计算需要滑动的距离
    var init = (new Date()).getTime();
    nav[count - 1].setAttribute('class', 'slider-trigger');
    clearInterval(timer);
    if (count < len) {
      timer = setInterval(function (){ //正常滑动的动作
        var instance = (new Date()).getTime() - init;
        if (instance < time) {
          var pos = Math.floor(disp * instance / time);
          var result = left + pos;
          slider.style.left = result + 'px';
        }
      }, 1);
      setTimeout(function (){ //滑动后进行校正，避免误差带来的错误
        slider.style.left = disp * count + 'px';
        count++;
        nav[count - 1].setAttribute('class', 'slider-trigger active');
      }, 500);
    } else if (count === len) { //当滑块从尾部滑到头部，头部fixed定位，再将整个滑块移到屏幕右侧
      var first = sliderItem[0];
      first.style.position = 'fixed';
      first.style.left = -disp + 'px';
      first.style.top = 0 + 'px';
      slider.style.left = left - disp + 'px';
      timer = setInterval(function (){
        var instance = (new Date()).getTime() - init;
        if (instance < time) {
          var pos = Math.floor(disp * instance / time);
          var result = left - disp + pos;
          slider.style.left = result + 'px';
          first.style.left = -disp + pos + 'px';
        }
      }, 1);
      setTimeout(function (){ //校正位置
        slider.style.left = 0 + 'px';
        first.style.left = 0 + 'px';
        first.style.position = 'static';
        count = 1;
        nav[count - 1].setAttribute('class', 'slider-trigger active');
      }, 500);
    }
  };
  pre.onclick = function (){ //上一张动作
    if (slider.style.left) { //获取ul的left值
      var left = parseInt(slider.style.left);
    } else {
      var left = parseInt(sliderCss.left);
    }
    var disp = Width.getWidth();//计算需要滑动的距离
    var init = (new Date()).getTime();
    nav[count - 1].setAttribute('class', 'slider-trigger');
    clearInterval(timer);
    if (count > 1) {
      timer = setInterval(function (){//正常滑动的动作
        var instance = (new Date()).getTime() - init;
        if (instance < time) {
          var pos = Math.floor(disp * instance / time);
          var result = left + pos;
          slider.style.left = result + 'px';
        }
      }, 1);
      setTimeout(function (){//滑动后进行校正，避免误差带来的错误
        slider.style.left = -disp * (count - 2) + 'px';
        count--;
        nav[count - 1].setAttribute('class', 'slider-trigger active');
      }, 500);
    } else if (count === 1) { //当滑块从头部滑到尾部，尾部fixed定位，再将整个滑块移到屏幕左侧
      var last = sliderItem[len - 1];
      last.style.position = 'fixed';
      last.style.left = -disp + 'px';
      last.style.top = 0 + 'px';
      timer = setInterval(function (){
        var instance = (new Date()).getTime() - init;
        if (instance < time) {
          var pos = Math.floor(disp * instance / time);
          var result = left + pos;
          slider.style.left = result + 'px';
          last.style.left = -disp + pos + 'px';
        }
      }, 1);
      setTimeout(function (){//校正位置
        slider.style.left = -disp * (len - 1) + 'px';
        last.style.left = 0 + 'px';
        last.style.position = 'static';
        count = len;
        nav[count - 1].setAttribute('class', 'slider-trigger active');
      }, 500);
    }
  };
  for (i = 0; i < len; i++) {
    nav[i].onmousemove = function (){
      var i = parseInt(this.innerHTML);
      if (slider.style.left) { //获取ul的left值
        var left = parseInt(slider.style.left);
      } else {
        var left = parseInt(sliderCss.left);
      }
      var disp = Width.getWidth() * (count - i);//计算需要滑动的距离
      console.log(disp);
      nav[count - 1].setAttribute('class', 'slider-trigger');
      var init = (new Date()).getTime();
      clearInterval(timer);
      timer = setInterval(function (){//正常滑动的动作
        var instance = (new Date()).getTime() - init;
        if (instance < time) {
          var pos = Math.floor(disp * instance / time);
          var result = left + pos;
          slider.style.left = result + 'px';
        }
      }, 1);
      setTimeout(function (){//滑动后进行校正，避免误差带来的错误
        slider.style.left = -(i - 1) * Width.getWidth() + 'px';
        count = i;
        nav[i - 1].setAttribute('class', 'slider-trigger active');
      }, 500);
    };
    console.log(nav[i].className);
  }
  clearInterval(autoslide);
  autoslide = setInterval(function (){
    if (slider.style.left) { //获取ul的left值
      var left = parseInt(slider.style.left);
    } else {
      var left = parseInt(sliderCss.left);
    }
    var disp = -Width.getWidth();//计算需要滑动的距离
    var init = (new Date()).getTime();
    nav[count - 1].setAttribute('class', 'slider-trigger');
    clearInterval(timer);
    if (count < len) {
      timer = setInterval(function (){ //正常滑动的动作
        var instance = (new Date()).getTime() - init;
        if (instance < time) {
          var pos = Math.floor(disp * instance / time);
          var result = left + pos;
          slider.style.left = result + 'px';
        }
      }, 1);
      setTimeout(function (){ //滑动后进行校正，避免误差带来的错误
        slider.style.left = disp * count + 'px';
        count++;
        nav[count - 1].setAttribute('class', 'slider-trigger active');
      }, 500);
    } else if (count === len) { //当滑块从尾部滑到头部，头部fixed定位，再将整个滑块移到屏幕右侧
      var first = sliderItem[0];
      first.style.position = 'fixed';
      first.style.left = -disp + 'px';
      first.style.top = 0 + 'px';
      slider.style.left = left - disp + 'px';
      timer = setInterval(function (){
        var instance = (new Date()).getTime() - init;
        if (instance < time) {
          var pos = Math.floor(disp * instance / time);
          var result = left - disp + pos;
          slider.style.left = result + 'px';
          first.style.left = -disp + pos + 'px';
        }
      }, 1);
      setTimeout(function (){ //校正位置
        slider.style.left = 0 + 'px';
        first.style.left = 0 + 'px';
        first.style.position = 'static';
        count = 1;
        nav[count - 1].setAttribute('class', 'slider-trigger active');
      }, 500);
    }
  }, 4000);
};