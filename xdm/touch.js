/**
 * Created by Administrator on 2016/12/27.
 */

function pullDownAction () {
      var item = document.createElement('div');
      item.className = 'item';
      item.innerText = '根据市场奖惩制度，结合市场各部门提供的数据';
      setTimeout(function () {
        $('#news-lists').before(item);
        myScroll.refresh();
      }, 600);
}

function pullUpAction () {

      var item = document.createElement('div');
      item.className = 'item';
      item.innerText = '根据市场奖惩制度，结合市场各部门提供的数据';
      setTimeout(function () {
        $('#news-lists').append(item);
        myScroll.refresh();
      }, 600);
}

//初始化绑定iScroll控件
/*
document.addEventListener('DOMContentLoaded', loaded, false);

document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

function loaded() {

  var wrapper = document.getElementById('wrapper');
  var div = document.createElement('div');

  div.className = 'scroller';

  wrapper.appendChild(div);

  var scroller = wrapper.querySelector('.scroller');
  var list = wrapper.querySelector('#wrapper'+ ' ' + '#news-lists');

  scroller.insertBefore(list, scroller.childNodes[0]);

  var pullUp = document.createElement('div');

  pullUp.className = 'pullUp';
  var loader = document.createElement('div');

  loader.className = 'loader';

  for (var i = 0; i < 4; i++) {
    var span = document.createElement('span');

    loader.appendChild(span);
  }

  pullUp.appendChild(loader);

  var pullUpLabel = document.createElement('div');

  pullUpLabel.className = 'pullUpLabel';

  var content = document.createTextNode('上拉加载更多...');

  pullUpLabel.appendChild(content);
  pullUp.appendChild(pullUpLabel);
  scroller.appendChild(pullUp);

  var pullUpEl = wrapper.querySelector('.pullUp');
  var pullUpOffset = pullUpEl.offsetHeight;


  /!**
   * 初始化iScroll控件
   *!/
  myScroll = new iScroll('wrapper', {
    vScrollbar : false,
    onRefresh : function () {
     if (pullUpEl.className.match('loading')) {
        pullUpEl.className = '';
        pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多...';
      }
    },
    onScrollMove: function () {
      if (this.y < (this.maxScrollY - 5) && !pullUpEl.className.match('flip')) {
        pullUpEl.className = 'flip';
        pullUpEl.querySelector('.pullUpLabel').innerHTML = '松手开始更新...';
      }
    },
    onScrollEnd: function () {
      if (pullUpEl.className.match('flip')) {
        pullUpEl.className = 'loading';
        pullUpEl.querySelector('.pullUpLabel').innerHTML = '加载中...';
        pullUpAction();
      }
    }
  });
}
*/

var pullUpLoad = {
  info: {
    'pullUpLable': '上拉翻页...',
    'pullingUpLable': '松开加载下一页...',
    'loadingLable': '加载中...'
  },
  init: function (parameter){
    var wrapper = document.getElementById(parameter.id);
    var div = document.createElement('div');

    div.className = 'scroller';

    wrapper.appendChild(div);

    var scroller = wrapper.querySelector('.scroller');
    var list = wrapper.querySelector('#wrapper'+ ' ' + parameter.content);

    scroller.insertBefore(list, scroller.childNodes[0]);

    var pullUp = document.createElement('div');

    pullUp.className = 'pullUp';
    var loader = document.createElement('div');

    loader.className = 'loader';

    for (var i = 0; i < 4; i++) {
      var span = document.createElement('span');

      loader.appendChild(span);
    }

    pullUp.appendChild(loader);

    var pullUpLabel = document.createElement('div');

    pullUpLabel.className = 'pullUpLabel';

    var content = document.createTextNode('上拉加载更多...');

    pullUpLabel.appendChild(content);
    pullUp.appendChild(pullUpLabel);
    scroller.appendChild(pullUp);

    var pullUpEl = wrapper.querySelector('.pullUp');
    var pullUpOffset = pullUpEl.offsetHeight;
    document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
    return this.iScroll(pullUpEl, parameter.action);
  },
  iScroll: function (pullUpEl, action){
    myScroll = new iScroll('wrapper', {
      vScrollbar : false,
      onRefresh : function () {

      },
      onScrollMove: function () {
        if (this.y < (this.maxScrollY - 5) && !pullUpEl.className.match('flip')) {
          pullUpEl.classList.toggle('flip');
          pullUpEl.querySelector('.pullUpLabel').innerHTML = '松手开始更新...';
        }
      },
      onScrollEnd: function () {
        if (!pullUpEl.className.match('loading')) {
          pullUpEl.classList.toggle('loading');
          pullUpEl.querySelector('.pullUpLabel').innerHTML = '加载中...';
        }
        action();
      }
    });
    return myScroll;
  },
  pullUpAction: function (action){
    action();
    setTimeout(function (){
      if (pullUpEl.className.match('loading')) {
        pullUpEl.classList.toggle('loading');
        pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多...';
      }
    }, 600)
  }
};
window.onload = function (){

  var parameter = {
    id: 'wrapper',
    content: '#news-lists',
    action: function (){
      var list = document.getElementsByClassName('item');
      var item = document.createElement('div');
      item.className = 'item';
      item.innerText = '我是张' + (list.length + 1);
      setTimeout(function () {
        $('#news-lists').append(item);
      }, 600);
    }
  };
  pullUpLoad.init(parameter);

};