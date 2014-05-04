var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

////mongoose
//mongoose.connect("mongodb://localhost/crud");

//creating the schema for mongo
var ExperimentSchema = new mongoose.Schema({
        title: String,
        name: String,
        date: String,
        content: String,
        replies: String,
        views: String,
        message: String,
        messagedate: String
    }),
//Experiments will be used to do or  CRUD
    Experiments = mongoose.model('Experiments', ExperimentSchema);

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

// route to show all our experiments
router.get("/experiments", function(req,res){
    Experiments.find({}, function(err, docs){
        res.render('experiments/index', { experiments: docs });
    });
});


//form page for new experiments
router.get("/experiments/new", function(req,res) {
    res.render('experiments/new');
});

router.get("/experiments/reply", function(req,res) {
    res.render('experiments/reply');
});

//this is going to be our create route
router.post('/experiments', function(req,res){
    var b = req.body;
    new Experiments({
        title: b.title,
        name: b.name,
        date: b.date,
        replies: b.replies,
        content: b.content,
        views: b.views,
        message: b.message,
        messagedate: b.messagedate
    }).save(function (err, experiment){
            if(err) res.json(err);
            res.redirect('/experiments/' + experiment.name);
        });
})

//get our params from documents
router.param('name', function(req, res, next, name){
    //find the name that matches and shows the first one
    Experiments.find({ name: name }, function(err, docs){
        req.experiment = docs[0];
        next();
    });
});

//experiments page show
router.get('/experiments/:name', function(req, res){
    res.render("experiments/show", { experiment: req.experiment});
});

//edit experiments
router.get('/experiments/:name/edit', function(req, res){
    res.render("experiments/edit", { experiment: req.experiment });
});

//handle updates
router.post('/experiments/:name', function(req, res){
    var b = req.body;
    Experiments.update(
        { name: req.params.name },
        { title: b.title, name: b.name, date: b.date, content: b.content, replies: b.replies, views: b.views, message: b.message, messagedate: b.messagedate},
        function(err){
            res.redirect("/experiments/" + b.name);
        }
    );
});



module.exports = router;
