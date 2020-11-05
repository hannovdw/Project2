const { request } = require('express');
const express = require('express');
const Meta = require('../models/metadata');
const router = express.Router();

//get a list of ninjas from db
router.get('/metadata', function(req,res,next){
    Meta.find().then(function(metadata){
        res.send(metadata);
    });
    
Meta.aggregate([{ $geoNear: { near: {type: 'Point', coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)]}, spherical: true, maxDistance: 100000, distanceField: "dist.calculated" } }]).then(function(results){ res.send(results); });});
//add a new ninja 
router.post('/metadata', function(req,res,next){
    Meta.create(req.body).then(function(meta){
        res.send(meta);
        }).catch(next);
        
});
//update ninja
router.put('/metadata/:id', function(req,res,next){
    Meta.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(meta){
        Meta.findOne({_id: req.params.id}).then(function(meta){
            res.send(meta);
        })
    });
});
//delete ninja
router.delete('/metadata/:id', function(req,res,next){
    Meta.findByIdAndRemove({_id: req.params.id}).then(function(meta){
        res.send(meta);
    });
});

module.exports = router;