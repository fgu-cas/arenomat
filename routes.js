var express = require('express');
var router = express.Router();
var mongoose = require('mongoose-paginate');

var Experiment = mongoose.model('Experiment');
var Frame = mongoose.model('Frame');

/* GET home page. */
router.get('/', function(req, res) {
  var fc;
  Frame.count({}, function(err, frameCount) {
    res.render('index', {camWidth: 640, camHeight: 480, frameCount: frameCount});
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

//experiments page show
router.get('/experiments/:name', function(req, res) {

});

//edit experiments
router.get('/experiments/:name/edit', function(req, res) {
  res.render("experiments/edit", {experiment: req.experiment});
});


//handle updates
router.post('/experiments/:name', function(req, res) {
  var b = req.body;
  Experiment.update(
    {name: req.params.name},
  {name: b.name, code: b.code, xml: b.xml},
  function(err) {
    res.redirect("/experiments/" + b.name);
  }
  );
});


router.get('/frames/:id', function(req, res) {
  var page = req.params.id || 1;
  Frame.paginate({}, page, 1, function(error, pageCount, data, itemCount) {
    if (error) {
      console.error(error);
    } else {
      if (data[0] && data[0].webcam) {
	data[0].webcam = new Buffer(data[0].webcam).toString('base64');
        res.json(data[0]);
      }
    }
  });
});


module.exports = router;
