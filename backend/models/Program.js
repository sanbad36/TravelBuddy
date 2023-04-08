var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var programSchema = new Schema(
  {
    name: {
      type: String,
      enum: ["Place1", "foodrescue", "breakfastfeeding", "foodrelief"],
      default: "Place1",
    },
  },
  {
    timestamps: true,
  }
);

var Program = mongoose.model("programs", programSchema);
module.exports = Program;
