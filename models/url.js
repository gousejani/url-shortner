const mongoose = require('mongoose');

// URL schema
let urlSchema = mongoose.Schema({
    original_url:{type:String, required:true},
    short_url:{type:Number, required:true}
})

let Url = module.exports = mongoose.model("Url", urlSchema);