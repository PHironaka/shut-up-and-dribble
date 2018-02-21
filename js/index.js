var canvas;
   var canvasWidth;
   var ctx;
   var x;
   var y;
   var download;
   var data;
   var fileInput;
   var img;




  window.onload = function() {


    willNotDribble();
  }

  function willNotDribble() {
    img = document.getElementById('img-placeholder');
    var deviceWidth = window.innerWidth;;
      canvasWidth = Math.min(600, deviceWidth-20);
  canvasHeight = Math.min(480, deviceWidth-20);
  canvas = document.getElementById('memecanvas');
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  
  
    ctx = canvas.getContext('2d');

     x = canvas.width/2 - img.width/2;
     y = canvas.height/2 - img.height/2;

    ctx.drawImage(img, x, y);
   
  

    fileInput = document.getElementById('fileInput');

  fileInput.addEventListener('change', function(e) {
    
    var reader = new FileReader();
    reader.onload = function(event){

        img.onload = function(){
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            document.getElementById('scale').value = 1;
            document.getElementById('rotate').value = 0;
                 x = canvas.width/2 - img.width/2;
     y = canvas.height/2 - img.height/2;
            ctx.drawImage(img,x,y);
            //imgTransform();
        }
        img.src = reader.result;
    }
    reader.readAsDataURL(fileInput.files[0]);     




   }, false);

   var controls = document.getElementById('controls');
   
   var scale = document.getElementById('scale');
    scale.addEventListener('change', doTransform, false);

   var rotate = document.getElementById('rotate');
    rotate.addEventListener('change', doTransform, false);


function download() {
    var dt = canvas.toDataURL("image/jpg");
    this.href = dt; //this may not work in the future..
}
document.getElementById('download').addEventListener('click', download, false);


  }

willNotDribble();


  function doTransform() {
    ctx.save();
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Translate to center so transformations will apply around this point
    ctx.translate(canvas.width/2, canvas.height/2);

    // Perform scale
    var val = document.getElementById('scale').value;
    ctx.scale(val,val);

    // Perform rotation
    val = document.getElementById('rotate').value;
    ctx.rotate(val*Math.PI/180);

    // Reverse the earlier translation
    ctx.translate(-canvas.width/2, -canvas.height/2);

    // Finally, draw the image
    ctx.drawImage(img, x, y);

    ctx.restore();

}


 

 