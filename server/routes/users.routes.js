/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The users managing API
 * /users/:
 *   get:
 *     summary: Lists all the users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: The list of the users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 * /users/{id}:
 *   get:
 *     summary: Get a particular user
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Getting a particular user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 * /users/{id}/friends:
 *   get:
 *     summary: Get the user's friends
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *     responses:
 *       200:
 *         description: Received friends of user by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       404:
 *         description: The user was not found
 * /users/{id}/{friendId}:
 * get:
 *     summary: Add or Remove user's friend
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *     responses:
 *       200:
 *         description: Friend added or Removed for the user with Id "id"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       404:
 *         description: The user id or the friend id was not found
 */

import express from 'express';
import { getUser, getUserFriends, addRemoveFriend, getAllUsers } from '../controllers/users.controller.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getAllUsers);
/* READ */
router.get('/:id', verifyToken, getUser);
router.get('/:id/friends', verifyToken, getUserFriends);

/* UPDATE */
router.patch('/:id/:friendId', verifyToken, addRemoveFriend);

export default router;
