import { Router } from "express";
import { getPublishedBooks, getUserPublishedBooks, publishBook } from "@/controllers/books.controller";

const router = Router();

router.post("/publish", publishBook);

router.get("/published", getPublishedBooks);

router.get("/user", getUserPublishedBooks);

export default router;
