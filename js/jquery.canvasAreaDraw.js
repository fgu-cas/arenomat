(function( $ ){

  $.fn.canvasAreaDraw = function(options) {

    this.each(function(index, element) {
      init.apply(element, [index, element, options]);
    });

  }

  $.fn.canvasAreaReDraw = function(options) {

    this.each(function(index, element) {
      draw.apply(element);
    });

  }

  var init = function(index, input, options) {

    var points, activePoint, settings;
    var $canvas, ctx, image;
    var draw, mousedown, stopdrag, move, resize, reset, rightclick, record;

    settings = $.extend({
//      imageUrl: $(this).attr('src')
    }, options);

   resize = function() {
      draw();
    };

    reset = function() {
      points = [];
      draw();
    };

    move = function(e) {
      if(!e.offsetX) {
        e.offsetX = (e.pageX - $(e.target).offset().left);
        e.offsetY = (e.pageY - $(e.target).offset().top);
      }
      points[activePoint].x = Math.round(e.offsetX);
      points[activePoint].y = Math.round(e.offsetY);
      draw();
    };

    stopdrag = function() {
      $(this).unbind('mousemove');
      record();
      activePoint = null;
    };

    rightclick = function(e) {
      e.preventDefault();
      if(!e.offsetX) {
        e.offsetX = (e.pageX - $(e.target).offset().left);
        e.offsetY = (e.pageY - $(e.target).offset().top);
      }
      var x = e.offsetX, y = e.offsetY;
      for (var i = 0; i < points.length; i++) {
        dis = Math.sqrt(Math.pow(x - points[i].x, 2) + Math.pow(y - points.y, 2));
        if ( dis < 6 ) {
          points.splice(i, 1);
          draw();
          record();
          return false;
        }
      }
      return false;
    };

    mousedown = function(e) {
      var x, y, dis, lineDis, insertAt = points.length;

      if (e.which === 3) {
        return false;
      }

      e.preventDefault();
      if(!e.offsetX) {
        e.offsetX = (e.pageX - $(e.target).offset().left);
        e.offsetY = (e.pageY - $(e.target).offset().top);
      }
      x = e.offsetX; y = e.offsetY;

      for (var i = 0; i < points.length; i++) {
        dis = Math.sqrt(Math.pow(x - points[i].x, 2) + Math.pow(y - points[i].y, 2));
        if ( dis < 6 ) {
          activePoint = i;
          $(this).bind('mousemove', move);
          return false;
        }
      }

      for (var i = 0; i < points.length; i++) {
        if (i > 1) {
          lineDis = dotLineLength(
            x, y,
            points[i].x, points[i].y,
            points[i-1].x, points[i-1].y,
            true
          );
          if (lineDis < 6) {
            insertAt = i;
          }
        }
      }
      points.splice(insertAt, 0, { x: Math.round(x), y: Math.round(y) });
      activePoint = insertAt;
      $(this).bind('mousemove', move);

      draw();
      record();

      return false;
    };

    draw = function() {
      ctx.canvas.width = ctx.canvas.width;

      if (points.length < 1) {
        return false;
      }
      ctx.globalCompositeOperation = 'destination-over';
      ctx.fillStyle = 'rgb(255,255,255)'
      ctx.strokeStyle = 'rgb(20,20,255)';
      ctx.lineWidth = 1;

      ctx.beginPath();
	ctx.strokeRect(position.x, position.y, 5, 5);
      ctx.moveTo(points[0].x, points[0].y);
var width = 10;
      for (var i = 0; i < points.length; i++) {
        ctx.fillRect(points[i].x-width/2, points[i].y-width/2, width, width);
        ctx.strokeRect(points[i].x-width/2, points[i].y-width/2, width, width);

        if (points.length > 1 && i > 0) {
          ctx.lineTo(points[i].x, points[i].y);
        }
      }

      ctx.closePath();
//console.log(activeArea);
if (activeArea[0])
      ctx.fillStyle = 'rgba(255,0,0,0.3)';
else
      ctx.fillStyle = 'rgba(0,0,255,0.3)';
      ctx.fill();
      ctx.stroke();

      record();
    };

    record = function() {
	localStorage.setItem('data', points);
            socket.emit('area', points);

    };



    if(false) { //localStorage.data!=null){
    points = localStorage.data.split(',').map(function(point) {
        return parseInt(point, 10);
      });

    } else {
      points = [];
    }
    $canvas = $(this);

    record();

    ctx = $canvas[0].getContext('2d');



    $(document).ready( function() {
      $canvas.bind('mousedown', mousedown);
      $canvas.bind('contextmenu', rightclick);
      $canvas.bind('mouseup', stopdrag);
    });

        socket.on('position', function() {
	    if (position.x && position.y) {
		draw();
	    }
        });

setInterval(draw,500);

  };

  $(document).ready(function() {
    $('#areas').canvasAreaDraw();
  });

  var dotLineLength = function(x, y, x0, y0, x1, y1, o) {
    function lineLength(x, y, x0, y0){
      return Math.sqrt((x -= x0) * x + (y -= y0) * y);
    }
    if(o && !(o = function(x, y, x0, y0, x1, y1){
      if(!(x1 - x0)) return {x: x0, y: y};
      else if(!(y1 - y0)) return {x: x, y: y0};
      var left, tg = -1 / ((y1 - y0) / (x1 - x0));
      return {x: left = (x1 * (x * tg - y + y0) + x0 * (x * - tg + y - y1)) / (tg * (x1 - x0) + y0 - y1), y: tg * left - tg * x + y};
    }(x, y, x0, y0, x1, y1), o.x >= Math.min(x0, x1) && o.x <= Math.max(x0, x1) && o.y >= Math.min(y0, y1) && o.y <= Math.max(y0, y1))){
      var l1 = lineLength(x, y, x0, y0), l2 = lineLength(x, y, x1, y1);
      return l1 > l2 ? l2 : l1;
    }
    else {
      var a = y0 - y1, b = x1 - x0, c = x0 * y1 - y0 * x1;
      return Math.abs(a * x + b * y + c) / Math.sqrt(a * a + b * b);
    }
  };
})( jQuery );
