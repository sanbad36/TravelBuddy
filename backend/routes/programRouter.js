/**
 * @swagger
 * tags:
 *   name: Program
 *   description: Program API
 * /program/add:
 *    post:
 *      summary: Adding a new program.
 *      tags: [Program]
 *      requestBody:
 *              description: Added New Program.
 *              required: true
 *              content:
 *                application/json:
 *                    schema:
 *                      $ref: '#/components/schemas/Book'
 *      responses:
 *        200:
 *          description: The New Program is added successfully.
 *          content:
 *            application/json:
 *              schema:
 *                type: string
 *                items:
 *                  $ref: '#/components/schemas/Book'
 * /program/all:
 *    get:
 *     summary: Fetching All Programs.
 *     tags: [Program]
 *     responses:
 *       200:
 *         description: All the programs fetched successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 * 
 */

const express = require("express");
const router = express.Router();

const Program = require("../models/Program");

router.post("/add", (req, res) => {
	const data = new Program(req.body);
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
	Program.find({}).exec((err, data) => {
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

module.exports = router;
