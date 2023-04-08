var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema(
	{
		name: mongoose.Schema.Types.String,
		password: mongoose.Schema.Types.String,
		username: mongoose.Schema.Types.String,
		designation: mongoose.Schema.Types.String,
		isAdmin: mongoose.Schema.Types.Boolean,
	},
	{
		timestamps: true,
	}
);

var User = mongoose.model("users", userSchema);
module.exports = User;
