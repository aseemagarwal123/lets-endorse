const config = require('config');
const _ = require('lodash');

const {User, validate} = require('../model/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();


router.get('/', function(req, res, next) {
  res.send('respond with a resource');
})

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  
  if (error) return res.status(500).send(error.details[0].message);

    console.log(req.body);
  let user = await User.findOne({ Aadhar: req.body.Aadhar });
  console.log(user);
  if (user) return res.status(400).send('User already registered.');

  
  user = new User(_.pick(req.body, ['Name','Aadhar','Email','Mobile','Alternate_Mobile',
  'Address_Line_1','Address_Line_2','City','District','State','Country','Longitude',
  'Latitude','DOB','Gender','Source','Source_Type','Employment_Status','Occupation',
  'Current_Income','Qualification','Successful_Enterprises','Unsuccessful_Enterprises',
  'Bank_Account','Credit_History','Assets','Need_Training','Status','Verified']));
  await user.save();
  res.send(user)
  

});

router.put('/:updateID/:value', async(req, res) => { 
  updateID = req.params.updateID
  let event={}
  event[updateID]=req.params.value;
  console.log(event)
  let user = await User.findOneAndUpdate({Aadhar:req.body.Aadhar},{ "$set": event }, { "upsert": true, "new": true})
  console.log(user)
  res.status(200).send(user)
})

router.get('/:filterID/:value', async(req,res)=>{
  let event={}
  filterID = req.params.filterID
  event[filterID]=req.params.value;
  let users = await User.find(event);
  console.log(users)
  res.status(200).send(users)
})
router.get('/all' , async(req,res)=>{
  let users = await User.find();
  res.status(200).send(users)
})
router.delete('/' , async(req,res)=>{
  let users = await User.findOneAndDelete({Aadhar:req.body.Aadhar});
  res.status(200).send(users)
})
router.get('/:SortID', async(req,res)=>{
  let event={}
  SortID = req.params.SortID;
  event[SortID]=1;
  const user = User.find({}, null, {sort: event}, function (err, users) {
    if (err) {
        console.log(err);
        res.status(400).send(err);
    }
    console.log(users);
    res.status(200).send(users);
});
  // res.status(200).send(user);
})

module.exports = router;
