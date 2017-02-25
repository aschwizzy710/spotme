// creates variable called mongoose which uses mongoose package
var mongoose = require('mongoose');
// gives us the tool (mongoose) to create a cookie cutter which will become the model
var Schema = mongoose.Schema;

// tells our cookie cutter the shape its going to cut in
var contractSchema = new Schema({
  apr: {
    type: Number,
    required: false
  },
  loanAmt: {
    type: Number,
    required: true
  },
  dueDate: {
    type: Date,
    required: true
  },
  isConfirmed: {
    type: Boolean,
    required: true
  }
});
// forms the actual cookie cutter which is our model, or 'Album' in this case
var Contract = mongoose.model('Contract', contractSchema);
// packages up our data and ships it our so its available in other files
module.exports = Contract;
