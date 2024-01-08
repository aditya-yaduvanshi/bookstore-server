import { Router } from "express";
import {
  getPublishedBooks,
  getUserPublishedBooks,
  publishBook,
  searchBooks,
  unpublishBook
} from "@/controllers/books.controller";

const router = Router();

router.post("/publish", publishBook);

router.get("/published", getPublishedBooks);

router.get("/user", getUserPublishedBooks);

router.get("/search", searchBooks);

router.put("/unpublish/:id", unpublishBook);

export default router;
