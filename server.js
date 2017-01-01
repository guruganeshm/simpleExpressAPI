var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var User = require('./app/models/users');


// configured bodyparser()
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// setting up port to listen
var port = process.env.PORT || 8080;

// connection to DB
mongoose.connect('mongodb://localhost:27017/testDB');

// API Routes
var router = express.Router();

//Router Prefix with custom name /api
app.use('/api', router);


// middleware 
router.use(function(req, res, next){
	console.log('hitting middleware');
	next();
});



// test Route
router.get('/', function(req, res){
	res.json({
		message :'Hello Api world'
	});
});


router.route('/users')

	.post(function(req,res){
		var user = new User();     
		user.firstName = req.body.firstName;
		user.lastName = req.body.lastName;
		user.email = req.body.email;
		user.createdAt = Date.now(); 

		user.save (function(err) {
			if (err){
				res.send(err);
			} 
			res.json({ message: 'user saved successfully'});
		})  
	})

	.get(function(req, res){
		User.find(function(err, users){
			if (err){
				res.send(err);
			}
			res.json(users);
		});
	});

router.route('/user/:user_id')

	.get(function(req, res){
		User.findById(req.params.user_id, function(err, user){
			if (err) {
				res.send(err);
			}
			res.json(user);
		});
	});


// firing up server
app.listen(port);

// confirming the server started
console.log('fired up on port ' + port); 

