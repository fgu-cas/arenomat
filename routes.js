var express = require('express')
  , router = express.Router()
  , mongoose = require('mongoose')
  , moment = require('moment')
  , Hogan = require('hogan')

  , Analyze = require('./lib/analyze.js')

  , Experiment = mongoose.model('Experiment')
  , Frame = mongoose.model('Frame')
  , Session = mongoose.model('Session')
  

  , fs = require('fs')
  , partialsPath = __dirname + '/views/partials'
  , partials = {}
  , files = []
  , sys = require('sys')
  , exec = require('child_process').exec
  , async = require('async');


var camelize = function (string) {
    return string.replace (/(?:^|[-_])(\w)/g, function (_, c) {
      return c ? c.toUpperCase () : '';
    })
  }

// get partials
fs.readdirSync(partialsPath).forEach(function(file) {
  var filename = file.replace(/\..+$/, ''); // strip extension
  partials[camelize(filename)] = 'partials/' + filename;
});

/* GET home page. */
router.get('/', function(req, res) {
  var fc;
  Frame.count({}, function(err, frameCount) {
    res.render('index', {
      partials: partials,
      halfCamWidth: camWidth / 2,
      halfCamHeight: camHeight / 2,
      camWidth: camWidth,
      camHeight: camHeight,
      frameCount: frameCount
    });
  });
});

function analyzeSession(id, callback) {
console.log('session id: ' + id);
    Frame.find({session: id }).stream().on('data', function ( doc) {
//	console.log('.');
	Analyze.add(doc, id);
    })
    .on('end', function () {
	var result = Analyze.result(id);
//	console.log(result);
	callback(null, result.join(';'));
    });


}


router.get('/export/:id', function(req, res) {
    var id = req.params.id;

    console.log('session id: ' + id);
    var out = [ 'time', 'x', 'y','shock', 'zones' ].join(';') + '\r\n';

    Frame.find({session: id }).stream().on('data', function (frame) {
	if (frame.cv[0] && frame.cv[0].position) {
//console.log(frame.cv[0].zones);
	zones = Object.keys(frame.cv[0].zones).map(function(_) { return frame.cv[0].zones[_]; })
	    data = [ frame.elapsedTime, frame.cv[0].position.x, frame.cv[0].position.x, frame.shocked, zones.join(';') ];
	    out += data.join(';') + '\r\n';
	}
    })
    .on('end', function () {
	res.send(out);
    });


});


router.get('/analyze/:id', function(req, res) {

    Analyze.setParameters(req.query);

res.connection.setTimeout(0); // this could take a while

    var out = '';
    var ids = req.params.id.split(',')
    console.log('find sessions: ', ids);

    out += Analyze.names().join(';') + "\r\n";

console.log('header ' + out);

  Session.findById(ids[0], function(err, docs) {
    console.log(docs);



    async.map(ids, analyzeSession, function (e, r) {
        out +=  r.join("\r\n");
    console.log(out);
    res.setHeader('Content-disposition', 'attachment; filename=' + docs.name + '.csv');
    res.type('text/csv');
	res.send(out);
    });
  });


});

router.get('/analyze', function(req, res) {
console.log('analyze');
Session.aggregate([{ 
    $group : { _id : "$name", sessions: { $push: { id: "$_id", date: "$createdAt", day: "$day", subject: "$subject", person: "$person", analyze: "$analyze" } } },
}], function(err, docs) {
    var info = Analyze.parameters();
    res.render('analyze', {experiments: docs, analysis: info, layout: 'layout_analyze',
	czdate: function() {
	    return function(text) {
    		var date = moment(new Date(Hogan.compile(text).render(this)));
    		return date.format("YY/MM/DD HH:mm");
	    }
	}
    });

  });
});


// route to show all our experiments
router.get("/experiments", function(req, res) {
  Experiment.find({}).sort({name: 1}).exec(function(err,docs){
    res.render('experiments/index', {experiments: docs, layout: false});
  });
});




//handle updates and create
router.post('/experiments/:name', function(req, res) {
  var b = req.body;
    Experiment.update(
	{name: b.name},
	{name: b.name, code: b.code, xml: b.xml, zones: b.zones},
	{upsert: true},
	function(err) {
//    	    res.redirect("/experiments/" + b.name);
	}
    );
    res.json({ ok: true });
});

//get our params from documents
router.param('name', function(req, res, next, name) {
  //find the name that matches and shows the first one
  Experiment.find({name: name}, function(err, docs) {
console.log('param: ', docs[0]);
    req.experiment = docs[0];
    next();
  });
});

//experiment load
router.get('/experiments/:id', function(req, res) {
console.log('router: get experiment:', req.params.id);
  Experiment.findById(req.params.id, function(err, docs) {
    console.log(docs);
    res.json(docs);
  });
});

//export session

router.get('/sessions/export/:id', function(req, res) {
console.log('export sessions: ', req.params.id.split(','));
  var ids = req.params.id.split(',').map(function (x) {
    return mongoose.Types.ObjectId(x);
  });
  Frame.find({session : ids[0] }, function(err, docs) {
        res.json(docs);
  });
});

router.delete('/sessions/:id', function(req, res) {
console.log('selete sessions: ', req.params.id.split(','));
  var ids = req.params.id.split(',').map(function (x) {
    return mongoose.Types.ObjectId(x);
  });
  Session.remove({_id : { $in: ids }}, function(err) {
   console.log('db: removed session', err);
  });
  Frame.remove({session : { $in: ids }}, function(err) {
   console.log('db: removed session frames', err);
  });
  res.json('OK'); 
});

// heatmap of the session
router.get('/sessions/heatmap/:id', function(req, res) {
console.log('heatmap sessions: ', req.params.id.split(','));
res.connection.setTimeout(0); // this could take a while

if (fs.existsSync(__dirname + '/public/img/heatmap/' + req.params.id)) {
console.log('cached', req.params.id);
  var rstream = fs.createReadStream(__dirname + '/public/img/heatmap/' + req.params.id);
  rstream.pipe(res);
} else {
//  Frame.collection.find({ session: mongoose.Types.ObjectId(req.params.id) }).forEach(function (docs) {
//  Frame.find({session: req.params.id }, function(err, docs) {

var heatmap = require('heatmap-fix');
var heat = heatmap(camHeight, camHeight, { radius : 10 });
var ctx = heat.canvas.getContext('2d');

Frame.find({session: req.params.id }).stream().on('data', function ( doc) {

//for (var i = 0; i < docs.length; i++) {
    if (doc.tracked) {
	heat.addPoint(doc.cv[0].position.x, doc.cv[0].position.y);
    }
//}

})
.on('end', function() {

heat.draw();


      // mask
      ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
      ctx.beginPath();
      ctx.arc(ctx.canvas.width / 2, ctx.canvas.height / 2, ctx.canvas.height / 2, 0, 2 * Math.PI);
      ctx.rect(ctx.canvas.width, 0, -ctx.canvas.width, ctx.canvas.height);
      ctx.fill();



  heat.canvas.toBuffer(function(err, buf) {
fs.writeFile(__dirname + "/public/img/heatmap/" + req.params.id + ".png", buf, function(err) {
    if(err) {
        console.log(err);
    } else {
        console.log("The file was saved!");
    }
}); 

    res.writeHead(200, {'Content-Type': 'image/png', 'Content-Length': buf.length});
    res.end(buf);
  });

//    res.render("sessions/export", {sessions: docs});
  });
 }
});


router.get('/heatmap/:id', function(req, res){
console.log(req.params.id.split('.')[0]);
    var fileName = 'public/img/heatmap/' + req.params.id;
    fs.exists(fileName, function(exists){
        if (exists) {
            res.sendfile(fileName);
        }else{
            res.redirect('/sessions/heatmap/' + req.params.id.split('.')[0]);
        }
    });
});

router.delete('/experiments/:id', function(req, res) {
  return Experiment.findById(req.params.id, function(err, experiment) {
   console.log('db: remove ', experiment);
    experiment.remove();
    if (!err) {
      return res.send('');
    } else {
      console.log(err);
    }
    res.redirect("/experiments/");
  });
});



router.get('/frames/:id', function(req, res) {
  var page = req.params.id || 1;
  Frame.paginate({}, page, 1, function(error, pageCount, data, itemCount) {
    if (error) {
      console.error(error);
    } else {
      if (data[0] && data[0].webcam) {
        //data[0].webcam = new Buffer(data[0].webcam).toString('base64');
        res.json(data[0]);
      }
    }
  });
});

router.get('/soundfiles', function(req, res) {
  var modelsPath = __dirname + '/sounds';
  var files = [];
  fs.readdirSync(modelsPath).forEach(function(file) {
    files.push([file, file]);
  });
  res.json(files);
});

router.get('/settings', function(req, res) {
  exec("v4l2-ctl -C  brightness,exposure_absolute,gain,contrast,focus_absolute,sharpness,saturation", function(error, stdout, stderr) {
    res.json({status: stdout, settings: settings});
  });
});

router.get('/analysis_settings', function(req, res) {
});


router.get('/settings/:control/:value', function(req, res) {
  if (req.params.control.substring(0, 9) == 'settings_') {
    settings[req.params.control.substring(9)] = req.params.value;
    res.json({});
  }
  else {

    exec("v4l2-ctl -c " + req.params.control + "=" + req.params.value, function(error, stdout, stderr) {
      res.json({});
    });
  }
});

router.get('/projector', function(req, res) {

  var Canvas = require('canvas')
    , canvas = new Canvas(camHeight, camHeight)
    , ctx = canvas.getContext('2d');



  this.zones = zones;

  ctx.fillStyle = "rgba(0, 0, 0, 1)";
  ctx.rect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.fill();

  // mask
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
  ctx.beginPath();
  ctx.arc(ctx.canvas.width / 2, ctx.canvas.height / 2, ctx.canvas.height / 2, 0, 2 * Math.PI);
  ctx.stroke();



  for (var n = 0; n < this.zones.length; n++) {
    var points = this.zones[n];
    if (points.length < 1) {
      return false;
    }

    ctx.fillStyle = 'rgb(255, 255, 255)';
    ctx.strokeStyle = 'rgb(255, 255, 255)';
    ctx.lineWidth = 1;

    ctx.beginPath();

    ctx.moveTo(points[0].x, points[0].y);
    var width = 10;
    for (var i = 0; i < points.length; i++) {
      if (points.length > 1 && i > 0) {
        ctx.lineTo(points[i].x, points[i].y);
      }
    }

    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }

  canvas.toBuffer(function(err, buf) {
    res.writeHead(200, {'Content-Type': 'image/png', 'Content-Length': buf.length});
    res.end(buf);
  });
});


// route to show all our sessions
router.get("/sessions", function(req, res) {



Session.aggregate([{ 
    $group : { _id : "$name", sessions: { $push: { id: "$_id", date: "$createdAt", day: "$day", subject: "$subject", person: "$person" } } },
//    $group : { _id: "$sessions.createdAt", sessions: { $push: "$sessions.createdAt" }}
}], function(err, docs) {
    res.render('sessions/index', {experiments: docs, layout: false, 
	czdate: function() {
	    return function(text) {
    		var date = moment(new Date(Hogan.compile(text).render(this)));
    		return date.format("YY/MM/DD HH:mm");
	    }
	}
    });

  });
});

module.exports = router;
