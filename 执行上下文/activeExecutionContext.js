/**
 * Created by Administrator on 2017/1/10.
 */
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
 2、函数声明（冲突会覆盖）
 3、变量声明（冲突会忽略，其值还是上一个的值）
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

// 执行上下文
// 全局执行上下文
// 编译阶段
// 首先是全局函数和属性的声明
/**
 * 然后按顺序声明
 * 注： 函数声明冲突会覆盖（无论冲突的是函数声明还是变量声明）
 *      变量声明冲突会忽略（同上，保持原值）
 */
// 执行阶段
/**
 * 变量命名冲突，遇到赋值语句时会覆盖。（注： 此时函数已经声明，所以不会二次声明，因此冲突时函数会被变量或函数字面量覆盖掉。）
 */
// 然后每个函数的执行上下文（需要执行时才会生成）（当作时一个微型的全局执行上下文）
/**
 * 声明顺序
 * 1、函数实参
 * 2、函数声明（冲突会覆盖）
 * 3、变量声明（冲突会忽略）
 * 若函数中还有函数企鹅杯调用，依次循环下去
 */
console.log(a);
var a = 10;
function a(){
  var b = 0;
}
console.log(a);
function A(){
  console.log(a);
  console.log(c);
  console.log(e);
  var c = 10;
  function e(){
    console.log(e);
    console.log(a);
    console.log(c);
    console.log(e);
    var e = 10;
    return 10;
  }
  e();
}
A();
console.log(a);