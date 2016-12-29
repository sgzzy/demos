/**
 * Created by Administrator on 2016/12/27.
 */
window.onload = function (){
  var page = 0;
  var pages = 1;
  var size = 5;
  var sum = 15;
  var parameter = {
    id: 'wrapper',
    scroller: '#scroller',
    content: 'table',
    pullUpAction: function (pullUp){
      load(pullUp);
    }
  };
  var myScroll = refresher.init(parameter);
  myScroll.on('scrollStart', function (){
    var that = this;
    var pullUp = that.scroller.querySelector('.pullUp');

    var nowPos = myScroll.y;
    var clientH = that.wrapper.clientHeight;
    var scrollH = that.scroller.offsetHeight;
    if (clientH - nowPos >= scrollH) {
      if (this.distY < 0) {
        pullUp.style.fontSize = '12px';
        pullUp.style.lineHeight = '20px';
        pullUp.querySelector('.pullUpLabel').innerText = refresher.info.pullingUpLable;
        pullUp.classList.add('flip');
      }
    }
  });
  myScroll.on('scrollEnd', function (){
    var that = this;
    var pullUp = that.scroller.querySelector('.pullUp');

    var nowPos = myScroll.y;
    var pullOffset = pullUp.offsetHeight;
    var clientH = that.wrapper.clientHeight;
    var scrollH = that.scroller.offsetHeight;
    if (clientH - nowPos >= scrollH  || clientH - nowPos >= scrollH - pullOffset) {

      if (pullUp.className.match('flip')) {
        pullUp.classList.add('loading');
        pullUp.classList.remove('flip');
        pullUp.querySelector('.pullUpLabel').innerHTML = refresher.info.loadingLable;
        pullUp.querySelector('.loader').style.display = 'block';
        pullUp.style.lineHeight = '20px';

        if (parameter.pullUpAction) parameter.pullUpAction(pullUp);


      }
    }
  });
  /*var load = function (pullUp){
    $.ajax({
      url: orderList.attr('data-url'),
      data: {
        page: page <= pages ? ++page : page,

        pageSize: size
      },
      success: function (result){
        if (result.data.valid) {
          var _pages = pages;

          pages = Math.max(Math.ceil(result.data.total / size), 1);

          if (pages !== _pages) {
              if (page >= _pages && pages > _pages) {
                orderList.html(result.data.html);
              }
          } else {
            if (page <= pages) {
              orderList.html(result.data.html);
            }
          }

        } else {
          alert(result.msg);
        }
      },
      complete: function (){
        iscroll.refresh();
      }
    });
  };*/
  var load = function (pullUp){
    page <= pages ? ++page : page;

    var list = document.querySelector('#list');
    var lists = document.querySelectorAll('#list tr');
    var l = lists.length;
    var i = 0;

    var _pages = pages;
    pages = Math.max(Math.ceil(sum / size), 1);

    if (pages !== _pages) {
      if (page >= _pages && pages > _pages) {
        setTimeout(function (){
          for (; i < 3; i++) {
            var tr = document.createElement('tr');
            for (var j=0; j < 4; j++) {
              var td = document.createElement('td');
              switch (j) {
                case 0:
                  td.innerText = '2016-12-29';
                  break;
                case 1:
                  td.innerText = '100';
                  break;
                case 2:
                  td.innerText = (l + i +1) + '';
                  break;
                case 3:
                  td.innerText = (99 - l - i) + '';
              }
              tr.appendChild(td);
            }
            list.appendChild(tr);
          }
        }, 500);
      }
    } else {
      if (page <= pages) {
        setTimeout(function (){
          for (; i < 3; i++) {
            var tr = document.createElement('tr');
            for (var j=0; j < 4; j++) {
              var td = document.createElement('td');
              switch (j) {
                case 0:
                  td.innerText = '2016-12-29';
                  break;
                case 1:
                  td.innerText = '100';
                  break;
                case 2:
                  td.innerText = (l + i +1) + '';
                  break;
                case 3:
                  td.innerText = (99 - l - i) + '';
              }
              tr.appendChild(td);
            }
            list.appendChild(tr);
          }
        }, 500);
      }
    }
    setTimeout(function (){
      if(pullUp.className.match('loading')) {
        pullUp.classList.toggle('loading');
        pullUp.querySelector('.pullUpLabel').innerHTML = '';
        pullUp.querySelector('.loader').style.display = 'none';
        pullUp.style.lineHeight = 0 + 'px';
        pullUp.style.fontSize = 0;
      }
      myScroll.refresh();

    }, 500);
  };
};
document.addEventListener('touchmove', function (e){ e.preventDefault(); }, false);
