(function ($) {
    $.fn.draw = function (options) {
        this.each(function (index, element) {
            init.apply(element, [index, element, options]);
        });
    }

	// main 
    var init = function (index, element, options) {
        settings = $.extend({
            //      imageUrl: $(this).attr('src')
        }, options);

        var ctxs = [];
        var points = [], activePoint, settings;

/**
 * draw arena mask
 */
        var drawArena = function () {
            var ctx = ctxs['arena'];

            // center
            ctx.arc(ctx.canvas.width / 2, ctx.canvas.height / 2, 5, 0, Math.PI * 2);
            ctx.stroke();

            // mask
            ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
            ctx.beginPath();
            ctx.arc(ctx.canvas.width / 2, ctx.canvas.height / 2, ctx.canvas.height / 2, 0, 2 * Math.PI);
            ctx.rect(ctx.canvas.width, 0, -ctx.canvas.width, ctx.canvas.height);
            ctx.fill();
        };

/**
 * draw all objects
 * @param {type} allPositions draw all objects and theirs trail paths
 */
        var drawObjects = function (allPositions) {
            var ctx = ctxs['objects'];

            //objectsCtx.canvas.width = objectsCtx.canvas.width;

            ctx.beginPath();
            ctx.globalAlpha = 1;

            $.each(allPositions, function (index, positions) {
                var i;
                ctx.beginPath();
                for (i = 1; i < positions.length; i++) {
                    console.log(positions[i].x);
                    ctx.moveTo(positions[i - 1].x, positions[i - 1].y);
                    ctx.lineTo(positions[i].x, positions[i].y);
                }
                ctx.strokeStyle = '#2ba6cb';
                ctx.stroke();
                i--;

                ctx.beginPath();
                ctx.arc(positions[i].x, positions[i].y, 10, 0, Math.PI * 2, true);
                ctx.fillStyle = 'rgba(0, 255, 0, 0.5)';
                ctx.fill();
            });
        }

        drawZones = function () {
            var ctx = ctxs['zones'];
            ctx.canvas.width = ctx.canvas.width;

            if (points.length < 1) {
                return false;
            }
            ctx.globalCompositeOperation = 'destination-over';
            ctx.fillStyle = 'rgb(255,255,255)'
            ctx.strokeStyle = 'rgb(20,20,255)';
            ctx.lineWidth = 1;

            ctx.beginPath();
            //	ctx.strokeRect(position.x, position.y, 5, 5);
            ctx.moveTo(points[0].x, points[0].y);
            var width = 10;
            for (var i = 0; i < points.length; i++) {
                ctx.fillRect(points[i].x - width / 2, points[i].y - width / 2, width, width);
                ctx.strokeRect(points[i].x - width / 2, points[i].y - width / 2, width, width);

                if (points.length > 1 && i > 0) {
                    ctx.lineTo(points[i].x, points[i].y);
                }
            }

            ctx.closePath();
            //console.log(activeArea);
            ctx.fillStyle = 'rgba(0,0,255,0.3)';
            ctx.fill();
            ctx.stroke();

            record();
        };


        var move = function (e) {
            if (!e.offsetX) {
                e.offsetX = (e.pageX - $(e.target).offset().left);
                e.offsetY = (e.pageY - $(e.target).offset().top);
            }
            points[activePoint].x = Math.round(e.offsetX);
            points[activePoint].y = Math.round(e.offsetY);
            drawZones();
        };

        var stopdrag = function () {
            $(this).unbind('mousemove');
            record();
            activePoint = null;
        };

        var rightclick = function (e) {
            e.preventDefault();
            if (!e.offsetX) {
                e.offsetX = (e.pageX - $(e.target).offset().left);
                e.offsetY = (e.pageY - $(e.target).offset().top);
            }
            var x = e.offsetX,
                y = e.offsetY;
            for (var i = 0; i < points.length; i++) {
                dis = Math.sqrt(Math.pow(x - points[i].x, 2) + Math.pow(y - points.y, 2));
                if (dis < 6) {
                    points.splice(i, 1);
                    drawZones();
                    record();
                    return false;
                }
            }
            return false;
        };

        var mousedown = function (e) {
            var x, y, dis, lineDis, insertAt = points.length;

            if (e.which === 3) {
                return false;
            }

            e.preventDefault();
            if (!e.offsetX) {
                e.offsetX = (e.pageX - $(e.target).offset().left);
                e.offsetY = (e.pageY - $(e.target).offset().top);
            }
            x = e.offsetX;
            y = e.offsetY;

            for (var i = 0; i < points.length; i++) {
                dis = Math.sqrt(Math.pow(x - points[i].x, 2) + Math.pow(y - points[i].y, 2));
                if (dis < 6) {
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
                    points[i - 1].x, points[i - 1].y,
                    true);
                    if (lineDis < 6) {
                        insertAt = i;
                    }
                }
            }
            points.splice(insertAt, 0, {
                x: Math.round(x),
                y: Math.round(y)
            });
            activePoint = insertAt;
            $(this).bind('mousemove', move);

            drawZones();
            record();

            return false;
        };


        var record = function () {
            localStorage.setItem('data', points);
            //socket.emit('area', points);

        };


        $.each(['objects', 'zones', 'arena'], function (index, value) {
            // arena image
            var canvas = $('<canvas/>').attr({
                id: value,
                width: $(element).width(),
                height: $(element).height()
            }).css('position', 'absolute');

            $(element).append(canvas);
            ctxs[value] = canvas.get(0).getContext("2d");

            if (value == 'zones') {
                $(document).ready(function () {
                    canvas.bind('mousedown', mousedown);
                    canvas.bind('contextmenu', rightclick);
                    canvas.bind('mouseup', stopdrag);
                });
            }
        });


// LET'S GO
        drawArena();
		
        var positions = {
            subject: [{
                x: 50,
                y: 50
            }, {
                x: 400,
                y: 150
            }],
            robot: [{
                x: 100,
                y: 200
            }, {
                x: 200,
                y: 300
            }]
        }


        drawObjects(positions);

    }
    
	var dotLineLength = function(x, y, x0, y0, x1, y1, o) {
		function lineLength(x, y, x0, y0) {
			return Math.sqrt((x -= x0) * x + (y -= y0) * y);
		}
		if (o && !(o = function(x, y, x0, y0, x1, y1) {
			if (!(x1 - x0))
				return {x: x0, y: y};
			else if (!(y1 - y0))
				return {x: x, y: y0};
			var left, tg = -1 / ((y1 - y0) / (x1 - x0));
			return {x: left = (x1 * (x * tg - y + y0) + x0 * (x * -tg + y - y1)) / (tg * (x1 - x0) + y0 - y1), y: tg * left - tg * x + y};
		}(x, y, x0, y0, x1, y1), o.x >= Math.min(x0, x1) && o.x <= Math.max(x0, x1) && o.y >= Math.min(y0, y1) && o.y <= Math.max(y0, y1))) {
			var l1 = lineLength(x, y, x0, y0), l2 = lineLength(x, y, x1, y1);
			return l1 > l2 ? l2 : l1;
		}
		else {
			var a = y0 - y1, b = x1 - x0, c = x0 * y1 - y0 * x1;
			return Math.abs(a * x + b * y + c) / Math.sqrt(a * a + b * b);
		}
	};    
})(jQuery);

$('#vision').draw();
