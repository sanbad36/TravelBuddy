/**
 * @swagger
 * tags:
 *   name: PhoneCalls
 *   description: PhoneCalls API
 *   /phoneCall/makePhoneCall:
 *   post:
 *      summary: Making a Phone Call to a user
 *      tags: [PhoneCalls]
 *      requestBody:
 *              description: Making a Phone Call to a user
 *              required: true
 *              content:
 *                application/json:
 *                    schema:
 *                      $ref: '#/components/schemas/Book'
 *      responses:
 *        200:
 *          description: The Phone Call is placed successfully.
 *          content:
 *            application/json:
 *              schema:
 *                type: string
 *                items:
 *                  $ref: '#/components/schemas/Book'
 * /phoneCall/sendProgressReport:
 *    post:
 *      summary: Sending Progress Report to a user.
 *      tags: [PhoneCalls]
 *      requestBody:
 *              description: Sending Progress Report to a user.
 *              required: true
 *              content:
 *                application/json:
 *                    schema:
 *                      $ref: '#/components/schemas/Book'
 *      responses:
 *        200:
 *          description: The progress report is sent successfully to a user. 
 *          content:
 *            application/json:
 *              schema:
 *                type: string
 *                items:
 *                  $ref: '#/components/schemas/Book'
 * 
 */

const express = require("express");

const {
  makePhoneCall,
  sendProgressReport,
} = require("../controllers/phoneCall");

const router = express.Router();

// Perform a payment
router.route("/makePhoneCall").post(makePhoneCall);
router.route("/sendProgressReport").post(sendProgressReport);

module.exports = router;
