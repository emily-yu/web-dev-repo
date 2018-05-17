var express = require('express');
var path = require('path')
var router = express.Router();
var User = require('../models/User.js');


// GET route for reading data
router.get('/', function (req, res, next) {
  return res.render(path.join(__dirname, '../views/index.hbs'));
});


//POST route for updating data
router.post('/', function (req, res, next) {
  // confirm that user typed same password twice
  if (req.body.password !== req.body.passwordConf) {
    var err = new Error('Passwords do not match.');
    err.status = 400;
    res.send("passwords dont match");
    return next(err);
  }

  if (req.body.email &&
    req.body.username &&
    req.body.password &&
    req.body.passwordConf) {

    var userData = {
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      passwordConf: req.body.passwordConf,
    }

    User.create(userData, function (error, user) {
      if (error) {
        return next(error);
      } else {
        req.session.userId = user._id;
        return res.redirect('/profile');
      }
    });

  } else if (req.body.logemail && req.body.logpassword) {
    User.authenticate(req.body.logemail, req.body.logpassword, function (error, user) {
      if (error || !user) {
        var err = new Error('Wrong email or password.');
        err.status = 401;
        return next(err);
      } else {
        req.session.userId = user._id;
        return res.redirect('/profile');
      }
    });
  } else {
    var err = new Error('All fields required.');
    err.status = 400;
    return next(err);
  }
})

// GET route after registering
router.get('/profile', function (req, res, next) {
  User.findById(req.session.userId)
    .exec(function (error, user) {
      if (error) {
        return next(error);
      } else {
        if (user === null) {
          var err = new Error('Not authorized! Go back!');
          err.status = 400;
          return next(err);
        } else {
          // return res.send('<h1>Name: </h1>' + user.username + '<h2>Mail: </h2>' + user.email + '<br><a type="button" href="/logout">Logout</a>')
          return res.render(path.join(__dirname, '../views/home.hbs'), {
            username: user.username,
            email: user.email,
            equipment: user.equipment
          })
        }
      }
    });
});

// GET for logout logout
router.get('/logout', function (req, res, next) {
  if (req.session) {
    // delete session object
    req.session.destroy(function (err) {
      if (err) {
        return next(err);
      } else {
        return res.redirect('/');
      }
    });
  }
});

router.post('/addItem/:username', (req, res) => {
  User.findOneAndUpdate({username: req.params.username}, { 
      "$push": { 
        "equipment": {
          itemName: req.body.itemName,
          isOut: false
        }
      } 
    },
    {
      "new": true,
      "upsert": true
    },
    function (err, managerparent) {
        if (err) throw err;
        console.log(managerparent);
    }
  );
})

router.get('/items/:omit', (req, res) => {
  // false means no omit
  if (req.params.omit !== 'false') {
    User.find( { username: { $ne: req.params.omit } } )
    .then(data => {
      let res_data = []
      for (user of data) {
        res_data = res_data.concat(user.equipment)
      }
      res.send({res_data})
    }, e => {
      res.status(404).send(e)
    })
  }
  else {
    User.find()
    .then(data => {
      let res_data = []
      for (user of data) {
        res_data = res_data.concat(user.equipment)
      }
      res.send({res_data})
    }, e => {
      res.status(404).send(e)
    })
  }
})

router.get('/checkout/:id/:value', (req, res) => {
  User.findOneAndUpdate({
    equipment: {
      $elemMatch: {
        _id: req.params.id
      }
    }
  }, {$set: {
    'equipment.$.isOut': req.params.value
  }}, function (err, place) {
    res.redirect('/profile')
  });
})

module.exports = router;