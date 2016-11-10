/**
 * Created by Administrator on 2016/11/9.
 */
var person = {age:28,title:"fe"};
delete person.age;//true
delete person["title"];//true
console.log(person.age);//undefined
delete person.age;//true;返回该属性是否被删除

delete Object.prototype;//false
var descriptor = Object.getOwnPropertyDescriptor(Object,"prototype");
console.log(descriptor.configurable);

function foo(x, y,z){
  var len = arguments.length;

}
/*执行上下文
类似栈的结构
变量对象：用于存储执行上下文中的：变量、函数声明、函数形参
*
activeExecutionContext = {
  VO : {
    data_var,
    data_func_declaration,
    data_func_arguments
  }
};*/
//GlobalContextVO (VO === this === global)
var a = 10;
function text(x){
  var b = 20;
}
text(30);
/*VO(globalContext) = {
  a: 10,
  text: <ref to function>
};
VO(text functionContext) = {
  x: 30,
  b: 20
};*/
//VO(functionContext) === AO 激活对象
/*
AO = {
  arguments:<Arg0>
};
arguments = {
  callee,
  length,
  proterties=indexes
};
VO填充顺序
1、函数参数
2、函数声明
3、变量声明
 */
function SuperType(name){
  this.name = name;
  this.colors = ["red", "blue", "green"];
}
SuperType.prototype.sayName = function (){
  console.log(this.name);
};
function SubType(name, age){
  SuperType.call(this, name);
  this.age = age;
}
SubType.prototype = new SuperType();
SubType.prototype.constructor = SubType;