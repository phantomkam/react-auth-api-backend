var mongoose    = require('mongoose')

var userModel = mongoose.Schema({
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password:  {
   	 	type: String,
   	 	required: 'Please provide the password'
  	},
  	confirm_password : {
  		type : String,
  		required : "Please provide the confirm password." ,
  		validate: [passwordConfirm, 'Password and confirm password ......']	
  	},
    username: {
    	type : String,
	 	 required: 'Please provide the username'
    },
    role: {
        type : String,
        enum: ['user', 'admin'],
        default: 'user'
    }
});

function validateEmail(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
};

function passwordConfirm(value) {
    // `this` is the mongoose document
    return this.password == value;
}

module.exports = new mongoose.model("User", userModel)