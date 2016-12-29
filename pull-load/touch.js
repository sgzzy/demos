/**
 * Created by Administrator on 2016/12/27.
 */
/*var myScroll;

window.onload = function (){
  var wrapper = document.getElementById('wrapper');
  var scroller = document.querySelector('#scroller');

  var pullUp = document.createElement('div');
  pullUp.className = 'pullUp';
  var pullUpLabel = document.createElement('span');
  pullUpLabel.className = 'pullUpLabel';
  pullUp.appendChild(pullUpLabel);
  scroller.appendChild(pullUp);

  var pullUpOffset = pullUp.offsetHeight;

  myScroll = new IScroll(document.getElementById('wrapper'), {
    mouseWheel: false,
    useTransition: true,
    scrollbars: true
  });

  myScroll.on('scrollStart', function (){
    var nowPos = myScroll.y;
    var clientH = wrapper.clientHeight;
    var scrollH = scroller.offsetHeight;
    if (clientH - nowPos === scrollH) {
      if (this.distY < 0) {
        pullUpLabel.innerText = '上拉翻页';
        pullUp.classList.add('flip');
      }
    } else {
      return;
    }
  });
  myScroll.on('scrollEnd', function (){
    var nowPos = myScroll.y;
    var clientH = wrapper.clientHeight;
    var scrollH = scroller.offsetHeight;
    if (clientH - nowPos === scrollH) {
      if (!pullUp.className.match('loading')) {
        pullUp.classList.toggle('loading');
        pullUpLabel.innerText = '加载中...';
        pullUp.style.lineHeight = '20px';
        var load = function (){
          var list = document.querySelector('ul');
          var lists = document.querySelectorAll('li');
          var li = document.createElement('li');
          li.innerText = 'Pretty row' + (lists.length + 1);
          list.appendChild(li);
          myScroll.refresh();
        };
        setTimeout(load, 600);
      }
    } else {
      return;
    }
  });

};

document.addEventListener('touchmove', function (e){ e.preventDefault(); }, false);*/

var refresher = {
  info: {
    'pullUpLable': '上拉翻页...',
    'pullingUpLable': '松开加载下一页...',
    'loadingLable': '加载中...'
  },
  init: function (parameter){
    var wrapper = document.getElementById(parameter.id);
    var scroller = document.querySelector(parameter.scroller);

    var pullUp = document.createElement('div');
    pullUp.className = 'pullUp';
    var pullUpLabel = document.createElement('span');
    pullUpLabel.className = 'pullUpLabel';
    pullUp.appendChild(pullUpLabel);

    var loader = document.createElement('div');
    loader.className = 'loader';

    for (var i = 0; i < 4; i++) {
      var span = document.createElement('span');

      loader.appendChild(span);
    }

    pullUp.appendChild(loader);

    scroller.appendChild(pullUp);

    var pullUpOffset = pullUp.offsetHeight;

    return this.iScroll(parameter, pullUp);
  },

  iScroll: function (parameter, pullUp){
    var myScroll = new IScroll(document.getElementById(parameter.id), {
      mouseWheel: false,
      useTransition: true,
      scrollbars: true
    });

    return myScroll;

  }
};