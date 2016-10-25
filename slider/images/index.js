/**
 * Created by sgzzy on 2016/10/24.
 */
function normalSlide (init,time,left,disp) {
  var instance = (new Date()).getTime() - init;
  if (instance < time) {
    var pos = Math.floor(disp * instance / time);
    var result = left + pos;
    slider.style.left = result + 'px';
  }
}