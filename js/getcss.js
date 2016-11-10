/**
 * Created by Administrator on 2016/11/10.
 */
function GetCss(node){
  this.node = node;
}
GetCss.prototype = {
  Css: function (){
    var css = this.node.currentStyle ? this.node.currentStyle : getComputedStyle(this.node, null);
    return css;
  }
};