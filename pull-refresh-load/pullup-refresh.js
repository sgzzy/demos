/**
 * Created by Administrator on 2016/12/28.
 */
var refresher = {
  //设置下拉刷新和上拉加载的参数
  option: {
    pull_up: true,
    //是否显示上拉
    pull_down: true,
    //是否显示下拉
    is_loading: false,
    // 是否正在加载 即上拉后正在加载
    is_refresh: false,
    //是否正在下拉刷新
    pull_distance: 50,
    //拉动距离 即达到出发加载或刷新的临界值
    pull_element_height: 50,
    //上拉 下拉显示标签的高度  也是iscroll回弹后定位的高度
    pull_element_maxHeight: 80
    // 上拉 下拉显示标签的最大高度
  },
  //上拉下拉几个临界点的显示效果
  loading_style: {
    // 变化的文字或者效果
    refresh_before: function (pullDown){
      //没有刷新没有加载情况下 才变化
      if (!refresher.option.is_loading && !refresher.option.is_refresh)
        pullDown.querySelector('.pullDownLabel').innerText = '下拉刷新';
    },
    refresh_able: function (pullDown){
      //没有刷新没有加载情况下 才变化
      if (!refresher.option.is_loading && !refresher.option.is_refresh)
        pullDown.querySelector('.pullDownLabel').innerText = '松手开始刷新';
    },
    refresh_start: function (pullDown, pullUp){
      pullDown.querySelector('.pullDownLabel').innerText = '';
      pullDown.querySelector('.loader').style.display = 'block';
      //正在刷新的时候隐藏上拉加载
      if (refresher.option.pull_up)
        pullUp.style.display = 'none';
    },
    refresh_end: function (pullDown, pullUp){
      pullDown.querySelector('.loader').style.display = 'none';
      pullDown.querySelector('.pullDownLabel').innerText = '刷新完成';
      //刷新完成 显示上拉加载
      if (refresher.option.pull_up)
        pullUp.style.display = '';
    },
    load_before: function (pullUp){
      //没有刷新没有加载情况下 才变化
      if (!refresher.option.is_loading && !refresher.option.is_refresh)
        pullUp.querySelector('.pullUpLabel').innerText = '上拉加载更多';
    },
    load_able: function (pullUp){
      //没有刷新没有加载情况下 才变化
      if (!refresher.option.is_loading && !refresher.option.is_refresh)
        pullUp.querySelector('.pullUpLabel').innerText = '松手开始加载';
    },
    load_start: function (pullUp, pullDown){
      pullUp.querySelector('.pullUpLabel').innerText = '';
      pullUp.querySelector('.loader').style.display = 'block';
      //正在加载的时候 隐藏下拉刷新
      if (refresher.option.pull_down)
        pullDown.style.display = 'none';
    },
    load_end: function (pullUp, pullDown){
      pullUp.querySelector('.loader').style.display = 'none';
      pullUp.querySelector('.pullUpLabel').innerText = '加载完成';
      //加载完成了 显示下拉刷新
      if (refresher.option.pull_down)pullDown.style.display = '';
    }
  },

  iScroll: function (parameter, option, loading_style, pullUp, pullDown){
    var myScroll = new IScroll(document.getElementById(parameter.id), { probeType: 2 });

    myScroll.on('scroll', function (){
      //计算拉动的距离 处理为正数是下拉 负数是上拉
      var absY = this.maxScrollY - this.y;
      this.moved_distance = (this.maxScrollY == 0) ? this.distY : (this.y > 0 ? this.y : (absY > 0 ? -absY : 0));

      //回弹距离0 默认是到初始位置
      this.minScrollY = 0;
      switch (true) {
        //大于0 为下拉刷新 :0 - 刷新的临界值
        case this.moved_distance > 0 && this.moved_distance < option.pull_distance:
          this.y = this.moved_distance > option.pull_element_maxHeight ? option.pull_element_maxHeight : this.moved_distance;
          loading_style.refresh_before(pullDown);
          break;
        //大于0 为下拉刷新 :刷新的临界值以上 出发刷新
        case this.moved_distance > option.pull_distance:
          this.y = this.moved_distance > option.pull_element_maxHeight ? option.pull_element_maxHeight : this.moved_distance;
          loading_style.refresh_able(pullDown);
          //启用下拉刷新 并且不是上拉加载正在加载的情况下才控制回弹高度
          if (option.pull_down && !option.is_loading)
            this.minScrollY = option.pull_element_height;
          break;
        //小于0 上拉加载: 0 - 负数 的刷新临界值
        case this.moved_distance < 0 && this.moved_distance > -option.pull_distance:

          loading_style.load_before(pullUp);
          break;
        //小于0 上拉加载: 负数 的刷新临界值以下 触发加载
        case this.moved_distance < -option.pull_distance:
          if (this.maxScrollY !== 0 ) {
            this.y = -this.moved_distance > option.pull_element_maxHeight ? (this.maxScrollY - option.pull_element_maxHeight) : (this.maxScrollY + this.moved_distance);
          }
          loading_style.load_able(pullUp);
          //启用的上拉加载 并且不是正在刷新 才控制回弹高度
          if (option.pull_up && !option.is_refresh)

            this.minScrollY = (this.maxScrollY == 0 && this.y == 0) ? 0 : option.pull_element_height;
          break;
      }
    });
    //滑动结束的处理
    myScroll.on('scrollEnd', function (e){
      //没有正在刷新且没有正在加载 才触发 刷新和加载的处理
      if (!option.is_loading && !option.is_refresh) {
        //判断临界值
        if (this.moved_distance > option.pull_distance) {
          loading_style.refresh_start(pullDown, pullUp);
          option.is_refresh = true;
          //用一个计时器模拟了加载数据时间
          var t1 = setTimeout(function (){
            clearTimeout(t1);
            loading_style.refresh_end(pullDown, pullUp);
            t1 = setTimeout(function (){
              clearTimeout(t1);
              myScroll.refresh();
              option.is_refresh = false;
            }, 500);
          }, 2000);
        }
        if (this.moved_distance < -option.pull_distance) {
          loading_style.load_start(pullUp, pullDown);
          option.is_loading = true;
          //用一个计时器模拟了加载数据时间
          var t2 = setTimeout(function (){
            clearTimeout(t2);
            parameter.pullUpAction();
            loading_style.load_end(pullUp, pullDown);
            t2 = setTimeout(function (){
              clearTimeout(t2);
              option.is_loading = false;
              myScroll.refresh();
            }, 500);
          }, 2000);
        }
      }
    });

    return myScroll;
  },
  init: function (parameter){

    // 给容器添加scroller、pullDown和pullUp
    var wrapper = document.getElementById(parameter.id);
    var div = document.createElement('div');

    div.className = 'scroller';

    wrapper.appendChild(div);

    var scroller = wrapper.querySelector('.scroller');
    var list = wrapper.querySelector('#' + parameter.id + ' ' + parameter.content);

    scroller.insertBefore(list, scroller.childNodes[0]);

    // 创建下拉控件
    var pullDown = document.createElement('div');

    pullDown.className = 'pullDown';

    var loader = document.createElement('div');

    loader.className = 'loader';

    for (var i = 0; i < 4; i++) {
      var span = document.createElement('span');

      loader.appendChild(span);
    }

   pullDown.appendChild(loader);

    var pullDownLabel = document.createElement('div');

    pullDownLabel.className = 'pullDownLabel';
    pullDown.appendChild(pullDownLabel);

    scroller.insertBefore(pullDown, scroller.childNodes[0]);

    // 创建上拉控件
    var pullUp = document.createElement('div');

    pullUp.className = 'pullUp';
    loader = document.createElement('div');
    loader.className = 'loader';

    for (i = 0; i < 4; i++) {
      span = document.createElement('span');

      loader.appendChild(span);
    }

    pullUp.appendChild(loader);

    var pullUpLabel = document.createElement('div');

    pullUpLabel.className = 'pullUpLabel';

    pullUp.appendChild(pullUpLabel);
    scroller.appendChild(pullUp);



    //根据设置 隐藏上拉下拉标签
    if (!this.option.pull_up)
      pullUp.style.display = 'none';
    if (!this.option.pull_down)
      pullDown.style.display = 'none';
    //实例化iscroll
    document.addEventListener('touchmove', function (e){ e.preventDefault(); }, false);
    return this.iScroll(parameter, this.option, this.loading_style, pullUp, pullDown);

  }
};
