/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: The posts managing API
 * /posts/:
 *   get:
 *     summary: Lists all Posts
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: The posts of all the users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 * /posts/{userId}/posts:
 *   get:
 *     summary: Get posts of a particular user
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: Getting posts of a particular user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 * /posts/location/{location} :
 *   get:
 *     summary: Get all posts of location
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: location
 *         schema:
 *           type: string
 *         required: true
 *         description: The location
 *     responses:
 *       200:
 *         description: Getting posts of a location
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       404:
 *         description: The location was not found
 * /posts/{id}/like:
 *   patch:
 *     summary: Updating the likes of a post
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The post id
 *     responses:
 *       200:
 *         description: The like count is updated for the post
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       404:
 *         description: The post was not found
 */


import express from 'express';
import { getFeedPosts, getPostsOnLocation, getUserPosts, likePost } from '../controllers/posts.controller.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

/* READ */
router.get('/', verifyToken, getFeedPosts);
router.get('/:userId/posts', verifyToken, getUserPosts);
router.get('/location/:location', getPostsOnLocation);

/* UPDATE */
router.patch('/:id/like', verifyToken, likePost);

export default router;
