var express = require('express');
var router = express.Router();
var mongoose = require('mongoose-paginate');

//creating the schema for mongo
var ExperimentSchema = new mongoose.Schema({
  name: String,
  code: String,
  xml: String,
});

//Experiments will be used to do or  CRUD
var Experiments = mongoose.model('Experiments', ExperimentSchema);

//creating the schema for mongo
var FrameSchema = new mongoose.Schema({
  session_id: String,
  tracked: Boolean,
  cv: {},
  output: {},
  webcam: Buffer,
  date: {type: Date, default: Date.now}
});

//Frames
var Frames = mongoose.model('Frames', FrameSchema);

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', {camWidth: 640, camHeight: 480});
});

// route to show all our experiments
router.get("/experiments", function(req, res) {
  Experiments.find({}, function(err, docs) {
    res.render('experiments/index', {experiments: docs});
  });
});

//this is going to be our create route
router.post('/experiments', function(req, res) {
  var b = req.body;
  new Experiments({
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
  Experiments.find({name: name}, function(err, docs) {
    req.experiment = docs[0];
    next();
  });
});

//experiments page show
router.get('/experiments/:name', function(req, res) {

  Frames.count({}, function(err, frameCount) {
    res.render("experiments/view", {experiment: req.experiment, frameCount: frameCount});
  });
});

//edit experiments
router.get('/experiments/:name/edit', function(req, res) {
  res.render("experiments/edit", {experiment: req.experiment});
});

router.get('/frames/info/:id', function(req, res) {
//    Frames.find({}).skip(req.params.id).limit(1).select('cv').exec(function (error, data) {
  var page = req.params.id || 1;
  Frames.paginate({}, page, 1, function(error, pageCount, data, itemCount) {
    if (error) {
      console.error(error);
    } else {
      if (data[0] && data[0].webcam) {
        res.json({
          webcam: (new Buffer(data[0].webcam).toString('base64')),
          cv: data[0].cv
        });
      }
    }
  });
});

//handle updates
router.post('/experiments/:name', function(req, res) {
  var b = req.body;
  Experiments.update(
    {name: req.params.name},
  {name: b.name, code: b.code, xml: b.xml},
  function(err) {
    res.redirect("/experiments/" + b.name);
  }
  );
});



module.exports = router;
