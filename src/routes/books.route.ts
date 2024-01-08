import { Router } from "express";
import { publishBook } from "@/controllers/books.controller";

const router = Router();

router.post("/publish", publishBook);

export default router;
