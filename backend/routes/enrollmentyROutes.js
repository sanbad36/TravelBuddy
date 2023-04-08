/**
 * @swagger
 * tags:
 *   name: Enrollment
 *   description: Enrollments API
 * /enrollment/assign:
 *  get:
 *     summary: Assigning New Enrollments
 *     tags: [Enrollment]
 *     responses:
 *       200:
 *         description: Assigning New Enrollments
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

const Enrollments = require("../models/Enrollments");

router.get("/assign", async (req, res) => {
  const {
    organisationName,
    enrolledProgram,
    representerName,
    representerDesignation,
    registeredID,
    month,
    food,
    under,
    over,
    females,
    total,
    location,
    partnerOrganisation,
  } = req.body;
  inDriverDatabase = new Enrollments({
    organisationName,
    enrolledProgram,
    representerName,
    representerDesignation,
    registeredID,
    month,
    food,
    under,
    over,
    females,
    total,
    location,
    partnerOrganisation,
  });

  await inDriverDatabase.save();
  return res.status(201).json({
    success: true,
    statusCode: 201,
    data: driver,
  });
  // };
});
module.exports = router;
