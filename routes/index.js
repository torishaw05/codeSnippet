const express = require('express');
const User    = require('../models/user');
const Clippet= require('../models/clippet');
const mongoose = require('mongoose');
const passport = require('passport');

const router = express.Router();


mongoose.connect('mongodb://localhost:27017/clippetUsers');

const getUsers= function(req, res, next) {
  User.find({}).sort('username')
  .then(function(users) {
    req.users=users;
    next();
  })
  .catch(function(err) {
    console.log(err);
    next();
  });
};

const getClippets= function(req, res, next) {
  Clippet.find({}).sort('title')
  .then(function(clippets){
    req.clippets=clippets;
    next();
})
  .catch(function(err){

});
};
const requireLogin = function (req, res, next) {
  if (req.user) {
    console.log(req.user)
    next()
      } else {
    res.redirect('/');
    }
};

const login= function(req, res, next){
  if (req.user) {
    res.redirect('/clippets')
    }else{
      next();
    }
};

router.get('/style.css', function(req,res) {
  res.redirect('/login');
})

router.get('/', function(req,res) {
  res.redirect('/login');
})

router.get('/login', login, function(req, res) {
  res.render('login', {
    messages: res.locals.getMessages()
  });
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/clippets',
  failureRedirect: '/',
  failureFlash: true
}));

router.get('/signup', function(req, res){
  res.render('signup');
});
router.post('/signup', function(req, res) {
  User.create({
    // firstname: req.body.firstname,
    // lastname: req.body.firstname,
    username: req.body.username,
    password: req.body.password,

  }).then(function(data) {
    console.log(data);
    res.redirect('/');
})
.catch(function(err) {
  console.log(err);
  res.redirect('/');
})

});

let temp;
router.get('/clippets', requireLogin, function(req, res){
  Clippet.find({})
  .then(function(data) {
    temp = data
  res.render('clippets', {clippet: data})
  })
  .catch(function(err) {
    res.redirect('/');
  });
});

router.get('/public/style.css', function(req, res) {
  if (temp) {
    res.render('clippets', {clippet: temp})
  } else {
    res.redirect('/clippets');
  }
})


router.get("/logout", function(req, res) {
  // req.session.destroy(); is good too
  req.session.destroy(function(err) {
    console.log(err);
  });
  res.redirect("/");
});
router.get('/create_clip', function(req, res){
  res.render('create_clip');
});


router.post('/create_clip', function(req, res) {
  console.log("creating");
  console.log(req.body);
  Clippet.create({
    username: req.user.username,
    title: req.body.title,
    clippetcode:req.body.clippetcode,
    language:req.body.language,
    notes: req.body.notes,
    tags: req.body.tags,

  }).then(function(data) {
    console.log(data, 'tori');
    res.redirect('/clippets');
})
.catch(function(err) {
  console.log});
});

router.get('/delete', getUsers, getClippets, function (req, res) {
  Clippet.deleteOne({id: req.clippet })
  .then(function(clippet){
    res.redirect('/profile');
  })
});
// let Clippet= [];

// router.get("/", function(req, res)

// function findDolls(req, res, next) {
//   Clippet.find({})
//     .then(function(data) {
//       results = data;
//       next()
//     })
//     .catch(function(err) {
//       console.log(err);
//     });
// };
// router.get("/", findDolls, function(req, res) {
// //   res.render("dolledit", {dolls: results});
// // });
// router.post("/clippets", function(req, res) {
//   Clippet.create ({
//     title: req.body.title,
//     clippetcode:req.body.clippetcode,
//     language:req.body.language,
//     notes: req.body.notes,
//     tags: req.body.tags,
//   })
//   .then(function(data)
// };



module.exports = router;

//
// router.get('/logout', function(req, res){
// req.logout();
// res.redirect('/login');
// });
//
// module.exports= router;
