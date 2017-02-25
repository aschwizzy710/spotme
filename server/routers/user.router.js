var express = require('express');
var router = express.Router();
var User = require('../models/user.model.js');
// tool which allows the router to actually extract the data that it takes in
var bodyParser = require('body-parser');

router.use(bodyParser.json());
// opens up the 'package' of information in the url and formulates it so you can actually see what the server is sending to you
router.use(bodyParser.urlencoded({extended: true}));

// performing CRUD functions from the router
 // - use plural 'alerts' as it is assumed this will be a collection as there is implicitly more than one alert
router.get('/users', function(req, res){
  User.find({}, function(err, foundUsers){
    if(err){
      res.status(500).json({
        err: err
      });
    }
    res.status(200).json({
      users: foundUsers
    });
  });
});
router.get('/users/:id', function(req, res){
  User.find({_id: req.params.id}, function(err, foundUser){
    if(err){
      res.status(500).json({
        err: err
      });
    }
    res.status(200).json({
      user: foundUser
    });
  });
});
router.post('/users', function(req, res){
  console.log(req.body);
  var user = new User(req.body);
  user.save(function(err){
    if(err){
      res.status(500).json({
        err: err
      });
    }
    res.status(201).json({
      msg: 'Successfully created user'
    });
  });
});
router.put('/users/:id', function(req, res){
  User.findOneAndUpdate({_id: req.params.id}, req.body, function(err, oldUser){
    if(err){
      res.status(500).json({
        err: err
      });
    }
    res.status(200).json({
      msg: oldUser
    });
  });
});
router.delete('/users/:id', function(req, res){
  User.findOneAndRemove({_id: req.params.id}, function(err, deletedUser){
    if(err){
      res.status(500).json({
        err: err
      });
    }
    res.status(200).json({
      msg: deletedUser
    });
  });
});

module.exports = router;
