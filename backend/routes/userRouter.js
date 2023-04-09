/**
 * @swagger
 * tags:
 *   name: User
 *   description: User API
 * /user/add:
 *    post:
 *      summary: Adding a new user.
 *      tags: [User]
 *      requestBody:
 *              description: Added New user.
 *              required: true
 *              content:
 *                application/json:
 *                    schema:
 *                      $ref: '#/components/schemas/Book'
 *      responses:
 *        200:
 *          description: The New User is added successfully.
 *          content:
 *            application/json:
 *              schema:
 *                type: string
 *                items:
 *                  $ref: '#/components/schemas/Book'
 * /user/all:
 *    get:
 *     summary: Fetching All Users.
 *     tags: [User]
 *     responses:
 *       200:
 *         description: All the users are fetched successfully.
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
