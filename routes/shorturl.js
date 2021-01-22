const express = require('express');
const router = express.Router();
require('dotenv').config();
const Url = require('../models/url');
const dns = require('dns');

// Get route for short url
router.get('/:id',(req,res)=>{
    Url.findOne({short_url:req.params.id},(err,data)=>{
        res.redirect(data.original_url);
    });
    console.log(req.params.id);
});

// POST route for URLs
router.post('/new',(req,res)=>{
    dns.lookup(req.body.longurl,(err)=>{
        if(err){
            res.json({ error: 'invalid url' });
        }else{
            Url.findOne({original_url:req.body.longurl},(err,url)=>{
                if(url){
                    res.json({
                        original_url:url.original_url,
                        short_url:url.short_url
                    });
                }else{
                    Url.find({},(err,data)=>{
                        const url = new Url;
                        url.original_url = req.body.longurl;
                        url.short_url = data.length + 1;
                        url.save((err,created_data)=>{
                            res.json({
                                original_url:created_data.original_url,
                                short_url:created_data.short_url
                            });
                        })
                    });
                }
            });
        }
    });
});

// POST route for URLs
router.post('/short',(req,res)=>{
    Url.findOne({short_url:req.body.shorturl},(err,data)=>{
        if(data){
            res.redirect(data.original_url);
        }else{
            res.json({
                msg:"Not Valid Short Url Number!"
            })
        }
    });
});
module.exports =  router;