/**
 * @swagger
 * tags:
 *   name: Hosts
 *   description: The Hosts managing API
 * /host/:
 *   get:
 *     summary: Getting Hosts
 *     tags: [Hosts]
 *     responses:
 *       200:
 *         description: The list of the Hosts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 *   post:
 *     summary: Creating Hosts
 *     tags: [Hosts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       200:
 *         description: The Host is Created.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       500:
 *         description: Some server error
 * /host/{id}:
 *   put:
 *    summary: Update the Host by the id
 *    tags: [Hosts]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The Host id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Book'
 *    responses:
 *      200:
 *        description: The Host was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Book'
 *      404:
 *        description: The Host was not found
 *      500:
 *        description: Some error happened
 *   delete:
 *     summary: Remove the Host by id
 *     tags: [Hosts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The Host id
 *
 *     responses:
 *       200:
 *         description: The Host was deleted
 *       404:
 *         description: The Host was not found
 */

import express from 'express';
import { createHost, deleteHost, getHosts, updateHost } from '../controllers/host.controller.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

/* READ */
// router.get('/', verifyToken, getFeedPosts);
router.get('/', getHosts);
router.post('/', createHost);
router.put('/:id', updateHost);
router.delete('/:id', deleteHost);
// router.get('/:userId/posts', verifyToken, getUserPosts);
// router.get('/location/:location', getPostsOnLocation);

// /* UPDATE */
// router.patch('/:id/like', verifyToken, likePost);

export default router;
