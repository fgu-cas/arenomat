var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

//creating the schema for mongo
var ExperimentSchema = new mongoose.Schema({
	name: String,
	code: String,
	xml: String,
});

//Experiments will be used to do or  CRUD
var Experiments = mongoose.model('Experiments', ExperimentSchema);

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
	res.render("experiments/show", {experiment: req.experiment});
});

//edit experiments
router.get('/experiments/:name/edit', function(req, res) {
	res.render("experiments/edit", {experiment: req.experiment});
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
