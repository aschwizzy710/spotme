var express = require('express');
var router = express.Router();
var Contract = require('../models/contract.model.js');
// tool which allows the router to actually extract the data that it takes in
var bodyParser = require('body-parser');

router.use(bodyParser.json());
// opens up the 'package' of information in the url and formulates it so you can actually see what the server is sending to you
router.use(bodyParser.urlencoded({extended: true}));

// performing CRUD functions from the router
 // - use plural 'alerts' as it is assumed this will be a collection as there is implicitly more than one alert
router.get('/contracts', function(req, res){
  Contract.find({}, function(err, foundContracts){
    if(err){
      res.status(500).json({
        err: err
      });
    }
    res.status(200).json({
      contracts: foundContracts
    });
  });
});
router.get('/contracts/:id', function(req, res){
  Contract.find({_id: req.params.id}, function(err, foundContract){
    if(err){
      res.status(500).json({
        err: err
      });
    }
    res.status(200).json({
      contract: foundContract
    });
  });
});
router.post('/contracts', function(req, res){
  console.log(req.body);
  var contract = new Contract(req.body);
  Contract.save(function(err){
    if(err){
      res.status(500).json({
        err: err
      });
    }
    res.status(201).json({
      msg: 'Successfully created contract'
    });
  });
});
router.put('/contracts/:id', function(req, res){
  Contract.findOneAndUpdate({_id: req.params.id}, req.body, function(err, oldContract){
    if(err){
      res.status(500).json({
        err: err
      });
    }
    res.status(200).json({
      msg: oldContract
    });
  });
});
router.delete('/contracts/:id', function(req, res){
  Contract.findOneAndRemove({_id: req.params.id}, function(err, deletedContract){
    if(err){
      res.status(500).json({
        err: err
      });
    }
    res.status(200).json({
      msg: deletedContract
    });
  });
});

module.exports = router;
