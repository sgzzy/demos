/**
 * Created by Administrator on 2016/11/17.
 */
define(function (require, exports, module){

  var $ = function (id){
       return document.getElementById(id);
     };
  var $$ = function (className){
      return document.getElementsByClassName(className);
    };
  var $$$ = function (tagName){
      return document.getElementsByTagName(tagName);
    };
  exports.$ = $;
  exports.$$ = $$;
  exports.$$$ = $$$;

});
