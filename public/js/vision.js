 ;
 (function ($, window, document, undefined) {

     var pluginName = "arena",
         defaults = {
             //propertyName: "value"
         };

     // The actual plugin constructor
     function Plugin(element, options) {
         this.element = element;
         this.settings = $.extend({}, defaults, options);
         this._defaults = defaults;
         this._name = pluginName;
         this.ctxs = [];
         this.zones = [
             []
         ];
         this.activeZone = 0;
         this.activePoint = 0;
	this.inZones = [];
        this.positions = {
                 subject: [ {x: 0, y: 0 }],
                 robot: [ {x: 0, y: 0 }],
             }

         this.colors = [
             [30, 221, 47],
             [235, 176, 53],
             [6, 162, 203],
             [33, 133, 89],
             [208, 198, 177],
             [25, 40, 35]
         ];

         this.init();
     }

     Plugin.prototype = {
	// true/false when mouse is in
	setInZones: function (ins) {
	    this.inZones = ins;
	    this.drawZones();
	},
	// more objects
	addPosition: function (pos) {
	    this.positions.subject.push(pos);

	    if (this.positions.subject.length > 50) this.positions.subject.shift();
	    this.drawObjects();
	},
         init: function (element, options) {
             var ctxs = this.ctxs;
             var sets = ['zones', 'objects', 'arena'];
             for (var n = 0; n < sets.length; n++) {
                 // arena image
                 var canvas = $('<canvas/>').attr({
                     id: sets[n],
                     width: $(this.element).width(),
                     height: $(this.element).height()
                 }).css('position', 'absolute');

                 $(this.element).append(canvas);
                 ctxs[sets[n]] = canvas.get(0).getContext("2d");
             }

             // $(document).ready(function () {
             // alert('ready');
             $('#zones')
                 .bind('mousedown', this, this.mousedown)
                 .bind('contextmenu', this, this.rightclick)
                 .bind('mouseup', this, this.stopdrag);

             $('.change').on('click', this, function (e) {
                 var that = e.data;
                 e.preventDefault();

                 that.changeZone($(this).attr('href'));
                 $('.change').removeClass('active');
                 $(this).addClass('active');
             });
             //});


             this.drawArena();
             this.drawObjects();
         },
         changeZone: function (zone) {
             this.activeZone = zone;

             this.drawZones();
         },

         drawArena: function () {
             var ctx = this.ctxs['arena'];

             // center
             ctx.arc(ctx.canvas.width / 2, ctx.canvas.height / 2, 5, 0, Math.PI * 2);
             ctx.stroke();

             // mask
             ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
             ctx.beginPath();
             ctx.arc(ctx.canvas.width / 2, ctx.canvas.height / 2, ctx.canvas.height / 2, 0, 2 * Math.PI);
             ctx.rect(ctx.canvas.width, 0, -ctx.canvas.width, ctx.canvas.height);
             ctx.fill();
         },

         drawObjects: function () {
             var ctx = this.ctxs['objects'];

             ctx.canvas.width = ctx.canvas.width;

             ctx.beginPath();
             ctx.globalAlpha = 1;

             $.each(this.positions, function (index, positions) {
                 var i;
                 ctx.beginPath();
                 for (i = 1; i < positions.length; i++) {
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
         },

         drawZones: function () {
             var ctx = this.ctxs['zones'];
             ctx.canvas.width = ctx.canvas.width;
             for (var n = 0; n < this.zones.length; n++) {
                 var points = this.zones[n];
                 if (points.length < 1) {
                     return false;
                 }
                 ctx.globalCompositeOperation = 'destination-over';
                 ctx.fillStyle = 'rgb(255,255,255)';
                 ctx.strokeStyle = 'rgb(' + this.colors[n] + ')';
                 ctx.lineWidth = 1;

                 ctx.beginPath();
                 //	ctx.strokeRect(position.x, position.y, 5, 5);
                 ctx.moveTo(points[0].x, points[0].y);
                 var width = 10;
                 for (var i = 0; i < points.length; i++) {
                     if (n == this.activeZone) {
                         ctx.fillRect(points[i].x - width / 2, points[i].y - width / 2, width, width);
                         ctx.strokeRect(points[i].x - width / 2, points[i].y - width / 2, width, width);
                     }

                     if (points.length > 1 && i > 0) {
                         ctx.lineTo(points[i].x, points[i].y);
                     }
                 }

                 ctx.closePath();
                 ctx.fillStyle = 'rgba(' + this.colors[n] + ',0.3)';
                 if (n == this.activeZone) ctx.fillStyle = 'rgba(' + this.colors[n] + ',0.7)';
		 if (this.inZones[n]) ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
                 ctx.fill();
                 ctx.stroke();
             }
             this.record();
         },


         move: function (e) {
             var that = e.data;
             if (!e.offsetX) {
                 e.offsetX = (e.pageX - $(e.target).offset().left);
                 e.offsetY = (e.pageY - $(e.target).offset().top);
             }
             that.zones[that.activeZone][that.activePoint].x = Math.round(e.offsetX);
             that.zones[that.activeZone][that.activePoint].y = Math.round(e.offsetY);

             that.drawZones();
         },

         stopdrag: function (e) {
             var that = e.data;
             $(that).unbind('mousemove');
             that.record();
             that.activePoint = null;
         },
         
         rightclick: function (e) {
             var that = e.data;
             e.preventDefault();
             if (!e.offsetX) {
                 e.offsetX = (e.pageX - $(e.target).offset().left);
                 e.offsetY = (e.pageY - $(e.target).offset().top);
             }
             var x = e.offsetX,
                 y = e.offsetY;
             for (var i = 0; i < that.zones[that.activeZone].length; i++) {
                 dis = Math.sqrt(Math.pow(x - that.zones[that.activeZone][i].x, 2) + Math.pow(y - that.zones[that.activeZone][i].y, 2));
                 if (dis < 6) {
                     that.zones[that.activeZone].splice(i, 1);
                     that.drawZones();
                     that.record();

                     return false;
                 }
             }
             return false;
         },

         mousedown: function (e) {
             var that = e.data;
             if (!that.zones[that.activeZone]) that.zones[that.activeZone] = [];
             var x, y, dis, lineDis, insertAt = that.zones[that.activeZone].length;

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

             for (var i = 0; i < that.zones[that.activeZone].length; i++) {
                 dis = Math.sqrt(Math.pow(x - that.zones[that.activeZone][i].x, 2) + Math.pow(y - that.zones[that.activeZone][i].y, 2));
                 if (dis < 6) {
                     that.activePoint = i;

                     $(this).bind('mousemove', that, that.move);
                     return false;
                 }
             }

             for (var i = 0; i < that.zones[that.activeZone].length; i++) {
                 if (i > 1) {
                     lineDis = dotLineLength(
                     x, y,
                     that.zones[that.activeZone][i].x, that.zones[that.activeZone][i].y,
                     that.zones[that.activeZone][i - 1].x, that.zones[that.activeZone][i - 1].y,
                     true);
                     if (lineDis < 6) {
                         insertAt = i;
                     }
                 }
             }
             that.zones[that.activeZone].splice(insertAt, 0, {
                 x: Math.round(x),
                 y: Math.round(y)
             });
             that.activePoint = insertAt;
             $(that).bind('mousemove', that, that.move);

             that.drawZones();
             that.record();

             return false;
         },


         record: function () {
             localStorage.setItem('zones', this.zones);
             socket.emit('area', this.zones);

         }

     };

     $.fn[pluginName] = function (options) {
         var args = arguments;

         if (options === undefined || typeof options === 'object') {
             return this.each(function () {

                 if (!$.data(this, 'plugin_' + pluginName)) {

                     $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
                 }
             });

         } else if (typeof options === 'string' && options[0] !== '_' && options !== 'init') {

             var returns;

             this.each(function () {
                 var instance = $.data(this, 'plugin_' + pluginName);

                 if (instance instanceof Plugin && typeof instance[options] === 'function') {
                     returns = instance[options].apply(instance, Array.prototype.slice.call(args, 1));
                 }

                 if (options === 'destroy') {
                     $.data(this, 'plugin_' + pluginName, null);
                 }
             });

             return returns !== undefined ? returns : this;
         }
     };

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

 })(jQuery, window, document);
