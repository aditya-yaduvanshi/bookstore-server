import { Router } from "express";
import {
  getPublishedBooks,
  getUserPublishedBooks,
  publishBook,
  searchBooks,
  unpublishBook,
} from "@/controllers/books.controller";

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The unique identifier for the book
 *         title:
 *           type: string
 *           description: The title of the book
 *         cover:
 *           type: string
 *           description: The URL of the book cover image
 *         description:
 *           type: string
 *           description: A brief description of the book
 *         price:
 *           type: number
 *           description: The price of the book
 *         isPublished:
 *           type: boolean
 *           description: Indicates whether the book is published
 *         publishedBy:
 *           type: string
 *           description: The ID of the user who published the book
 *         author:
 *           type: string
 *           description: The author of the book
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The timestamp when the book was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The timestamp when the book was last updated
 */

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: Book-related operations
 */

/**
 * @swagger
 * /books/publish:
 *   post:
 *     summary: Publish a new book
 *     tags: [Books]
 *     security:
 *       bearerAuth: []
 *     requestBody:
 *       description: Book data to be published
 *       required: true
 *       content:
 *         application/json:
 *     responses:
 *       '201':
 *         description: Successfully published
 *         content:
 *           application/json:
 *             example:
 *               data:
 *                 book: 
 *                   _id: string
 *                   title: string
 *                   cover: string
 *                   description: string
 *                   price: number
 *                   isPublished: boolean
 *                   publishedBy: string
 *                   author: string
 *                   createdAt: string
 *                   updatedAt: string
 *       '400':
 *         description: Bad Request
 *         content:
 *           application/json:
 *             example:
 *               error: Validation error message
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: Cannot publish at the moment. Please try again later.
 */
router.post("/publish", publishBook);

/**
 * @swagger
 * /books/published:
 *   get:
 *     summary: Get all published books
 *     tags: [Books]
 *     security:
 *       bearerAuth: []
 *     responses:
 *       '200':
 *         description: Successfully retrieved published books
 *         content:
 *           application/json:
 *             example:
 *               data: [<published_book_data>]
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: Something went wrong!
 */
router.get("/published", getPublishedBooks);

/**
 * @swagger
 * /books/user:
 *   get:
 *     summary: Get all books published by the current user
 *     tags: [Books]
 *     security:
 *       bearerAuth: []
 *     responses:
 *       '200':
 *         description: Successfully retrieved user's published books
 *         content:
 *           application/json:
 *             example:
 *               data: [<user_published_book_data>]
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: Something went wrong!
 */
router.get("/user", getUserPublishedBooks);

/**
 * @swagger
 * /books/search:
 *   get:
 *     summary: Search for published books by title
 *     tags: [Books]
 *     security:
 *       bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         description: Title to search for
 *     responses:
 *       '200':
 *         description: Successfully retrieved search results
 *         content:
 *           application/json:
 *             example:
 *               data: [<searched_book_data>]
 *       '400':
 *         description: Bad Request
 *         content:
 *           application/json:
 *             example:
 *               error: Title must be a valid string!
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: Something went wrong!
 */
router.get("/search", searchBooks);

/**
 * @swagger
 * /books/unpublish/{id}:
 *   put:
 *     summary: Unpublish a book by ID
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the book to unpublish
 *     responses:
 *       '200':
 *         description: Successfully unpublished the book
 *         content:
 *           application/json:
 *             example:
 *               data: <unpublished_book_data>
 *       '400':
 *         description: Bad Request
 *         content:
 *           application/json:
 *             example:
 *               error: Book id must be provided!
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: Cannot unpublish at the moment. Please try again later.
 */
router.put("/unpublish/:id", unpublishBook);

export default router;
