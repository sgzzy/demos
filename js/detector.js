/**
 * Created by Administrator on 2016/11/9.
 */
!function (global){//立即执行匿名函数表达式
  function DetectoeBase(configs){
    if (!this instanceof DetectoeBase) {//必须通过new创建对象实例
      throw new Error("Do not invoke without new.");
    }
    this.configs = configs;
    this.analyze();
  }

  DetectoeBase.prototype.detect = function (){//抽象方法，说明需要方法来继承，但是基类不需要实现
    throw new Error("Nor implemented");
  };
  DetectoeBase.prototype.analyze = function (){
    console.log("analyzing...");
    this.data = "###data###";
  };

  function LinkDetector(links){
    if (!this instanceof LinkDetector) {
      throw new Error("Do not invoke without new.");
    }
    this.links = links;
    DetectoeBase.apply(this, arguments);
  }

  function ContainerDetector(containers){
    if (!this instanceof LinkDetector) {
      throw new Error("Do not invoke without new.");
    }
    this.containers = containers;
    DetectoeBase.apply(this, arguments);
  }

  //inherit first
  inherit(LinkDetector, DetectoeBase);
  inherit(ContainerDetector, DetectoeBase);
  function inherit(subClass, superClass){
    subClass.prototype = Object.create(superClass.prototype);
    subClass.constructor = subClass;
  }

  //expand later
  LinkDetector.prototype.detect = function (){
    console.log("Loading data: " + this.data);
    console.log("Link detection started.");
    console.log("Scaning links: " + this.links);
  };

  ContainerDetector.prototype.detect = function (){
    console.log("Loading data: " + this.data);
    console.log("Container detection started.");
    console.log("Scaning containers: " + this.containers);
  };

  //prevent from being altered
  Object.freeze(DetectoeBase);
  Object.freeze(DetectoeBase.prototype);
  Object.freeze(LinkDetector);
  Object.freeze(LinkDetector.prototype);
  Object.freeze(ContainerDetector);
  Object.freeze(ContainerDetector.prototype);

  //export to global object
  Object.defineProperties(global, {
    LinkDetector: { value: LinkDetector },
    ContainerDetector: { value: ContainerDetector },
    DetectorBase: { value: DetectoeBase }
  });
}(this);

var cd = new ContainerDetector("#abc #def #ghi");
var ld = new LinkDetector("http://www.taobao.com http://www.tamll.com http://www.baidu.com");
cd.detect();
ld.detect();

