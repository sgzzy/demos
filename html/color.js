/**
 * Created by Administrator on 2016/12/8.
 */
var $ = function (el){
  return document.getElementById(el)
};
var mix = function (target, prototypes){ //将prototype中相应属性的值复制给target的相应属性
  for (var i in prototypes) {
    target[i] = prototypes[i];
  }
};
var getXY = function (el){ //获取el相对于视口的位置
  if (document.documentElement.getBoundingClientRect) { // IE,FF3.0+,Opera9.5+
    var box = el.getBoundingClientRect();
    return {
      x: box.left + document.body.scrollLeft,
      y: box.top + document.body.scrollTop
    }
  } else {

    var pos = [el.offsetLeft, el.offsetTop];
    var op = el.offsetParent;
    if (op != el) {
      while (op) {
        pos[0] += op.offsetLeft + parseInt(op.style.borderLeftWidth) || 0;
        pos[1] += op.offsetTop + parseInt(op.style.borderTopWidth) || 0;
        op = op.offsetParent;
      }
    }
    return { x: pos[0], y: pos[1] }
  }
};
var setData = function (imageData, x, y, value){ //设置imageDate.data属性
  imageData.data[((y * (imageData.width * 4)) + (x * 4)) + 0] = value[0];
  imageData.data[((y * (imageData.width * 4)) + (x * 4)) + 1] = value[1];
  imageData.data[((y * (imageData.width * 4)) + (x * 4)) + 2] = value[2];
  imageData.data[((y * (imageData.width * 4)) + (x * 4)) + 3] = value[3];
};
var can = $("canvas");
var ctx = can.getContext('2d');
var can2 = $("canvas2");
var ctx2 = can2.getContext('2d');
var imageData = ctx.createImageData(360, 100);
var imageData2 = ctx2.createImageData(140, 140);

var pixel;
function toRGB(TColor, q, p, H){ //
  if (TColor < 0) {
    TColor += 1;
  }
  if (TColor > 1) {
    TColor -= 1;
  }
  if (TColor < (1 / 6)) {
    return p + q - p * 6 * TColor;
  } else if (TColor < (1 / 2)) {
    return q;
  } else if (TColor < (2 / 3)) {
    return p + q - p * 6 * 2 / 3 - TColor;
  } else {
    return p;
  }
}

function HSVToRGB(h, s, v){
  var i;
  var f, p, q, t;
  var r, g, b;
  if (s == 0) {
    v = Math.floor(v * 255);
    return {
      r: v,
      g: v,
      b: v
    };
  }
  h /= 60;
  i = Math.floor(h);
  f = h - i;
  p = v * ( 1 - s );
  q = v * ( 1 - s * f );
  t = v * ( 1 - s * ( 1 - f ) );
  switch (i) {
    case 0:
      r = v;
      g = t;
      b = p;
      break;
    case 1:
      r = q;
      g = v;
      b = p;
      break;
    case 2:
      r = p;
      g = v;
      b = t;
      break;
    case 3:
      r = p;
      g = q;
      b = v;
      break;
    case 4:
      r = t;
      g = p;
      b = v;
      break;
    default:
      r = v;
      g = p;
      b = q;
      break;
  }
  return {
    r: r * 255,
    g: g * 255,
    b: b * 255
  };
}
for (var i = 0; i < 100; i++) {
  for (var i2 = 0; i2 < 360; i2++) {
    //   pixel=hslToRgb(i2,1-i/100,0.5)
    pixel = HSVToRGB(i2, i / 100, 0.8)
    setData(imageData, i2, i, [
      pixel.r,
      pixel.g,
      pixel.b,
      255
    ]);

    var xx = Math.ceil(70 + Math.cos(i2 * Math.PI / 180) * i * 0.70)
    var yy = Math.ceil(70 + Math.sin(i2 * Math.PI / 180) * i * 0.70)
    setData(imageData2, xx, yy, [
      pixel.r,
      pixel.g,
      pixel.b,
      255
    ])
  }
}
ctx.putImageData(imageData, 0, 0)
ctx2.putImageData(imageData2, 0, 0)
$("light").onchange = function (){
  ctx.clearRect(0, 0, 360, 100)
  for (var i = 0; i < 100; i++) {
    for (var i2 = 0; i2 < 360; i2++) {
      pixel = HSVToRGB(i2, i / 100, this.value * 1);
      setData(imageData, i2, i, [
        pixel.r,
        pixel.g,
        pixel.b,
        255
      ]);

      var xx = Math.ceil(70 + Math.cos(i2 * Math.PI / 180) * i * 0.70)
      var yy = Math.ceil(70 + Math.sin(i2 * Math.PI / 180) * i * 0.70)
      setData(imageData2, xx, yy, [
        pixel.r,
        pixel.g,
        pixel.b,
        255
      ])
    }
  }
  ctx.putImageData(imageData, 0, 0);

  ctx2.putImageData(imageData2, 0, 0);
};
var canvasPos = getXY($("canvas"));
$("canvas").onclick = function (e){
  var x = e.pageX - canvasPos.x;
  var y = e.pageY - canvasPos.y;
  var rgb = HSVToRGB(x, 1 - y / 100, $("light").value * 1);
  document.body.style.backgroundColor = "RGB(" + Math.round(rgb.r) + "," + Math.round(rgb.g) + "," + Math.round(rgb.b) + ")";
};