import { Router } from "express";
import {
  getPublishedBooks,
  getUserPublishedBooks,
  publishBook,
  searchBooks,
} from "@/controllers/books.controller";

const router = Router();

router.post("/publish", publishBook);

router.get("/published", getPublishedBooks);

router.get("/user", getUserPublishedBooks);

router.get("/search", searchBooks);

export default router;
