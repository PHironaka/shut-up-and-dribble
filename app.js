var img;
var imgW;
var tttRotate = 0;
var tttScale = 1;
var canvas = document.getElementById('canvas'),
  ctx = canvas.getContext('2d');
var x;
var y;
var width;
var height;
var tttLong = 0;
var tttAlt = 0;

var qqq = 0;
var www = 0;
var eee = 0;


function draw() {
  ctx = document.getElementById('canvas').getContext('2d');
  img = new Image();
  var f = document.getElementById("uploadimage").files[0],
    url = window.zURL || window.URL,
    src = url.createObjectURL(f);
  img.src = src;

  img.onload = function() {

    ctx.scale((canvas.width / img.width), (canvas.width / img.width));

    ctx.drawImage(img, 0, 0, img.width, img.height);
  };
};
document.getElementById("uploadimage").addEventListener("change", draw, false)

function Move(a) {
  switch (a) {

    case 'left':
      tttAlt = tttAlt - 50;
      break;
    case 'right':
      tttAlt = tttAlt + 50;
      break;
    case 'down':
      tttLong = tttLong + 50;
      break;
    case 'up':
      tttLong = tttLong - 50;
      break;


    case 'plus':
      if (tttScale > 2) {
        tttScale = 1;
      }
      tttScale = tttScale + 0.05;
      break;
    case 'mines':
      if (tttScale < 0) {
        tttScale = 1;
      }
      tttScale = tttScale - 0.05;
      break;
    default:
      tttScale = 1;
  }
  ctx.save();
  x = img.width / 2;
  y = img.width / 2;
  width = img.width;
  height = img.height;
  ctx.clearRect(0, 0, img.width, img.height);
  ctx.scale(tttScale, tttScale);
  ctx.translate(x + tttAlt, y + tttLong);
  ctx.rotate(tttRotate);
  ctx.drawImage(img, -width / 2, -height / 2, width, height);
  ctx.restore();
}

function Rot() {

  ctx.save();
  tttRotate += 90 / 57.2958;
  x = img.width / 2;
  y = img.width / 2;
  width = img.width;
  height = img.height;
  ctx.clearRect(0, 0, width, height);
  ctx.scale(tttScale, tttScale);
  ctx.translate(x, y);
  ctx.rotate(tttRotate);
  ctx.drawImage(img, -width / 2, -height / 2, width, height);
  ctx.restore();
}

function doCanvas() {
  ctx.fillStyle = '#FF8F00';
  ctx.fillRect(0, 0, 500, 500);

};

function but(a) {

  switch (a) {
    case '1':
      flag = "https://peterhironaka.com/uploads/space-pic.jpg";
      break;
    default:
      flag = "111";
  }
  imgW = new Image();
  imgW.crossOrigin = "anonymous";
  imgW.src = flag;
  imgW.onload = function() {
    ctx.drawImage(imgW, 0, 0, imgW.width, imgW.height, 0, 0, (imgW.width * canvas.height) / imgW.width, canvas.width);
  }
}

function download() {
  var dt = canvas.toDataURL('image/jpeg');
  this.href = dt;
};
downloadLnk.addEventListener('click', download, false);