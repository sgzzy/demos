/**
 * Created by Administrator on 2016/11/17.
 */
define(["css","node","util"], function (css, node, util){
  
  function slide(cTarget, cItem, cDirection, isTrigger, autoPlay){
  }
  function next(iTarget){
    setInterval(move(iTarget),30);
  }

    function startMove(iTarget,timer)
    {
      var oThis = this;
      clearInterval(timer);
      timer = setInterval(function ()
      {
        doMove.call(oThis,iTarget)
      }, 30)
    }
    function doMove (iTarget)
    {
      var iSpeed = (iTarget - css(this, "left")) / 10;
      iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
      css(this,"left") == iTarget ? clearInterval(timer) : css(this,"left",(css(this,"left")+iSpeed));
    }

});
