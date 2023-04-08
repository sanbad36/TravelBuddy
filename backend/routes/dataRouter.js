const express = require("express");
const router = express.Router();

const Data = require("../models/Data");

router.get("/all", async (req, res) => {
	Data.find({})
		.populate("ngoID")
		.populate("programID")
		.populate("userID")
		.exec((err, data) => {
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

router.get("/:dataid", (req, res) => {
	Data.findById(req.params.dataid)
		.populate("ngoID")
		.populate("programID")
		.populate("userID")
		.exec((err, data) => {
			if (err) {
				console.log(err);
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

router.post("/add", (req, res) => {
	const data = new Data({
		ngoID: req.body.ngoID,
		programID: req.body.programID,
		userID: req.body.userID,
		month: req.body.month,
		year: req.body.year,
		food: req.body.food,
		children: req.body.children,
		senior: req.body.senior,
		female: req.body.female,
		male: req.body.male,
		diffabled: req.body.diffabled,
		charitypartners: req.body.charitypartners,
		total: req.body.total,
	});
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

router.post("/:dataid", (req, res) => {
	const data = new Data({
		ngoID: req.body.ngoID,
		programID: req.body.programID,
		userID: req.body.userID,
		month: req.body.month,
		year: req.body.year,
		food: req.body.food,
		children: req.body.children,
		senior: req.body.senior,
		female: req.body.female,
		male: req.body.male,
		diffabled: req.body.diffabled,
		charitypartners: req.body.charitypartners,
		total: req.body.total,
	});
	Data.findByIdAndUpdate(req.params.dataid, data, (err, data) => {
		if (err) {
			res.status(400).send({
				message: err,
			});
		} else {
			res.status(200).send({
				message: "Data updated successfully",
			});
		}
	});
});

module.exports = router;
