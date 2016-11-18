/**
 * Created by Administrator on 2016/11/17.
 */
define(function (){
  return {
    $ : function (id){
       return document.getElementById(id);
     },
    $$ : function (className){
      return document.getElementsByClassName(className);
    },
    $$$ : function (tagName){
      return document.getElementsByTagName(tagName);
    }
  };
});
