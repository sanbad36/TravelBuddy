const express = require("express");
const router = express.Router();

const User = require("../models/User");

router.post("/add", (req, res) => {
	const data = new User(req.body);
	console.log(req.body);
	data.save((err, data) => {
		if (err) {
			res.status(400).send({
				message: err,
			});
		} else {
			res.status(200).send({
				message: "Data added successfully",
			});
		}
	});
});

router.get("/all", (req, res) => {
	User.find({}).exec((err, data) => {
		if (err) {
			res.status(400).send({
				message: err,
			});
		} else {
			res.status(200).send({
				message: "Success",
				data: data,
			});
		}
	});
});
// router.get("/all", async (req, res) => {
// 	data = await User.find();
// 	console.log(data);
// 	res.send(data);
// });

module.exports = router;
