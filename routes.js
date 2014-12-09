var express = require('express')
  , router = express.Router()
  , mongoose = require('mongoose-paginate')
  , moment = require('moment')
  , Hogan = require('hogan')

  , Experiment = mongoose.model('Experiment')
  , Frame = mongoose.model('Frame')
  , Session = mongoose.model('Session')

  , fs = require('fs')
  , partialsPath = __dirname + '/views/partials'
  , partials = {}
  , files = []
  , sys = require('sys')
  , exec = require('child_process').exec;


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
  return Session.findById(ids, function(err, data) {
   console.log('db: remove session', data);
    data.remove();
    if (!err) {
      return res.send('');
    } else {
      console.log(err);
    }
    res.redirect("/");
  });
});

// heatmap of the session
router.get('/sessions/heatmap/:id', function(req, res) {
console.log('heatmap sessions: ', req.params.id.split(','));
  Frame.find({session: { $in: req.params.id.split(',') }}, function(err, docs) {

var heatmap = require('heatmap');
var heat = heatmap(camHeight, camHeight, { radius : 10 });
var ctx = heat.canvas.getContext('2d');


for (var i = 0; i < docs.length; i++) {
    if (docs[i].tracked) {
	heat.addPoint(docs[i].cv[0].position.x, docs[i].cv[0].position.y);
    }
}
heat.draw();


      // mask
      ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
      ctx.beginPath();
      ctx.arc(ctx.canvas.width / 2, ctx.canvas.height / 2, ctx.canvas.height / 2, 0, 2 * Math.PI);
      ctx.rect(ctx.canvas.width, 0, -ctx.canvas.width, ctx.canvas.height);
      ctx.fill();



  heat.canvas.toBuffer(function(err, buf) {
    res.writeHead(200, {'Content-Type': 'image/png', 'Content-Length': buf.length});
    res.end(buf);
  });

//    res.render("sessions/export", {sessions: docs});
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
