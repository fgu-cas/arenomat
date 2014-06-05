var express = require('express')
  , router = express.Router()
  , mongoose = require('mongoose-paginate')

  , Experiment = mongoose.model('Experiment')
  , Frame = mongoose.model('Frame')

  , fs = require('fs')
  , partialsPath = __dirname + '/views/partials'
  , partials = {}
  , files = [];


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
  Experiment.find({}, function(err, docs) {
    res.render('experiments/index', {experiments: docs, layout: false});
  });
});

//this is going to be our create route
router.post('/experiments', function(req, res) {
  var b = req.body;
  new Experiment({
    name: b.name,
    code: b.code,
    xml: b.xml
  }).save(function(err, experiment) {
    if (err)
      res.json(err);
    res.redirect('/experiments/' + experiment.name);
  });
})

//get our params from documents
router.param('name', function(req, res, next, name) {
  //find the name that matches and shows the first one
  Experiment.find({name: name}, function(err, docs) {
    req.experiment = docs[0];
    next();
  });
});

//experiment load
router.get('/experiments/:name', function(req, res) {
  res.json(req.experiment);
});

//put experiments
router.get('/experiments/:name', function(req, res) {
  res.render("experiments/edit", {experiment: req.experiment});
});

router.delete('/experiments/:name', function(req, res) {
  console.log(req.params);
  return Experiment.findById(req.params.id, function(err, experiment) {
    console.log(err, experiment);
    experiment.remove();
    if (!err) {
      console.log("removed");
      return res.send('');
    } else {
      console.log(err);
    }
    res.redirect("/experiments/");
  });
});

//handle updates
router.post('/experiments/:name', function(req, res) {
  var b = req.body;
  return Experiment.findById(req.params.id, function(err, experiment) {
    Experiment.update(
      {name: req.params.name},
    {name: b.name, code: b.code, xml: b.xml},
    function(err) {
      res.redirect("/experiments/" + b.name);
    }
    );
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
  var sys = require('sys')
  var exec = require('child_process').exec;

  exec("v4l2-ctl -C  brightness,exposure_absolute,gain,contrast,focus_absolute", function(error, stdout, stderr) {
    res.json({status: stdout});
  });
});


router.get('/settings/:control/:value', function(req, res) {
  var sys = require('sys')
  var exec = require('child_process').exec;
  exec("v4l2-ctl -c " + req.params.control + "=" + req.params.value, function(error, stdout, stderr) {
    res.json({status: stdout});
  });
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

module.exports = router;
