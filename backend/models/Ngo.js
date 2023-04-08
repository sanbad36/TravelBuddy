var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ngoSchema = new Schema(
	{
		name: mongoose.Schema.Types.String,
		joindate: Date,
		contact: mongoose.Schema.Types.Number,
		location: mongoose.Schema.Types.String,
	},
	{
		timestamps: true,
	}
);

var Ngo = mongoose.model("ngos", ngoSchema);
module.exports = Ngo;
