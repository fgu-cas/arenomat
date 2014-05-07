(function ($) {

    $.fn.drawVision = function (options) {

        this.each(function (index, element) {
            init.apply(element, [index, element, options]);
        });

        return this;
    }
    var init = function (index, element, options) {
        var ctxs = [];
        var zones = [
            []
        ],
            activeZone = 0,
            activePoint, settings;

	if (localStorage.data) {
	    zones = JSON.parse(localStorage.data);
	}

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

        var colors = [
            [221, 30, 47],
            [235, 176, 53],
            [6, 162, 203],
            [33, 133, 89],
            [208, 198, 177],
            [25, 40, 35]
        ];

        var changeZone = function (zone) {
            activeZone = zone;
	    alert(zone);
            draw();
        }

        var drawArena = function () {
            var ctx = ctxs['arena'];

            // center
            ctx.arc(ctx.canvas.width / 2, ctx.canvas.height / 2, 5, 0, Math.PI * 2);
            ctx.stroke();

            // mask
            ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
            ctx.beginPath();
            ctx.arc(ctx.canvas.width / 2, ctx.canvas.height / 2, ctx.canvas.height / 2, 0, 2 * Math.PI);
            ctx.rect(ctx.canvas.width, 0, -ctx.canvas.width, ctx.canvas.height);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(ctx.canvas.width / 2, ctx.canvas.height / 2, ctx.canvas.height / 2, 0, 2 * Math.PI);
            ctx.strokeStyle = "rgba(255, 255, 255, 0.9)";
            ctx.stroke();
        };

        var draw = function (positions) {
            var ctx = ctxs['zones'];

            ctx.canvas.width = ctx.canvas.width;
            ctx.beginPath();
            ctx.globalAlpha = 1;

            var color = 0;
            for (var n in positions) {
                //alert(colors[color]);
                var i;
                ctx.beginPath();
                for (i = 1; i < positions[n].length; i++) {
                    //console.log(positions[n][i].x);
                    ctx.moveTo(positions[n][i - 1].x, positions[n][i - 1].y);
                    ctx.lineTo(positions[n][i].x, positions[n][i].y);
                }
                ctx.strokeStyle = 'rgb(' + colors[color] + ')';
                ctx.stroke();
                i--;

                ctx.beginPath();
                ctx.arc(positions[n][i].x, positions[n][i].y, 10, 0, Math.PI * 2, true);
                ctx.fillStyle = 'rgba(' + colors[color++] + ', 0.7)';
                ctx.fill();
                ctx.stroke();
            }
        

            //ctx.canvas.width = ctx.canvas.width;
            for (var n = 0; n < zones.length; n++) {
                var points = zones[n];
                if (points.length < 1) {
                    return false;
                }
                ctx.globalCompositeOperation = 'destination-over';
                ctx.fillStyle = 'rgb(255,255,255)';
                ctx.strokeStyle = 'rgb(' + colors[n] + ')';
                ctx.lineWidth = 1;

                ctx.beginPath();
                //	ctx.strokeRect(position.x, position.y, 5, 5);
                ctx.moveTo(points[0].x, points[0].y);
                var width = 10;
                for (var i = 0; i < points.length; i++) {
                    if (n == activeZone) {
                        ctx.fillRect(points[i].x - width / 2, points[i].y - width / 2, width, width);
                        ctx.strokeRect(points[i].x - width / 2, points[i].y - width / 2, width, width);
                    }

                    if (points.length > 1 && i > 0) {
                        ctx.lineTo(points[i].x, points[i].y);
                    }
                }

                ctx.closePath();
                ctx.fillStyle = 'rgba(' + colors[n] + ',0.3)';
                if (n == activeZone) ctx.fillStyle = 'rgba(' + colors[n] + ',0.7)';
                ctx.fill();
                ctx.stroke();
            }

            record();
        };

        var move = function (e) {
            if (!e.offsetX) {
                e.offsetX = (e.pageX - $(e.target).offset().left);
                e.offsetY = (e.pageY - $(e.target).offset().top);
            }
            zones[activeZone][activePoint].x = Math.round(e.offsetX);
            zones[activeZone][activePoint].y = Math.round(e.offsetY);
            draw();
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
            for (var i = 0; i < zones[activeZone].length; i++) {
                dis = Math.sqrt(Math.pow(x - zones[activeZone][i].x, 2) + Math.pow(y - zones[activeZone][i].y, 2));
                if (dis < 6) {
                    zones[activeZone].splice(i, 1);
                    draw();
                    record();
                    return false;
                }
            }
            return false;
        };

        var mousedown = function (e) {
            if (!zones[activeZone]) zones[activeZone] = [];
            var x, y, dis, lineDis, insertAt = zones[activeZone].length;

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

            for (var i = 0; i < zones[activeZone].length; i++) {
                dis = Math.sqrt(Math.pow(x - zones[activeZone][i].x, 2) + Math.pow(y - zones[activeZone][i].y, 2));
                if (dis < 6) {
                    activePoint = i;
                    $(this).bind('mousemove', move);
                    return false;
                }
            }

            for (var i = 0; i < zones[activeZone].length; i++) {
                if (i > 1) {
                    lineDis = dotLineLength(
                    x, y,
                    zones[activeZone][i].x, zones[activeZone][i].y,
                    zones[activeZone][i - 1].x, zones[activeZone][i - 1].y,
                    true);
                    if (lineDis < 6) {
                        insertAt = i;
                    }
                }
            }
            zones[activeZone].splice(insertAt, 0, {
                x: Math.round(x),
                y: Math.round(y)
            });
            activePoint = insertAt;
            $(this).bind('mousemove', move);

            draw();
            record();

            return false;
        };


        var record = function () {
            localStorage.setItem('data', JSON.stringify(zones));
            //socket.emit('area', points);

        };

        var canvases = ['zones', 'objects', 'arena'];
        for (var value in canvases) {
	    if ($('#' + canvases[value]).length == 0) {
            // arena image
            var canvas = $('<canvas/>').attr({
                id: canvases[value],
                width: $(element).width(),
                height: $(element).height()
            }).css('position', 'absolute');

            $(element).append(canvas);
	    }

            ctxs[canvases[value]] = $('#' + canvases[value]).get(0).getContext("2d");
        }

        $(document).ready(function () {
            $('#zones')
                .bind('mousedown', mousedown)
                .bind('contextmenu', rightclick)
                .bind('mouseup', stopdrag);
/*
    	    $(document).on('click', function( e ) {
		    activeZone = -1;
	    });
*/
            $('.change').on('click', function (e) {
                e.preventDefault();
                changeZone($(this).attr('href'));
                $('.change').removeClass('active');
                $(this).addClass('active');
            });
        });


        drawArena();
        draw(positions);
    }

    var dotLineLength = function (x, y, x0, y0, x1, y1, o) {
        function lineLength(x, y, x0, y0) {
            return Math.sqrt((x -= x0) * x + (y -= y0) * y);
        }
        if (o && !(o = function (x, y, x0, y0, x1, y1) {
            if (!(x1 - x0)) return {
                x: x0,
                y: y
            };
            else if (!(y1 - y0)) return {
                x: x,
                y: y0
            };
            var left, tg = -1 / ((y1 - y0) / (x1 - x0));
            return {
                x: left = (x1 * (x * tg - y + y0) + x0 * (x * -tg + y - y1)) / (tg * (x1 - x0) + y0 - y1),
                y: tg * left - tg * x + y
            };
        }(x, y, x0, y0, x1, y1), o.x >= Math.min(x0, x1) && o.x <= Math.max(x0, x1) && o.y >= Math.min(y0, y1) && o.y <= Math.max(y0, y1))) {
            var l1 = lineLength(x, y, x0, y0),
                l2 = lineLength(x, y, x1, y1);
            return l1 > l2 ? l2 : l1;
        } else {
            var a = y0 - y1,
                b = x1 - x0,
                c = x0 * y1 - y0 * x1;
            return Math.abs(a * x + b * y + c) / Math.sqrt(a * a + b * b);
        }
    };
})(jQuery);
