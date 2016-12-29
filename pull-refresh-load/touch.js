/**
 * Created by Administrator on 2016/12/28.
 */
function loaded(){

  var orderList = document.querySelector('tbody');
  var sum = 50;
  var page = 0;
  var pages = 1;
  var size = 12;
  var iscroll = refresher.init({
    id: 'wrapper',
    content: 'table',
    pullDownAction: function (){
      load();
    },
    pullUpAction: function (){
      load(true);
    }
  });

  var load = function (next){
    next ? (page <= pages ? ++page : page) : (page > 1 ? --page : page);

    var _pages = pages;

    pages = Math.max(Math.ceil(sum / size), 1);

    if (pages !== _pages) {
      if (next) {
        if (page >= _pages && pages > _pages) {

          var list = document.querySelectorAll('tr');
          var length = list.length || 0;
          for ( var i = 0; i < size; i++) {
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
                  td.innerText = (length + i +1) + '';
                  break;
                case 3:
                  td.innerText = (99 - length - i) + '';
              }
              tr.appendChild(td);
            }
            orderList.appendChild(tr);
          }
        }
      }
    } else {
      if (page <= pages) {
        var list = document.querySelectorAll('tr');
        var length = list.length || 0;
        for ( var i = 0; i < size; i++) {
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
                td.innerText = (length + i +1) + '';
                break;
              case 3:
                td.innerText = (99 - length - i) + '';
            }
            tr.appendChild(td);
          }
          orderList.appendChild(tr);
        }
      }
    }
  };
  // load(true);
}