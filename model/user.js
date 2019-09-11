const Joi = require('joi');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
//const config=require('config');
const _ = require('lodash');
const userSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 50
  },
  Aadhar: {
    type: String,
    required: true,
    minlength: 12,
    maxlength: 12,
    unique: true
  },
  Email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024

  },
  Mobile: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  Alternate_Mobile: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  Address_Line_1: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 100
  },
  Address_Line_2: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 100
  },
  City: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 50
  },
  District: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 50
  },
  State: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 50
  },
  Country: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 50
  },
  Longitude: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 50
  },
  Latitude: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 50
  },
  DOB: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 10
  },
  Gender: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 10
  },
  Source: {
    type: String,
    required: true,
    enum: ['Event', 'Roadshow', 'Referral', ' Word of mouth', 'Press'],
  },
  Source_Type: {
    type: String,
    required: true,
    enum: ['Inbound', 'Outbound']
  },
  Employment_Status: {
    type: String,
    required: true,
    enum: ['Unemployed', 'Employed']
  },
  Occupation: {
    type: String,
    required: true,
    enum: ['Farmer', 'Mason', 'Poultry Farmer', 'Shopkeeper', 'Mechanic', 'Teacher', 'Housewife']
  },
  Current_Income: {
    type: String,
    required: true,
    enum: ['<2', '2-5', '5-10', '10-20', '>20']
  },
  Qualification: {
    type: String,
    required: true,
    enum: ['None', '5th pass', '8th pass', '10th pass', '12th pass', 'Diploma', 'Graduate', 'Post Graduate']
  },
  Successful_Enterprises: {
    type: Number,
    required: true
  },
  Unsuccessful_Enterprises: {
    type: Number,
    required: true
  },
  Bank_Account: {
    type: Boolean,
    required: true
  },
  Credit_History: {
    type: Boolean,
    required: true
  },
  Assets: {
    type: [String],
    required: true
  },
  Need_Training: {
    type: Boolean,
    required: true
  },
  Status: {
    type: String,
    required: true,
    enum: ['Intrested in exploring', 'Undergoing Training', 'Training Complete',
      'Stream Identified', 'Resume Made', 'Resume Submitted',
      'Resume sent for processing', 'Resume declined', 'Resume accepted',
      'Due diligence', 'Background check', 'Job offer received',
      'No longer interested', 'Deceased']
  },
  Verified: {
    type: Boolean,
    default: false,
    required: true
  },

});
const User = mongoose.model('User', userSchema);

function ValidateUser(User) {
  const schema = {
    Name: Joi.string().min(1).max(50).required(),
    Aadhar: Joi.string().min(1).max(1024).required(),
    Email: Joi.string().min(5).max(255).required().email(),
    Gender: Joi.string().min(1).max(10).required(),
    DOB: Joi.string().max(10).required(),
    Mobile: Joi.number().min(10).required(),
    Alternate_Mobile: Joi.number().min(10).required(),
    Address_Line_1: Joi.string().min(1).max(100).required(),
    Address_Line_2: Joi.string().min(1).max(100).required(),
    City: Joi.string().min(1).max(50).required(),
    District: Joi.string().min(1).max(50).required(),
    State: Joi.string().min(1).max(50).required(),
    Country: Joi.string().min(1).max(50).required(),
    Latitude: Joi.string().min(1).max(50).required(),
    Longitude: Joi.string().min(1).max(50).required(),
  };
  const user = _.pick(User, ['Name','Aadhar','Email','Mobile','Alternate_Mobile',
  'Address_Line_1','Address_Line_2','City','District','State','Country','Longitude',
  'Latitude','DOB','Gender']);
  return Joi.validate(user, schema);
}

exports.User =User;
exports.validate = ValidateUser;
exports.userSchema = userSchema;




